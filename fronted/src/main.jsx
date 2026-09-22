import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./Context/AppContext.jsx";
import AuthContextProvider from "./Context/AuthContext.jsx";
import CategoryContextProvider from "./Context/CategoryContext.jsx";
import CommentContextProvider from "./Context/CommentContext.jsx";
import MonthlyReportContextProvider from "./Context/MonthlyReportContext.jsx";
import PostContextProvider from "./Context/PostContext.jsx";
import SettingContextProvider from "./Context/SettingContext.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import PublicCategoryContextProvider from "./Context/PublicCategoryContext.jsx";
import PublicPostContextProvider from "./Context/PublicPostContext.jsx";
import DashboardContextProvider from "./Context/DashboardContext.jsx";
import PublicSettingContext from "./Context/PublicSettingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <AuthContextProvider>
          <CategoryContextProvider>
            <CommentContextProvider>
              <MonthlyReportContextProvider>
                <PostContextProvider>
                  <SettingContextProvider>
                    <UserContextProvider>
                      <PublicCategoryContextProvider>
                        <PublicPostContextProvider>
                          <DashboardContextProvider>
                            <PublicSettingContext>
                              <App />
                            </PublicSettingContext>
                          </DashboardContextProvider>
                        </PublicPostContextProvider>
                      </PublicCategoryContextProvider>
                    </UserContextProvider>
                  </SettingContextProvider>
                </PostContextProvider>
              </MonthlyReportContextProvider>
            </CommentContextProvider>
          </CategoryContextProvider>
        </AuthContextProvider>
      </AppContextProvider>
      </BrowserRouter>
  </React.StrictMode>
);
