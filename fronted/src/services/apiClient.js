
import {apiUrl} from '../Http/Http';

export const showToast = (message, msgType, type)=>{

    let toastContainer = document.getElementById('toast-container');
    if(!toastContainer){
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
            `;
            
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `border-5 border-start border-${type}`;
    toast.style.cssText = `
            display: flex;
            align-items: center;
            min-width: 280px;
            max-width: 360px;
            background: #fff;
            color: rgba(51, 51, 51,.80);
            padding:5px 5px;
            border-radius: 10px;
            transform: translateX(100%);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            transition: all .50s ease;
    `;

    toast.innerHTML = `
        <div class='d-flex align-items-center'>
            <span style="font-size:25px;" class='text-${type} me-2'>${type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : type === 'danger' ? '<i class="fa-solid fa-circle-xmark"></i>' : '<i class="fa-solid fa-triangle-exclamation"></i>'}</span>
            <div class='d-flex flex-column'>
                <span class='text-${type}'>${msgType}!</span>
                <span style="font-size:14px;font-weight:normal !important;">${message}</span>
            </div>
        </div>
    `;
    
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    });
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';

        setTimeout(() => {
            toast.remove();

            if (toastContainer.children.length === 0) {
                toastContainer.remove();
            }
        }, 300);
    }, 3000);


    toastContainer.appendChild(toast);

}


export const apiGet = async (path)=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/${path}`,{
        method:'GET',
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json',
            ...(path !== 'post-comments' || path !== 'public-posts' || path !== 'public-category' ? {'Authorization':`Bearer ${token}`} : {})
        }
    });
    const data = await response.json();
    return {ok:response.ok, status:response.status, data}
}

export const apiSend = async (path, method = 'POST', body = null)=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/${path}`,{
        method,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json',
             ...(path !== 'account' || path !== 'message' ? {'Authorization':`Bearer ${token}`} : {})
        },
        body: body ? JSON.stringify(body) : null
    });
    const data = await response.json();
    return {ok:response.ok, status:response.status, data}
}

export const apiUpload = async (path, method = 'POST', body = null)=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/${path}`,{
        method,
        headers:{
            'Accept':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body: body
    });

    let data = null;
    const text = await response.json();
    if(text){
        data = text;
    }else{
        data = null;
    }
    return {ok:response.ok, status:response.status, data}
}

export const toPagination = (paginator) => ({
  currentPage: paginator?.current_page ?? "",
  from: paginator?.from ?? "",
  lastPage: paginator?.last_page ?? "",
  to: paginator?.to ?? "",
  total: paginator?.total ?? "",
  perPage: paginator?.per_page ?? "",
});

export const emptyPagination = {
  currentPage: "",
  from: "",
  lastPage: "",
  to: "",
  total: "",
  perPage: "",
};