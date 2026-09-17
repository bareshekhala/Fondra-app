import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

import { AuthContext } from "@/context/auth.context.jsx";
import logo from "@/assets/mark-quiet.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";

import Avatar from "@/components/shared/Avatar.jsx";
import ThemeToggle from "@/components/layout/ThemeToggle.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {!isLoggedIn && (
        <>
          {/* Desktop */}
          <nav className="hidden md:flex fixed top-0 z-50 w-full items-center justify-between px-8 py-3 shrink-0 navbar-glass text-[#1E1A2F] dark:text-foreground">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <img
                src={logo}
                alt="Fondra"
                className="h-9 w-9"
              />

              <span className="font-wordmark text-2xl text-[#1E1A2F] dark:text-foreground">
                Fondra
              </span>
            </Link>

            <div className="font-body flex items-center gap-8 text-[15px] font-medium">
              <Link
                to="/about"
                className="text-[#1E1A2F]/80 dark:text-[#CFC6E6] transition-colors hover:text-[#6A59C4] dark:hover:text-[#F2C3D5]"
              >
                About
              </Link>

              <Link
                to="/signup"
                className="text-[#1E1A2F]/80 dark:text-[#CFC6E6] transition-colors hover:text-[#6A59C4] dark:hover:text-[#F2C3D5]"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="text-[#1E1A2F]/80 dark:text-[#CFC6E6] transition-colors hover:text-[#6A59C4] dark:hover:text-[#F2C3D5]"
              >
                Login
              </Link>

              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile */}
          <nav className="md:hidden fixed top-0 z-50 flex w-full items-center justify-between px-4 py-2.5 shrink-0 navbar-glass text-[#1E1A2F] dark:text-foreground">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <img
                src={logo}
                alt="Fondra"
                className="h-9 w-9"
              />

              <span className="font-wordmark text-2xl text-[#1E1A2F] dark:text-foreground">
                Fondra
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                    />
                  }
                >
                  <Menu />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={10}
                  className="w-44 rounded-2xl border border-white/60 dark:border-white/15 bg-white/90 dark:bg-[#211B3D]/95 backdrop-blur-lg p-1.5"
                >
                  <DropdownMenuItem
                    render={<Link to="/about" />}
                    className="font-body block w-full rounded-xl px-3 py-2.5 text-[15px] font-medium cursor-pointer text-[#1E1A2F] dark:text-foreground focus:bg-background dark:focus:bg-white/10"
                  >
                    About
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    render={<Link to="/signup" />}
                    className="font-body block w-full rounded-xl px-3 py-2.5 text-[15px] font-medium cursor-pointer text-[#1E1A2F] dark:text-foreground focus:bg-background dark:focus:bg-white/10"
                  >
                    Sign Up
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    render={<Link to="/login" />}
                    className="font-body block w-full rounded-xl px-3 py-2.5 text-[15px] font-medium cursor-pointer text-[#1E1A2F] dark:text-foreground focus:bg-background dark:focus:bg-white/10"
                  >
                    Login
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </>
      )}

      {isLoggedIn && (
        <>
          {/* Desktop */}
          <nav className="hidden md:flex fixed top-0 z-50 w-full items-center justify-between px-8 py-3 shrink-0 navbar-glass text-[#1E1A2F] dark:text-foreground">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <img
                src={logo}
                alt="Fondra"
                className="h-9 w-9"
              />

              <span className="font-wordmark text-2xl text-[#1E1A2F] dark:text-foreground">
                Fondra
              </span>
            </Link>

            <div className="font-body flex items-center gap-8 text-[15px] font-medium">
              <Link
                to="/dashboard"
                className="text-[#1E1A2F]/80 dark:text-[#CFC6E6] transition-colors hover:text-[#6A59C4] dark:hover:text-[#F2C3D5]"
              >
                Dashboard
              </Link>

              <Link
                to="/garden"
                className="text-[#1E1A2F]/80 dark:text-[#CFC6E6] transition-colors hover:text-[#6A59C4] dark:hover:text-[#F2C3D5]"
              >
                Garden
              </Link>

              <Link
                to="/circle"
                className="text-[#1E1A2F]/80 dark:text-[#CFC6E6] transition-colors hover:text-[#6A59C4] dark:hover:text-[#F2C3D5]"
              >
                Circle
              </Link>

              <Link
                to="/profile"
                className="text-[#1E1A2F]/80 dark:text-[#CFC6E6] transition-colors hover:text-[#6A59C4] dark:hover:text-[#F2C3D5]"
              >
                Profile
              </Link>

              <ThemeToggle />

              {user && (
                <Link to="/profile">
                  <Avatar user={user} size={36} />
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-[#9990BE] hover:text-[#6A59C4] dark:text-[#9C94BC] dark:hover:text-[#F2C3D5] transition-colors"
              >
                Sign out
              </button>
            </div>
          </nav>

          {/* Mobile */}
          <nav className="md:hidden fixed top-0 z-50 flex w-full items-center justify-between px-4 py-2.5 shrink-0 navbar-glass text-[#1E1A2F] dark:text-foreground">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <img
                src={logo}
                alt="Fondra"
                className="h-9 w-9"
              />

              <span className="font-wordmark text-2xl text-[#1E1A2F] dark:text-foreground">
                Fondra
              </span>
            </Link>

            <div className="flex items-center gap-1">
              {user && (
                <Link to="/profile" className="mr-1">
                  <Avatar user={user} size={32} />
                </Link>
              )}

              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                    />
                  }
                >
                  <Menu />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={10}
                  className="w-44 rounded-2xl border border-white/60 dark:border-white/15 bg-white/90 dark:bg-[#211B3D]/95 backdrop-blur-lg p-1.5"
                >
                  <DropdownMenuItem
                    render={<Link to="/dashboard" />}
                    className="font-body block w-full rounded-xl px-3 py-2.5 text-[15px] font-medium cursor-pointer text-[#1E1A2F] dark:text-foreground focus:bg-background dark:focus:bg-white/10"
                  >
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    render={<Link to="/garden" />}
                    className="font-body block w-full rounded-xl px-3 py-2.5 text-[15px] font-medium cursor-pointer text-[#1E1A2F] dark:text-foreground focus:bg-background dark:focus:bg-white/10"
                  >
                    Garden
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    render={<Link to="/circle" />}
                    className="font-body block w-full rounded-xl px-3 py-2.5 text-[15px] font-medium cursor-pointer text-[#1E1A2F] dark:text-foreground focus:bg-background dark:focus:bg-white/10"
                  >
                    Circle
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    render={<Link to="/profile" />}
                    className="font-body block w-full rounded-xl px-3 py-2.5 text-[15px] font-medium cursor-pointer text-[#1E1A2F] dark:text-foreground focus:bg-background dark:focus:bg-white/10"
                  >
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="font-body rounded-xl px-3 py-2.5 text-[15px] font-medium cursor-pointer text-[#9990BE] dark:text-[#9C94BC] focus:bg-background dark:focus:bg-white/10"
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default Navbar;
