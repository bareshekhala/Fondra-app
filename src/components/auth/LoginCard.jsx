//using Schadcn
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '@/context/auth.context.jsx';
import service from '@/services/index.service.js';
import { useContext, useState } from "react";

export function LoginCard(){
  const { getUser, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate()

  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("")

  const [errorMessage, setErrorMessage] = useState(null)

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
      console.log(error)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        // we should send the user to an error page
      }
    }

  };

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
