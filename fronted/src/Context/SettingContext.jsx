import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Http/Http";
import {apiGet, apiUpload, apiSend} from '../services/apiClient.js';
export const SettingContext = createContext();

const SettingContextProvider = ({ children }) => {
  // apna khud ka refresh signal - sirf setting data hi dobara fetch hota hai
  const [settingRefresh, setSettingRefresh] = useState(0);
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const triggerSettingRefresh = () => setSettingRefresh((prev) => prev + 1);

  const [maintenance, setMaintenance] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logo, setLogo] = useState(null);
  const [settingData, setSettingData] = useState({
    site_title: '',
    site_desc: '',
    site_copyright: '',
    f_url: '',
    t_url: '',
    i_url: '',
    l_url: '',
  });

  // settings form handler
  const settingFormHandler = (event) => {
    const { name, value } = event.target;
    setSettingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // site logo handler
  const siteLogo = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  // fetch settings
  const fetchSetting = async () => {
    setSpinnerLoader(true);
    try {
      const {ok, data} = await apiGet('show-setting');
      if (ok) {
        setSettingData({
          site_title: data?.setting?.site_title,
          site_desc: data?.setting?.site_description,
          site_copyright: data?.setting?.site_copyright,
          f_url: data?.setting?.f_url,
          t_url: data?.setting?.t_url,
          i_url: data?.setting?.i_url,
          l_url: data?.setting?.l_url,
        });
        setLogo(data?.setting?.site_logo);
        setMaintenance(data?.setting?.site_maintence === "true");
        setSpinnerLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('UserInfo'));
    if(token && user.role !== 'user'){
      fetchSetting();
    }
  }, [settingRefresh]);

  // save settings
  const settingHandler = async () => {
    const token = localStorage.getItem('token');
    const form = new FormData();
    form.append('site_title', settingData.site_title);
    form.append('site_desc', settingData.site_desc);
    form.append('site_copyright', settingData.site_copyright);
    form.append('f_url', settingData.f_url);
    form.append('t_url', settingData.t_url);
    form.append('i_url', settingData.i_url);
    form.append('l_url', settingData.l_url);
    form.append('maintence', maintenance);
    form.append('site_logo', logo);

    try {
      const {ok, data} = await apiUpload('settings','POST',form);
      if (ok) {
        triggerSettingRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // remove logo
  const logoHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const {ok, data} = apiSend('logo','DELETE');
      if (ok) {
        triggerSettingRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SettingContext.Provider value={{
      maintenance,
      setMaintenance,
      logoPreview,
      setLogoPreview,
      logo,
      setLogo,
      settingData,
      setSettingData,
      settingFormHandler,
      siteLogo,
      settingHandler,
      logoHandler,
      fetchSetting,
      spinnerLoader
    }}>
      {children}
    </SettingContext.Provider>
  );
};

// chhota hook taake har page me useContext likhna na pade
export const useSetting = () => {
  const ctx = useContext(SettingContext);
  if (!ctx) throw new Error("useSetting ko <SettingContextProvider> ke andar use karein.");
  return ctx;
};

export default SettingContextProvider;