import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseApi from "../../../API/baseApi";

export default function Register() {
    const emailRef = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);

            const res = await baseApi.post("/user/signup", {
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
            const user = res.data?.user;
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate("/");
        } catch (err) {
            toast(err?.response?.data.message);
            setError(err.message);
        }

        setLoading(false);
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <ToastContainer />
            <div className="w-100" style={{ maxWidth: "420px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="firstName" className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="firstName" ref={firstName} required />
                            </Form.Group>
                            <Form.Group id="lastName" className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="lastName" ref={lastName} required />
                            </Form.Group>
                            <Form.Group id="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm" className="mb-3">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button disabled={loading} className="w-100 btn-warning" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/">Log In</Link>
                </div>
            </div>
        </Container>
    );
}
