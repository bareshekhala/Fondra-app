import { Routes, Route } from "react-router-dom";

import LandingPage from "@/pages/LandingPage.jsx";
import SignUpPage from "@/pages/SignUpPage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import UserDashboardPage from "@/pages/UserDashboardPage.jsx";
import ProfilePage from "@/pages/ProfilePage.jsx";
import HowItWorksPage from "@/pages/HowItWorksPage.jsx";
import GardenPage from "@/pages/GardenPage.jsx";
import MyCollectionPage from "@/pages/MyCollectionPage.jsx";
import UnplantedPage from "@/pages/UnplantedPage.jsx";
import CirclePage from "@/pages/CirclePage.jsx";
import OnlyPrivate from "@/components/auth/OnlyPrivate.jsx";
import NoAccount from "@/components/auth/NoAccount.jsx";
import { Toaster } from "@/components/ui/toast.jsx";
function App() {

  return (
    <>
    <div>
     <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/howitworks" element={<HowItWorksPage />} />
            <Route path="/signup" element={ <NoAccount><SignUpPage /></NoAccount> } />
            <Route path="/login" element={ <NoAccount><LoginPage /></NoAccount> } />
            <Route path="/dashboard" element={ <OnlyPrivate><UserDashboardPage /></OnlyPrivate> } />
            <Route path="/profile" element={ <OnlyPrivate><ProfilePage /></OnlyPrivate> } />
            <Route path="/garden" element={ <OnlyPrivate><GardenPage /></OnlyPrivate> } />
            <Route path="/garden/collection" element={ <OnlyPrivate><MyCollectionPage /></OnlyPrivate> } />
            <Route path="/garden/unplanted" element={ <OnlyPrivate><UnplantedPage /></OnlyPrivate> } />
            <Route path="/circle" element={ <OnlyPrivate><CirclePage /></OnlyPrivate> } />
            </Routes>
            <Toaster />
            </div>
    </>
  )
}

export default App
