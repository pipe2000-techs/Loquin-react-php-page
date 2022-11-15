import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import ErrorPage from "./error-page";
import Login, { Action as loginAction, ValidateLogin } from "./routes/login";
import Dashboard, { ValidateLogin as vallogin } from './routes/Dashboard'
import Users, {LoaderData, ActionUpdate} from './routes/DasUsersList'
import CreateUser, {ActionInsert} from './routes/DashCreateUser'
import ChangePassword, { ValidateLogin as valLogin } from './routes/changePsw/ChangePassword'
import { changePassword } from './routes/changePsw/ValidatePassword'

const router = createBrowserRouter([
  {
    path: "Login",
    element: <Login/>,
    errorElement: <ErrorPage />,
    loader: ValidateLogin,
    action: loginAction,
  },
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    loader: vallogin,
    children: [
      {
        path: "users",
        element: <Users />,
        loader: LoaderData,
        action: ActionUpdate,
      },
      {
        path: "CreateUser",
        element: <CreateUser />,
        action: ActionInsert,
      },
    ],
  },
  {
    path: "changePassword",
    element: <ChangePassword/>,
    errorElement: <ErrorPage />,
    loader: valLogin,
    action: changePassword,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
