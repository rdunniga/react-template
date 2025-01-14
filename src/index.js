import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import UserContextProvider from './context/UserContext';
import Home from "./routes/Home";
import About from "./routes/About";
import AdSearchPage from "./routes/AdSearchPage";
import AdUserPage from "./routes/AdUserPage";
import CalIdBookingPage from "./routes/CalIdBookingPage";
import CalIdBookingPhotoPage from "./routes/CalIdBookingPhotoPage";
import Contact from "./routes/Contact";
import CustomFetchHookPage from "./routes/CustomFetchHookPage";
import LoginPage from "./routes/LoginPage";
import LoginStatus from "./components/Global/LoginStatus";
import LoginTokenPage from "./routes/LoginTokenPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import ErrorPage from "./routes/ErrorPage";
import UserContextDisplayPage from "./routes/UserContextDisplayPage";
import WmpPersonnelInfoDetailPage from "./routes/WmpPersonnelInfoDetailPage";
import WmpPersonnelInfoPage from "./routes/WmpPersonnelInfoPage";
import "./App.css";

// Redirect After Login with React Router v6 https://www.youtube.com/watch?v=2lJuOh4YlGM
const AppLayout = () => {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Sidebar />
        <LoginStatus />
        <Outlet />
      </UserContextProvider>
    </>
  )
};

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     // <Route errorElement={<ErrorPage />}></Route>
//     <Route element={<AppLayout />}>
//       <Route path="/" element={<Home />} />
//       <Route path="ad/search" element={<AdSearchPage />} />
//       <Route path="ad/user" element={<AdUserPage />} />
//       <Route path="about" element={<About />} />
//       <Route path="calid/booking" element={<CalIdBookingPage />} />
//       <Route path="calid/bookingphoto" element={<CalIdBookingPhotoPage />} />
//       <Route path="contact" element={<Contact />} />
//       <Route path="fetchhook" element={<CustomFetchHookPage />} />
//       <Route path="login" element={<LoginPage />} />
//       <Route path="usercontextdisplay" element={<UserContextDisplayPage />} />
//       <Route path="wmp/personnalinfo" element={<WmpPersonnelInfoPage />} />
//       <Route path="wmp/personnalinfo/:id" element={<WmpPersonnelInfoDetailPage />} />
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home />, },
      { path: "ad/search", element: <AdSearchPage />, },
      { path: "ad/user", element: <AdUserPage />, },
      { path: "about", element: <About />, },
      { path: "calid/booking", element: <CalIdBookingPage />, },
      { path: "calid/bookingphoto", element: <CalIdBookingPhotoPage />, },
      { path: "contact", element: <Contact />, },
      { path: "fetchhook", element: <CustomFetchHookPage />, },
      { path: "login", element: <LoginPage />, },
      { path: "logintoken", element: <LoginTokenPage />, },
      { path: "usercontextdisplay", element: <UserContextDisplayPage />, },
      { path: "wmp/personnalinfo", element: <WmpPersonnelInfoPage />, },
      { path: "wmp/personnalinfo/:id", element: <WmpPersonnelInfoDetailPage />, },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);