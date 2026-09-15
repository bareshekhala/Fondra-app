import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "@/services/index.service.js";
function SignUpCard() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleInvite = (e) => setInviteCode(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const body = {
      email,
      username,
      password,
      name,
      inviteCode,
    };

    try {
      // ... contact backend to register the user

      await service.post("/auth/signup", body);
      console.log("all good, user created, maybe");

      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        // we should send the user to an error page
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/85 dark:bg-[#403A5D]/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
      <CardHeader className="px-5 sm:px-6">
        <CardTitle className="text-2xl sm:text-3xl text-center text-[#403A5D] dark:text-white">
          Create an account
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5 sm:px-6">
        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-[#403A5D] dark:text-gray-100">
              Name
            </Label>

            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="rounded-full dark:text-[#dfdcec]"
              onChange={handleName}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="username"
              className="text-[#403A5D] dark:text-gray-100"
            >
              Username
            </Label>

            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              className="rounded-full
              dark:text-[#dfdcec]"
              onChange={handleUsernameChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="email"
              className="text-[#403A5D] dark:text-gray-100"
            >
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="rounded-full
              dark:text-[#dfdcec]"
              onChange={handleEmailChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="password"
              className="text-[#403A5D] dark:text-gray-100
              "
            >
              Password
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              className="rounded-full
               dark:text-[#dfdcec]"
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="invitation"
              className="text-[#403A5D] dark:text-gray-100"
            >
              Invitation code/link
              <span className="text-gray-400 dark:text-gray-500">
                (optional)
              </span>
            </Label>

            <Input
              id="invitation"
              type="text"
              placeholder="Enter invitation code or link"
              className="rounded-full
               dark:text-[#dfdcec]"
              onChange={handleInvite}
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-linear-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white"
          >
            Create account
          </Button>
          {errorMessage && <p className="dark:text-fuchsia-300">{errorMessage}</p>}
        </form>

        <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-fuchsia-300 hover:text-pink-600"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignUpCard;
