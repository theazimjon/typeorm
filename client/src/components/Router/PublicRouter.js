import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/UserProfile/Login";
import Register from "../Pages/UserProfile/Register";

function PublicRouter(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="*" element={<h1 style={{ color: "red" }}> Not found </h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default PublicRouter;
