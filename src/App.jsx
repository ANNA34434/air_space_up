import "./App.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import Home from "./page/Home";
import Login from "./page/Login";
import Distinations from "./page/Destinations";
import Results from "./page/Results";
import Pessenger from "./page/Checkout/Passenger";
import Payment from "./page/Checkout/Payment";
import Success from "./page/Checkout/Success";
import NotFoundPage from "./page/NotFoundPage";
import Layout from "./components/Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "destinations", element: <Distinations /> },
      { path: "result", element: <Results /> },
      { path: "pessenger", element: <Pessenger /> },
      { path: "payment", element: <Payment /> },
      { path: "success", element: <Success /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
