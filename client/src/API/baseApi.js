import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        Accept: "application/vnd.GitHub.v3+json",
        "Content-Type": "application/json",
    },
});
