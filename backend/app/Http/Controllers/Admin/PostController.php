<?php

namespace App\Http\Controllers\Admin;

use App\Events\SubscribedUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Category;
use App\Models\MonthlyReport;
use App\Models\MonthlyViewsModel;
use App\Models\NewsLetter;
use App\Models\Post;
use App\Models\PostView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $search_term = $request->query('query');
        $fieldName = $request->query('field');
        $total = Post::with(['category','author'])->get();
        $views = Post::sum('views_counter');
        $posts ='';
        if($user->role === 'admin' || $user->role === 'editor'){
            if($search_term !== 'all' && !empty($search_term)){
                if($search_term && $fieldName === 'search'){
                    $posts = Post::with(['category','author'])->where('title', 'LIKE', '%' . $search_term . '%')->latest()->paginate(10);
                }
                else if($search_term && $fieldName === 'category'){
                    $posts = Post::with(['category','author'])->where('category_id', $search_term)->latest()->paginate(10);
                }
                else if($search_term && $fieldName === 'status'){
                    $posts = Post::with(['category','author'])->where('published', $search_term)->latest()->paginate(10);
                }
            }else{
                $posts = Post::with(['category','author'])->latest()->paginate(10);
            }
        }else{
            
            if($search_term !== 'all' && !empty($search_term)){
               if($search_term && $fieldName === 'search'){
                    $posts = Post::with(['category','author'])->where('author_id',$user->id)->where('title', 'LIKE', '%' . $search_term . '%')->latest()->paginate(10);
                }
                else if($search_term && $fieldName === 'category'){
                    $posts = Post::with(['category','author'])->where('author_id',$user->id)->where('category_id', $search_term)->latest()->paginate(10);
                }
                else if($search_term && $fieldName === 'status'){
                    $posts = Post::with(['category','author'])->where('author_id',$user->id)->where('published', $search_term)->latest()->paginate(10);
                }
            }else{
                $posts = Post::with(['category','author'])->where('author_id',$user->id)->latest()->paginate(10);
            }
        }
        $total_posts = Post::count();
        $this_month = Post::whereMonth('created_at',now()->month)->count();
        $velocity = $total_posts > 0 ? round(($this_month / $total_posts) * 100, 2) : 0;

        $total_views = PostView::count();
        $view_per_month = PostView::whereDate('created_at', today())->count();
        $average_views = $total_views > 0 ? round(($view_per_month / $total_views) * 100, 2) : 0;


        $monthlyPostViews = MonthlyViewsModel::select('month','year','monthly_views')->get();

        return response()->json([
            'posts'=>$posts,
            'total'=>$total,
            'views'=>$views,
            'velocity'=>$velocity,
            'last_month'=>$monthlyPostViews,
            'averageViews'=>$average_views,
        ],200);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $date = date('M d, y');
        $image = $request->file('image');
        $ext = $image->getClientOriginalExtension();
        $imageName = time(). '.' . $ext;
        $image->move(public_path('posts-images'),$imageName);
        $parseTags = json_decode($request->tags);
        if(!is_array($parseTags) || count($parseTags) === 0){
            return response()->json([
                'message'=>'At lease one tag is required'
            ],422);
        }

        if(count($parseTags) > 5 ){
            return response()->json([
                'message'=>'Maximum 5 tags allowed'
            ],422);
        }
        Post::create([
            'title'=>$request->title,
            'description'=>$request->description,
            'category_id'=>$request->category,
            'published'=>$request->published,
            'date'=>$date,
            'author_id'=>Auth::id(),
            'tags'=>$request->tags,
            'image'=>$imageName
        ]);
        

        $subscribedUser = NewsLetter::pluck('email')->toArray();
        if($request->published === 'published'){
            SubscribedUser::dispatch($subscribedUser);
        }


        Category::where('id', $request->category)->increment('post_count');

        $total = Post::with(['category','author'])->whereMonth('created_at',now()->month)->whereYear('created_at', now()->year)->count();

        MonthlyReport::updateOrCreate([
            'user_id'=>Auth::id(),
            'month'=>now()->month,
            'year'=>now()->year
        ],[
            'total_post'=>$total
        ]);

        return response()->json([
            'message'=>'Post published successfully'
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();
        if($user->role === 'admin' || $user->role === 'editor'){
            $post = Post::with(['category','author'])->where('id',$id)->first();
        }else{
            $post = Post::with(['category','author'])->where('id',$id)->where('author_id', $user->id)->first();
        }

       if(!$post){
            return response()->json([
                'message'=>'Not found'
            ],404);
        } 

        return response()->json([
            'post'=>$post
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, string $id)
    {
        $user = $request->user();
        if($user->role === 'admin' || $user->role === 'editor'){
            $post = Post::with(['category','author'])->where('id',$id)->first();
        }else{
            $post = Post::with(['category','author'])->where('id',$id)->where('author_id', $user->id)->first();
        }

        if(!$post){
            return response()->json([
                'message'=>'Not found'
            ],404);
        } 

        $oldCategory = $post->category_id;
        $NewCategory = $request->category;

       

        $imageName = $post->image;
        if($request->hasFile('image')){
            if($post->image){
                $path = public_path('posts-images');
                $previousImage = $path . '/'. $post->image;
                if(file_exists($previousImage)){
                    unlink($previousImage);
                }
            }

            $image = $request->file('image');
            $ext = $image->getClientOriginalExtension();
            $imageName = time(). '.' . $ext;
            $image->move(public_path('posts-images'), $imageName);
        }else{
            $imageName = $post->image;
        }

        if($oldCategory != $NewCategory){
            Category::where('id', $oldCategory)->decrement('post_count');
            Category::where('id', $NewCategory)->increment('post_count');
        }

        $parseTags = json_decode($request->tags);
        if(!is_array($parseTags) || count($parseTags) === 0){
            return response()->json([
                'message'=>'At lease one tag is required'
            ],422);
        }

        if(count($parseTags) > 5 ){
            return response()->json([
                'message'=>'Maximum 5 tags allowed'
            ],422);
        }

        $post->update([
            'title'=>$request->title,
            'description'=>$request->description,
            'published'=>$request->published,
            'image'=>$imageName,
            'category_id'=>$request->category,
            'tags'=>$request->tags,
        ]);

        return response()->json([
            'message' => 'Post updated successfully',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();
        if($user->role === 'admin' || $user->role === 'editor'){
            $post = Post::with(['category','author'])->where('id',$id)->first();
        }else{
            $post = Post::with(['category','author'])->where('id',$id)->where('author_id', $user->id)->first();
        }
        if(!$post){
            return response()->json([
                'message'=>'Not found'
            ],404);
        }
        $categoryId = $post->category_id;


        $path = public_path('posts-images');
        $previousImage = $path . '/' . $post->image;
        if($post->image && $previousImage){
            if(file_exists($previousImage)){
                unlink($previousImage);
            }
        }

        $post->delete();
        Category::where('id',$categoryId)->decrement('post_count');
        return response()->json([
            'message' => 'Post deleted successfully'
        ], 200);
    }

    public function multiDeletePost(Request $request){
        $user = $request->user();
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:posts,id',
        ]);

        if($user->role === 'admin' || $user->role === 'editor'){
            $posts = Post::whereIn('id',$request->ids)->get();
            
        }else{
            $posts = Post::whereIn('id',$request->ids)->where('author_id', $user->id)->get();
        }

        if($posts->isEmpty()){
            return response()->json([
                'message'=>'Not found'
            ],404);
        }

        foreach($posts as $post){
            $path = public_path('posts-images');
            $previousImage = $path . '/' . $post->image;
            if($post->image && $previousImage){
                if(file_exists($previousImage)){
                    unlink($previousImage);
                }
            }
        }
        Post::whereIn('id',$posts->pluck('id'))->delete();
        return response()->json([
            'message' => 'Posts deleted successfully'
        ], 200);

    }
}
