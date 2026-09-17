import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import service from "@/services/index.service.js";
import showError from "@/utils/showError.js";

import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";

function SignUpCard() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [note, setNote] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErrorMessage(null);

    try {
      await service.post("/auth/signup", {
        name,
        username,
        email,
        password,
        inviteCode,
      });

      setCodeSent(true);
      setBusy(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(showError(error));
      setBusy(false);
    }
  };

  const handleResend = async () => {
    setErrorMessage(null);

    try {
      await service.post("/auth/resend-code", { email });
      setNote("A new code is on its way. It expires in 10 minutes.");
    } catch (error) {
      console.log(error);
      setErrorMessage(showError(error));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErrorMessage(null);

    try {
      await service.post("/auth/verify-email", { email, code });

      navigate("/login");
    } catch (error) {
      console.log(error);
      setErrorMessage(showError(error));
      setBusy(false);
    }
  };

  return (
    <div className="w-full">
      {codeSent ? (
        <>
          <div className="flex flex-col">
            <span className="auth-eyebrow">Check your email</span>
            <h1 className="auth-title">Enter your code</h1>
            <p className="auth-sub">
              We sent a 6-digit code to {email}. It expires in 10 minutes.
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
              disabled={busy || code.length !== 6}
              className="violet-button w-full justify-center disabled:opacity-50"
            >
              {busy ? "Checking…" : "Verify"}
            </button>

            {errorMessage && <p className="auth-error">{errorMessage}</p>}

            {note && <p className="auth-sub">{note}</p>}

            <p className="auth-alt">
              Code expired or never arrived?{" "}
              <button type="button" onClick={handleResend} className="violet-link">
                Resend code
              </button>
            </p>
          </form>
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <span className="auth-eyebrow">Sign up</span>
            <h1 className="auth-title">Create your account</h1>
            <p className="auth-sub">
              After signing up, we'll send you a code to verify your email address.
            </p>
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="auth-label">
                  Name
                </Label>

                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="auth-label">
                  Username
                </Label>

                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="auth-label">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="auth-label">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="invitation" className="auth-label flex justify-between">
                Invite code
                <span className="font-medium text-[#6F6A86] dark:text-[#9C94BC]">
                  optional
                </span>
              </Label>

              <Input
                id="invitation"
                type="text"
                placeholder="Got a code from someone in your circle? Paste it here."
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="auth-input"
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="violet-button mt-1 w-full justify-center disabled:opacity-50"
            >
              {busy ? "Creating…" : "Create account"}
            </button>

            {errorMessage && <p className="auth-error">{errorMessage}</p>}
          </form>

          <p className="auth-alt">
            Already have an account?{" "}
            <Link to="/login" className="violet-link">
              Log in
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

export default SignUpCard;
