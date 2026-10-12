import { createContext, useContext, useRef } from "react";
import { apiSend, showToast } from "../services/apiClient";
import { StatusCode } from "../services/apiStatusCode";
import { useNavigate } from "react-router-dom";


export const NewsLetterContext = createContext();


const NewsLetterContextProvide = ({children})=>{

    const newsletter = useRef(null);
    const navigate = useNavigate();

    const subscribeNews = async ()=>{
        const email = newsletter.current?.value;
        const {ok, status, data} = await apiSend('newsletter', 'POST', {newsletter:email});
        try{
            if(ok){
                showToast(data.message,'Success','success');
                newsletter.current.value = '';
                return;
            }else{
                const error = data?.errors;
                if(error?.newsletter?.[0]){
                    showToast(error?.newsletter?.[0],'Error','danger');
                    return;
                }
                if(data.message){
                    showToast(data.message,'Error','danger');
                    return;
                }
                navigate(StatusCode(status));
            }


        }catch(error){
            console.log(error);
        }
    }

    return(
        <NewsLetterContext.Provider value={{
            newsletter,
            subscribeNews
        }}>{children}</NewsLetterContext.Provider>
    )
}
export const useNewsLetter = () =>{
    const ctx = useContext(NewsLetterContext);
    if (!ctx) throw new Error("Use useNewsLetter in <NewsLetterContextProvide>");
    return ctx;
}
export default NewsLetterContextProvide;

