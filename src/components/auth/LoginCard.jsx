//using Schadcn
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '@/context/auth.context.jsx';
import service from '@/services/index.service.js';
import showError from "@/utils/showError.js";
import { useContext, useState } from "react";

export function LoginCard(){
  const { getUser } = useContext(AuthContext);

  const navigate = useNavigate()

  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("")

  const [errorMessage, setErrorMessage] = useState(null)
  const [unverified, setUnverified] = useState(false);
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleIdentifier = (e) => setIdentifier(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

   const handleLogin = async (e) => {
    e.preventDefault();

    const body = {
     identifier,
     password
    }
 try {
      
      // ... contact backend validate user credentials
   
      const response = await service.post("/auth/login", body)
      console.log(response)

      // store the token in localStorage
      localStorage.setItem("authToken", response.data.authToken)

      // load the user into the context (it uses the token we just stored)
      await getUser()
      navigate("/dashboard")

    } catch (error) {
      console.log(error);
      setErrorMessage(showError(error));

      if (error.response && error.response.status === 403) {
        setIdentifier(error.response.data.email);
        setUnverified(true);
      }
    }

  };

  const handleResend = async () => {
    setErrorMessage(null);

    try {
      await service.post("/auth/resend-code", { email: identifier });
      setCodeSent(true);
    } catch (error) {
      console.log(error);
      setErrorMessage(showError(error));
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.includes("@")) {
      setErrorMessage("Enter the email you signed up with");
      return;
    }

    try {
      await service.post("/auth/resend-code", { email: identifier });
      setForgot(false);
      setResetting(true);
      setCodeSent(true);
    } catch (error) {
      console.log(error);
      setErrorMessage(showError(error));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      if (resetting) {
        await service.post("/auth/reset-password", { email: identifier, code, password: newPassword });
        setErrorMessage("Password changed. Sign in with the new one.");
      } 
      else {
        await service.post("/auth/verify-email", { email: identifier, code });
        setErrorMessage("Your email is verified. Sign in again.");
      }

      setCodeSent(false);
      setResetting(false);
      setUnverified(false);
      setCode("");
      setNewPassword("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setErrorMessage(showError(error));
    }
  };

  if (codeSent) {
    return (
      <div className="w-full">
        <div className="flex flex-col">
          <span className="auth-eyebrow">Check your email</span>
          <h1 className="auth-title">{resetting ? "Reset your password" : "Enter your code"}</h1>
          <p className="auth-sub">
            We sent a 6-digit code to {identifier}. It expires in 10 minutes.
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <Input
            id="code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="auth-input h-14 text-center text-2xl tracking-[0.4em]"
          />

          {resetting && (
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              autoComplete="new-password"
              required
              className="auth-input"
            />
          )}

          <button
            type="submit"
            disabled={code.length !== 6 || (resetting && !newPassword)}
            className="violet-button w-full justify-center disabled:opacity-50"
          >
            Verify
          </button>

          {errorMessage && <p className="auth-error">{errorMessage}</p>}

          <p className="auth-alt">
            Code expired?{" "}
            <button type="button" onClick={handleResend} className="violet-link">
              Resend code
            </button>
          </p>

          <p className="auth-alt">
            <button
              type="button"
              onClick={() => {
                setCodeSent(false);
                setResetting(false);
                setCode("");
                setNewPassword("");
                setErrorMessage(null);
              }}
              className="violet-link"
            >
              ← Back to sign in
            </button>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <span className="auth-eyebrow">Log in</span>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">See how your people are doing.</p>
      </div>

      <div>
        <form onSubmit={forgot ? handleForgot : handleLogin} className="flex flex-col gap-5">
          <div className="grid gap-2">
            <Label htmlFor="identifier" className="auth-label">
              {forgot ? "Email" : "Username or email"}
            </Label>

            <Input
              value={identifier}
              onChange={handleIdentifier}
              id="identifier"
              type={forgot ? "email" : "text"}
              placeholder={forgot ? "The email you signed up with" : "Username or email"}
              autoComplete={forgot ? "email" : "username"}
              required
              className="auth-input"
            />
          </div>

          {!forgot && (
            <div className="grid gap-2">
              <Label htmlFor="password" className="auth-label">
                Password
              </Label>

              <Input
                value={password}
                onChange={handlePasswordChange}
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="auth-input"
              />
            </div>
          )}

          <button type="submit" className="violet-button mt-1 w-full justify-center">
            {forgot ? "Get a code" : "Sign in"}
          </button>

          {errorMessage && <p className="auth-error">{errorMessage}</p>}

          {unverified && (
            <p className="auth-alt">
              Signed up but never got the code?{" "}
              <button type="button" onClick={handleResend} className="violet-link">
                Send me a new one
              </button>
            </p>
          )}
        </form>

        {forgot ? (
          <p className="auth-alt">
            <button
              type="button"
              onClick={() => {
                setForgot(false);
                setErrorMessage(null);
              }}
              className="violet-link"
            >
              ← Back to sign in
            </button>
          </p>
        ) : (
          <>
            <p className="auth-alt">
              New here?{" "}
              <Link to="/signup" className="violet-link">
                Create an account
              </Link>
            </p>

            <p className="auth-alt">
              <button
                type="button"
                onClick={() => {
                  setForgot(true);
                  setErrorMessage(null);
                }}
                className="violet-link"
              >
                Forgot your password?
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginCard;
