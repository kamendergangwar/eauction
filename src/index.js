import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import Loading from "./components/atoms/Loading/Loading";
import App from "./App";
import "./index.css";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["mr", "en", "hi"],
    fallbackLng: "mr",
    // preload: ["mr"],
    lng: localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "mr",
    ns: [
      "Translation",
      "InitialPageTrans",
      "PersonalDetailsPageTrans",
      "ContactDetailsPageTrans",
      "FamilyDetailsPageTrans",
      "CategoryDetailsPageTrans",
      "ProjectDetailsPageTrans",
      "BankDetailsPageTrans",
      "SuccessDetailsPageTrans",
      "DocumentsPageTrans",
      "DashboardPageTrans",
      "AgentTranslation",
      "MyApplicationDetailsPageTrans",
      "SupportPageTrans",
      "ProfilePageTrans",
      "AgentInitialPageTrans",
      "AgentDashboardPageTrans",
      "AgentApplicationDashboardPageTrans",
      "AgentAppDetailsViewPageTrans",
      "AnalyDashboardPageTrans",
      "ManagerDashboardPageTrans",
      "AgentProfilePageTrans",
    ],
    defaultNS: "Translation",
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
    backend: {
      loadPath: "assets/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: { escapeValue: false },
  });
// localStorage.setItem('i18nextLng', 'mr');

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Loading isOpen={true} />}>
      <Router basename="/">
        <App />
      </Router>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);
