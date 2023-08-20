import { implicitAuth } from "../../auth/auth";
import Button from "../../components/button";
import "./style.css";

export default function Login() {
    
    return (
        <div className="login-page">
            <Button handleClick={implicitAuth} label="Login"/>
        </div>
    )
}