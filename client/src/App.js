import "./App.css";
import Router from "./components/Router/Router";
import { AuthProvider } from "./context/Auth/AuthContext";

function App() {
    console.log("app");
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}

export default App;
