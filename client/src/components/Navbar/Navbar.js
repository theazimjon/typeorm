import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
    return (
        <Navbar
            className="justify-content-center"
            expand="sm"
            style={{ backgroundColor: "greenyellow", marginBottom: "20px" }}
        >
            <Navbar.Brand
                eventKey="1"
                as={Link}
                to={"/"}
                style={{
                    color: "blue",
                    fontStyle: "bold",
                    fontWeight: "30px",
                    cursor: "pointer",
                    padding: "16px",
                    textDecoration: "aquamarine",
                }}
            >
                Test project
            </Navbar.Brand>
            <Nav>
                <Nav.Link eventKey="1" as={Link} to="/profile" style={{ alignItems: "right" }}>
                    <Button variant="outline-success">Profile</Button>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}
