import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { useAuth } from "../../../context/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseApi from "../../../API/baseApi";

export default function UpdateProfile(props) {
    const emailRef = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const currentPasswordRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        const promises = [];
        setLoading(true);
        setError("");

        if (emailRef.current.value !== currentUser.email || emailRef.current.value !== "") {
            const res = await baseApi.patch("/user/" + currentUser.id, {
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                email: emailRef.current.value,
            });
            const user = res.data?.user;

            localStorage.setItem("currentUser", JSON.stringify(user));
        }
        if (currentPasswordRef.current.value) {
            const res = await baseApi.put("/user/change-password", {
                password: currentPasswordRef,
                passwordRef,
            });
            // localStorage.setItem("currentUser", JSON.stringify(user));
            // setCurrentUser(user);
        }

        setLoading(false);
    }

    return (
        <>
            <ToastContainer />

            <NavbarComponent />
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "90vh" }}
            >
                <div className="w-100" style={{ maxWidth: "460px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Update Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="firstName" className="mb-2">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="firstName"
                                        ref={firstName}
                                        required
                                        defaultValue={currentUser.firstName}
                                    />
                                </Form.Group>
                                <Form.Group id="lastName" className="mb-2">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="lastName"
                                        ref={lastName}
                                        required
                                        defaultValue={currentUser.lastName}
                                    />
                                </Form.Group>
                                <Form.Group id="email" className="mb-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        ref={emailRef}
                                        required
                                        defaultValue={currentUser.email}
                                    />
                                </Form.Group>
                                <Form.Group id="currentPasswordRef">
                                    <Form.Label>Your Password</Form.Label>
                                    <Form.Control type="currentPasswordRef" ref={currentPasswordRef} />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} />
                                </Form.Group>
                                <Button
                                    disabled={loading}
                                    className="w-100 mt-3 btn btn-warning"
                                    type="submit"
                                >
                                    Update
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-3 btn btn-outline-info ">
                        <Link to="/user">Cancel</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}
