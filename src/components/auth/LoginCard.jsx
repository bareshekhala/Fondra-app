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
  const { getUser, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate()

  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("")

  const [errorMessage, setErrorMessage] = useState(null)
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const handleIdentifier = (e) => setIdentifier(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

   const handleLogin = async (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      setErrorMessage("You are already logged in.");
      return;
    }

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
        setUnverifiedEmail(error.response.data.email);
      }
    }

  };

  const handleResend = async () => {
    setErrorMessage(null);

    try {
      await service.post("/auth/resend-code", { email: unverifiedEmail });
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
      await service.post("/auth/verify-email", { email: unverifiedEmail, code });
      setCodeSent(false);
      setUnverifiedEmail(null);
      setCode("");
      setErrorMessage("Your email is verified. Sign in again.");
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
          <h1 className="auth-title">Enter your code</h1>
          <p className="auth-sub">
            We sent a 6-digit code to {unverifiedEmail}. It expires in 10 minutes.
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

          <button
            type="submit"
            disabled={code.length !== 6}
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
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="grid gap-2">
            <Label htmlFor="identifier" className="auth-label">
              Username or email
            </Label>

            <Input
              value={identifier}
              onChange={handleIdentifier}
              id="identifier"
              type="text"
              placeholder="Username or email"
              autoComplete="username"
              required
              className="auth-input"
            />
          </div>

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

          <button type="submit" className="violet-button mt-1 w-full justify-center">
            Sign in
          </button>

          {errorMessage && <p className="auth-error">{errorMessage}</p>}

          {unverifiedEmail && (
            <p className="auth-alt">
              Signed up but never got the code?{" "}
              <button type="button" onClick={handleResend} className="violet-link">
                Send me a new one
              </button>
            </p>
          )}
        </form>

        <p className="auth-alt">
          New here?{" "}
          <Link to="/signup" className="violet-link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginCard;
