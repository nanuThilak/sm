import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, SignupPage } from "./pages";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { Navigate } from "react-router-dom";

const App = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/getUser");
        const data = res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (err) {
        console.log(err.message);
        throw new Error(err);
      }
    },
  });
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={data ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!data ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!data ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/notifications"
          element={data ? <NotificationPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/profile/:username"
          element={data ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <RightPanel />
      <Toaster />
    </div>
  );
};

export default App;
