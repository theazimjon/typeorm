import React from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

function Router(props) {
    const { currentUser } = useAuth();
    return currentUser ? <PrivateRouter /> : <PublicRouter />;
}

export default Router;
