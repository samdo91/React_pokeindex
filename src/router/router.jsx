import { createBrowserRouter } from "react-router-dom";
import { request } from "../comp/userStore/api/api";
import MainPage from "../comp/mainPage/mainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,

    // children: [
    //   {
    //     path: "team",
    //     element: <Team />,
    //     loader: teamLoader,
    //   },
    // ],
  },
]);
