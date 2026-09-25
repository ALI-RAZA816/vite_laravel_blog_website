import { createContext, useContext, useEffect, useState } from "react";
import { apiGet } from "../services/apiClient.js";

export const MonthlyReportContext = createContext();

const MonthlyReportContextProvider = ({ children }) => {

  const [monthlyReport, setMonthlyReport] = useState([]);

  const fetchMonthlyReport = async () => {

    try {
      const {ok, data} = await apiGet('month-report');

      const formattedData = data?.total?.map((item) => {
        const date = new Date(item.year, item.month - 1);

        return {
          month: date.toLocaleString('en-US', { month: 'short' }) + ` ${item.year}`,
          total: Number(item.total_post)
        };
      }) || [];

      setMonthlyReport(formattedData.slice(-12));

    } catch (error) {
      console.log("fetchMonthlyReport:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('UserInfo'));
    if(token && user.role !== 'user'){
      fetchMonthlyReport();
    }
  }, []);

  return (
    <MonthlyReportContext.Provider value={{
      monthlyReport,
      fetchMonthlyReport,
    }}>
      {children}
    </MonthlyReportContext.Provider>
  );
};

export const useMonthlyReport = () => {
  const ctx = useContext(MonthlyReportContext);
  if (!ctx) throw new Error(" Use the useMonthlyReport in <MonthlyReportContextProvider>");
  return ctx;
};

export default MonthlyReportContextProvider;