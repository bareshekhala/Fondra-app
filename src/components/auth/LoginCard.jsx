//using Schadcn
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '@/context/auth.context.jsx';
import service from '@/services/index.service.js';
import { useContext, useState } from "react";

export function LoginCard(){
  const { getUser } = useContext(AuthContext);

  const navigate = useNavigate()

  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("")

  const [errorMessage, setErrorMessage] = useState(null)

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
      console.log(error)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        // we should send the user to an error page
      }
    }

  };

  return (
    <Card
      className="
          w-full
          bg-white/85
          dark:bg-[#403A5D]/90
          shadow-[0_16px_46px_rgba(33,27,61,0.14)]
          dark:shadow-[0_16px_46px_rgba(0,0,0,0.35)]
          backdrop-blur-xl
          p-3
          py-8
        "
    >
      <CardHeader>
        <CardTitle
          className="
              font-serif
              text-3xl
              font-normal
              text-[#211B3D]
              dark:text-foreground
            "
        >
          Welcome!
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label
              className="
                      text-[#453D6B]
                      dark:text-[#D5C9EE]
                    "
            >
              Username or email
            </Label>

            <Input 
              value={identifier}

            onChange={handleIdentifier}
              id="identifier"
                type="text"

              placeholder="Username or Email"
              autoComplete="username"
              required
              className="
                      border-[#7C6BD4]/20
                      bg-white/75
                      text-[#211B3D]
                      placeholder:text-[#9990BE]
                      focus-visible:border-[#7C6BD4]
                      focus-visible:ring-[#7C6BD4]/30

                      dark:border-[#C2B3E4]/20
                      dark:bg-[#211B3D]/35
                      dark:text-foreground
                      dark:placeholder:text-[#9990BE]
                      dark:focus-visible:border-[#C2B3E4]
                      dark:focus-visible:ring-[#C2B3E4]/30
                    "
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="password"
              className="
                        text-[#453D6B]
                        dark:text-[#D5C9EE]
                      "
            >
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
              className="
                      border-[#7C6BD4]/20
                      bg-white/75
                      text-[#211B3D]
                      placeholder:text-[#9990BE]
                      focus-visible:border-[#7C6BD4]
                      focus-visible:ring-[#7C6BD4]/30

                      dark:border-[#C2B3E4]/20
                      dark:bg-[#211B3D]/35
                      dark:text-foreground
                      dark:placeholder:text-[#9990BE]
                      dark:focus-visible:border-[#C2B3E4]
                      dark:focus-visible:ring-[#C2B3E4]/30
                    "
            />
          </div>

          <Button
            type="submit"
            className="
                    w-full
                    rounded-full
                    border-none
                    bg-linear-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white"
                  
                  
          >
            Sign in
          </Button>
          {errorMessage && <p className="dark:text-fuchsia-300">{errorMessage}</p>}
        </form>

        <p
          className="
                mt-4
                text-center
                text-sm
                font-medium
                text-muted-foreground
                dark:text-[#C2B3E4]
              "
        >
          New here?{" "}
          <Link
            to="/signup"
            className="
                    text-[#211B3D]
                    underline
                    underline-offset-4
                    dark:text-foreground
                  "
          >
            Create an account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default LoginCard;
