import { Metadata } from "next";
import { LoginForm } from "./components/login-form";

export const metadata: Metadata = {
  title: "Login | stream.gift",
};

export default async function LoginPage() {
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex flex-col justify-center h-full w-full sm:w-[480px] p-4 md:p-8">
            <div className="flex flex-col justify-center space-y-5 w-full text-left">
              <img src="/images/logo.svg" className="w-10 h-10" alt="Logo" />

              <LoginForm />
            </div>
          </div>
        </div>

        <div
          id="side-panel"
          className="transition-all duration-500 ease-in-out bg-gradient-to-br bg-[#2585f4] w-full h-full hidden md:block relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/20 animate-pulse"></div>
        </div>
      </div>
    </>
  );
}
