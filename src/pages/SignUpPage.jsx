import SignUpCard from '@/components/auth/SignUpCard.jsx'
import Navbar from '@/components/layout/Navbar.jsx'
function SignUpPage() {
  return (
    <>
<div>
<Navbar/>
</div>

    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[#F8F5FF] dark:bg-[#25213A]">
      <SignUpCard/ >
    </div></>
  )
}

export default SignUpPage
