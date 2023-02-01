import React, { useState } from "react";
import { Alert, Button, Card, Container } from "react-bootstrap";
import { useAuth } from "../../../context/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseApi from "../../../API/baseApi";

export default function Profile() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        setError("");
        try {
            await baseApi.delete("/user/log-out");
            navigate("/");
        } catch {
            setError("Failed to log out");
        }
    }

    return (
        <>
            <NavbarComponent />
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: "420px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Your Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <strong>Email:</strong> {currentUser.email}
                            <Link to="/profile-update" className="btn btn-warning w-100 mt-3">
                                Update Profile
                            </Link>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-3 btn btn-outline-info" onClick={handleLogout}>
                        Log Out
                    </div>
                </div>
            </Container>
        </>
    );
}
