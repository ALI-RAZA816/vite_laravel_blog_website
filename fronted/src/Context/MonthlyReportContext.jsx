import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Http/Http";
import { apiGet } from "../services/apiClient.js";

export const MonthlyReportContext = createContext();

const MonthlyReportContextProvider = ({ children }) => {

  // AdminPosts.jsx ke "Content Velocity" bar chart ke liye data.
  // { month: "Jan 2026", total: 12 } jaisi shape me, sirf last 12 mahine.
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
    fetchMonthlyReport();
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

// chhota hook taake har page me useContext likhna na pade
export const useMonthlyReport = () => {
  const ctx = useContext(MonthlyReportContext);
  if (!ctx) throw new Error("useMonthlyReport ko <MonthlyReportContextProvider> ke andar use karein.");
  return ctx;
};

export default MonthlyReportContextProvider;