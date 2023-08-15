import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CompanyList from "./components/CompanyList";
import CompanyReportPage from "./pages/CompanyReportPage";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    children: [
      { index: true, element: <CompanyList /> },
      {
        path: "companies",
        children: [
          { index: true, element: <CompanyList /> },
          {
            path: ":companyId",
            element: <CompanyReportPage />,
          },
        ],
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
