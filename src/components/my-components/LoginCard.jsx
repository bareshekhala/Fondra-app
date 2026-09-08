//using Schadcn

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function LoginCard() {
  return (
    <div className="flex justify-center md:h-100">

      <Tabs
        defaultValue="account"
        className="w-full max-w-sm md:max-w-105"
      >

        <Card className="
          w-full
          bg-white/85
          dark:bg-[#403A5D]/90
          shadow-[0_16px_46px_rgba(33,27,61,0.14)]
          dark:shadow-[0_16px_46px_rgba(0,0,0,0.35)]
          backdrop-blur-xl
          p-3
          py-8
        ">

          <CardHeader>

            <CardTitle className="
              font-serif
              text-3xl
              font-normal
              text-[#211B3D]
              dark:text-[#F1ECFA]
            ">
              Welcome back!
            </CardTitle>

            <TabsList className="
              mt-4
              grid
              w-full
              grid-cols-2
              rounded-full
              bg-white/60
              dark:bg-[#211B3D]/40
              p-1
            ">

              <TabsTrigger
                value="account"
                className="
                  rounded-full
                  text-[#6E6598]
                  dark:text-[#C2B3E4]
                "
              >
                I have an account
              </TabsTrigger>

              <TabsTrigger
                value="invitation"
                className="
                  rounded-full
                  text-[#6E6598]
                  dark:text-[#C2B3E4]
                "
              >
                I was invited
              </TabsTrigger>

            </TabsList>

          </CardHeader>


          <TabsContent value="account" className="mt-0">

            <CardContent>

              <form className="flex flex-col gap-6">

                <div className="grid gap-2">

                  <Label
                    htmlFor="email"
                    className="
                      text-[#453D6B]
                      dark:text-[#D5C9EE]
                    "
                  >
                    Username or email
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
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
                      dark:text-[#F1ECFA]
                      dark:placeholder:text-[#9990BE]
                      dark:focus-visible:border-[#C2B3E4]
                      dark:focus-visible:ring-[#C2B3E4]/30
                    "
                  />

                </div>


                <div className="grid gap-2">

                  <div className="flex items-center justify-between">

                    <Label
                      htmlFor="password"
                      className="
                        text-[#453D6B]
                        dark:text-[#D5C9EE]
                      "
                    >
                      Password
                    </Label>

                  </div>

                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
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
                      dark:text-[#F1ECFA]
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
                    bg-linear-to-b
                    from-[#FFFCFE]
                    to-[#F2C3D5]
                    text-[#2A2148]
                    shadow-[0_6px_18px_rgba(222,123,158,0.34)]
                    hover:to-[#EBB4CB]
                  "
                >
                  Sign in
                </Button>

              </form>


              <p className="
                mt-4
                text-center
                text-sm
                font-medium
                text-[#6E6598]
                dark:text-[#C2B3E4]
              ">
                New here?{" "}

                <a
                  href="#"
                  className="
                    text-[#211B3D]
                    underline
                    underline-offset-4
                    dark:text-[#F1ECFA]
                  "
                >
                  Create an account
                </a>
              </p>

            </CardContent>

          </TabsContent>


          <TabsContent value="invitation" className="mt-0">

            <CardContent>

              <form className="flex flex-col gap-6">

                <p className="
                  text-sm
                  font-medium
                  leading-relaxed
                  text-[#453D6B]
                  dark:text-[#D5C9EE]
                ">
                  Paste the link someone sent you. You'll land in their
                  circle straight away — no request for them to accept.
                </p>


                <div className="grid gap-2">

                  <Label
                    htmlFor="invitation"
                    className="
                      text-[#6E6598]
                      dark:text-[#C2B3E4]
                    "
                  >
                    Your invite link
                  </Label>

                  <Input
                    id="invitation"
                    type="text"
                    placeholder="stillhere.app/join/a3f9c2"
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
                      dark:text-[#F1ECFA]
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
                    bg-linear-to-b
                    from-[#FFFCFE]
                    to-[#F2C3D5]
                    text-[#2A2148]
                    shadow-[0_6px_18px_rgba(222,123,158,0.34)]
                    hover:to-[#EBB4CB]
                  "
                >
                  Continue
                </Button>

              </form>

            </CardContent>

          </TabsContent>

        </Card>

      </Tabs>

    </div>
  )
}

export default LoginCard