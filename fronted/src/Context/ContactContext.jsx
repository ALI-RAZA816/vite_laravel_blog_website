import { createContext, useContext, useEffect, useState } from "react";
import { apiGet, apiSend, showToast } from "../services/apiClient";

export const ContactContext = createContext();


const ContactContextProvider = ({children})=>{
    
    const [contactRefresh, setContactRefresh] = useState(0);
    const triggerContactRefresh = ()=>setContactRefresh(prev=>prev+1);

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


    const [messages, setMessages] = useState([]);
    const [totalMessages, setTotalMessages] = useState(0);
    const fetchMessages = async ()=>{
        try{
            const {ok, data} = await apiGet('messages');
            if(ok){
                setTotalMessages(data.totalMessages);
                setMessages(data.messages.data);
            }
        }catch(error){
            console.log(error);
        }
    };


    const submitMessage = async (event)=>{
        event.preventDefault();
        try{
            const {ok, data} = await apiSend('message','POST', contactForm);
            if(!ok){
                const error = data?.errors;
                if(error?.name?.[0]){
                    showToast(error.name[0], 'Error','danger');
                    return;
                }
                if(error?.email?.[0]){
                    showToast(error.email[0], 'Error','danger');
                    return;
                }
                if(error?.subject?.[0]){
                    showToast(error.subject[0], 'Error','danger');
                    return;
                }
                if(error?.message?.[0]){
                    showToast(error.message[0], 'Error','danger');
                    return;
                }
                if(data?.message){
                    showToast(data.message, 'Error','danger');
                    return;
                }
            }
            triggerContactRefresh();
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


    const deleteMessage = async (id)=>{
        try{
            const {ok, data} = await apiSend(`messages/${id}`, 'DELETE', null);   
            if(ok){
                triggerContactRefresh();
                showToast(data.message, 'Success','success');
                return;
            }else{
                showToast(data.message, 'Error','danger');
            }
        }catch(error){
            console.log(error);
        }
    };

    const markAsRead = async (id)=>{
        try{
            const {ok, data} = await apiSend(`mark-as-read/${id}`, 'PUT', null);   
            if(ok){
                triggerContactRefresh();
                showToast(data.message, 'Success','success');
            }else{
                showToast(data.message, 'Error','danger');
            }
        }catch(error){
            console.log(error);
        }
    };

    const markAsUnread = async (id)=>{
        try{
            const {ok, data} = await apiSend(`mark-as-unread/${id}`, 'PUT', null);   
            if(ok){
                triggerContactRefresh();
                showToast(data.message, 'Success','success');
            }else{
                showToast(data.message, 'Error','danger');
            }
        }catch(error){
            console.log(error);
        }
    };

    const [selectedId, setSelectedId] = useState(null);
    const [singleMessage, setSingleMessage] = useState({});
    const fetchSingleMessage = async (id)=>{
        try{
            const {ok, data} = await apiGet(`messages/${id}`);
            if(ok){
                triggerContactRefresh();
                setSingleMessage(data.message);
            }else{
                showToast(data.message, 'Error','danger');
            }
        }catch(error){
            console.log(error);
        }
    };

    const [content, setContent] = useState('');
    const convertToEmailHtml = (html) => {
    const div = document.createElement('div');
        div.innerHTML = html;

        div.querySelectorAll('h1').forEach(el => {
            el.setAttribute('style', 'font-size:24px !important; font-weight:bold !important; margin:20px 0 10px; color:#111; display:block;');
        });
        div.querySelectorAll('h2').forEach(el => {
            el.setAttribute('style', 'font-size:20px !important; font-weight:bold !important; margin:18px 0 8px; color:#111; display:block;');
        });
        div.querySelectorAll('h3').forEach(el => {
            el.setAttribute('style', 'font-size:17px !important; font-weight:bold !important; margin:16px 0 8px; color:#111; display:block;');
        });
        div.querySelectorAll('p').forEach(el => {
            el.setAttribute('style', 'font-size:15px; line-height:1.6; margin:0 0 12px; color:#333;');
        });
        div.querySelectorAll('strong, b').forEach(el => {
            el.setAttribute('style', 'font-weight:bold !important; color:#111;');
        });
        div.querySelectorAll('em, i').forEach(el => {
            el.setAttribute('style', 'font-style:italic !important;');
        });
        div.querySelectorAll('u').forEach(el => {
            el.setAttribute('style', 'text-decoration:underline !important;');
        });
        div.querySelectorAll('ul').forEach(el => {
            el.setAttribute('style', 'margin:0 0 12px; padding-left:24px; list-style-type:disc !important;');
        });
        div.querySelectorAll('ol').forEach(el => {
            el.setAttribute('style', 'margin:0 0 12px; padding-left:24px; list-style-type:decimal !important;');
        });
        div.querySelectorAll('li').forEach(el => {
            el.setAttribute('style', 'font-size:15px; line-height:1.7; margin-bottom:6px; display:list-item !important;');
        });
        div.querySelectorAll('a').forEach(el => {
            el.setAttribute('style', 'color:#0066cc; text-decoration:underline;');
        });

        return div.innerHTML;
    };
    const sendReply = async ()=>{

        const emailSafeHtml = convertToEmailHtml(content);
        const payload = {
            id: selectedId,
            reply: emailSafeHtml
        };

        try{
            const {ok, data} = await apiSend(`reply-message`, 'POST', payload);
            if(ok){
                triggerContactRefresh();
                setContent('');
                showToast(data.message, 'Success','success');
            }else{
                showToast(data.message, 'Error','danger');
            }
        }catch(error){
            console.log(error);
        }

    };

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('UserInfo'));
        if(token && user.role !== 'user'){
            fetchMessages();
        }
    },[contactRefresh]);

    return (
        <ContactContext.Provider value={{
            formHandler,
            contactForm,
            submitMessage,
            messages,
            deleteMessage,
            markAsRead,
            markAsUnread,
            fetchSingleMessage,
            singleMessage,
            selectedId,
            setSelectedId,
            sendReply,
            content,
            setContent,
            totalMessages
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