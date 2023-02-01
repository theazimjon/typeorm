import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../Navbar/Navbar";
import { useParams, useLocation } from "react-router-dom";

export default function Home(props) {
    return (
        <>
            <Navbar />
            <Container fluid></Container>
        </>
    );
}
