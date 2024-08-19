import { useState } from "react";
import "./index.css";
import Login from "./Login";
import Register from "./Register";

export default function AuthenticationPage () {
    const [step, setStep] = useState("login")
    return (
        <div className="auth-container">
            <div className="auth-left-container">
                <div className="comapany-name"><span className="comapany-name-highlight">Ques.</span>AI</div>
                <div className="comapany-info">Your Podcast will no lonager be just a hobby.</div>
                <div className="comapany-sub-text">super charge your distribution using our AI assistant!</div>
            </div>
            <div className="auth-right-container">
                <div className="welocome-container">
                    <div className="welcome-text">Welcome To</div>
                    <div className="comapany-name-highlight">Ques.AI</div>
                </div>
                {step === "login" && <Login setStep={setStep}/>}
                {step === "register" && <Register setStep={setStep}/>}
            </div>
        </div>
    )

}