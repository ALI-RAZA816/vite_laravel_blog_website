import { createContext, useContext, useEffect, useState } from "react";
import {apiGet, apiUpload, apiSend} from '../services/apiClient.js';
export const PublicSetting = createContext();

const PublicSettingContext = ({ children }) => {

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

 



  // fetch settings
  const fetchSetting = async () => {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      fetchSetting();
  }, []);


  return (
    <PublicSetting.Provider value={{
      logo,
      setLogo,
      settingData,
      setSettingData,
      fetchSetting,
    }}>
      {children}
    </PublicSetting.Provider>
  );
};

export const usePublicSetting = () => {
  const ctx = useContext(PublicSetting);
  if (!ctx) throw new Error(" Use the usePublicSetting in <PublicSettingContextProvider>");
  return ctx;
};

export default PublicSettingContext;