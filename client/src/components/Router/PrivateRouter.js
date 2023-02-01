import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/UserProfile/Profile";
import UpdateProfile from "../Pages/UserProfile/UpdateProfile";

export default function PrivateRouter({ component: Component, ...rest }) {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/profile-update" element={<UpdateProfile />}></Route>
                <Route path="*" element={<h1 style={{ color: "red" }}> Not found </h1>} />
            </Routes>
        </BrowserRouter>
    );
}
