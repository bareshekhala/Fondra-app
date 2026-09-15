import LoginCard from "@/components/auth/LoginCard.jsx";
import Navbar from "@/components/layout/Navbar.jsx";

function LoginPage() {
  return (
    <div className="bg-[#F8F5FF] dark:bg-[#25213A]">
      <Navbar />

      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <LoginCard />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
