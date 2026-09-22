
import {apiUrl} from '../Http/Http';


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
    return {ok:response.ok, data}
}

export const apiSend = async (path, method = 'POST', body = null)=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/${path}`,{
        method,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json',
             ...(path !== 'account' ? {'Authorization':`Bearer ${token}`} : {})
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
    const data = await response.json();
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