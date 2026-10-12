
export const StatusCode = (status)=>{
    if(status === 401){
        return '/error/401';
    }
    if(status === 403){
        return '/error/403';
    }
    if(status === 409){
        return '/error/409';
    }
    if(status === 429){
        return '/error/429';
    }
    if(status === 400){
        return '/error/400';
    }
    if(status === 404){
        return '/error/404';
    }
    if(status === 500){
        return '/error/500';
    }
}