import { createBrowserRouter } from "react-router-dom";
import { request } from "../comp/userStore/api/api";
import MainPage from "../comp/mainPage/mainPage";
import DetailPage from "../comp/detailPage/detailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/:itemName",
    element: <DetailPage />,
  },
]);
