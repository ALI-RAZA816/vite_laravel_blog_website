import { createContext, useContext, useState } from "react";
import { apiSend, showToast } from "../services/apiClient";

export const ContactContext = createContext();


const ContactContextProvider = ({children})=>{
    
    const [contactForm, setContactForm] = useState({
        name:'',
        email:'',
        subject:'',
        message:''
    });

    const formHandler = (event)=>{
        const {name, value} = event.target;
        setContactForm((prev)=>({
            ...prev,
            [name]:value
        }));
    }


    const submitMessage = async (event)=>{
        event.preventDefault();
        try{
            const {ok, data} = await apiSend('message','POST', contactForm);
            if(!ok){
                const error = data?.errors;
                if(error.name?.[0]){
                    showToast(error.name[0], 'Error','danger');
                    return;
                }
                if(error.email?.[0]){
                    showToast(error.email[0], 'Error','danger');
                    return;
                }
                if(error.subject?.[0]){
                    showToast(error.subject[0], 'Error','danger');
                    return;
                }
                if(error.message?.[0]){
                    showToast(error.message[0], 'Error','danger');
                    return;
                }
                if(data?.message){
                    showToast(data.message, 'Error','danger');
                    return;
                }
            }
            showToast(data.message, 'Success','success');
            setContactForm({
                name:'',
                email:'',
                subject:'',
                message:''
            });
        }catch(error){
            console.log(error);
        }
    }

    return (
        <ContactContext.Provider value={{
            formHandler,
            contactForm,
            submitMessage
        }}>
            {children}
        </ContactContext.Provider>
    );
}

export const useContact = ()=>{
    const ctx = useContext(ContactContext);
    if(!ctx) throw new Error('Use useContact in <ContactContext/>');
    return ctx;
}

export default ContactContextProvider;