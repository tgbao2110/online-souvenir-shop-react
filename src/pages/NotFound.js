import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const { user } = useAuth();
    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
            <h1>Your role is {user.role}. You don't have access to this page.</h1>
            <Link to={user.role === 'admin' ? "/admin/dashboard" : "/"}>Home</Link>
        </div>
    );
}
