import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  useRoutes,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import { PostProvider } from "./context/postContext";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/feed",
    element: (
      <ProtectedRoute>
        <Layout>
          <Feed />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/:username",
    element: (
      <ProtectedRoute>
        <Layout>
          <Profile />
        </Layout>
      </ProtectedRoute>
    ),
  },
]);

// const router = createBrowserRouter(
//   createBrowserRouter(
//     <Route path='/' element={<Login />}>
//       <Route path='/feed' element={<App />}></Route>
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PostProvider>
        <RouterProvider router={router}></RouterProvider>
      </PostProvider>
    </AuthProvider>

    {/* <App /> */}
  </React.StrictMode>
);
