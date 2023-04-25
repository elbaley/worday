import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./components/Feed";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { PostProvider } from "./context/postContext";
import { AuthProvider } from "./hooks/useAuth";
import "./index.css";
import Likes from "./pages/Likes";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
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
    path: "/likes",
    element: (
      <ProtectedRoute>
        <Layout>
          <Likes />
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <PostProvider>
        <RouterProvider router={router}></RouterProvider>
      </PostProvider>
    </AuthProvider>

    {/* <App /> */}
  </React.StrictMode>
);
