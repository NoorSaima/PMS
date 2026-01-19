import { Link } from '@/i18n/routing';
import LoginForm from "@/components/partials/auth/login-form";
import Social from "@/components/partials/auth/social";
import Image from "next/image";
import Copyright from "@/components/partials/auth/copyright";
import LoginAnimation from "@/components/partials/auth/login-animation";
const Login2 = () => {
  return (
    <div className="flex w-full items-center overflow-hidden min-h-dvh h-dvh basis-full bg-white dark:bg-default-50">
      <div className="overflow-y-auto flex flex-wrap w-full h-dvh">

        {/* Left Side - Application */}
        <div className="flex-1 relative flex flex-col h-full bg-white dark:bg-default-50 z-20">
          <div className="h-full flex flex-col justify-center items-center p-8 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-full max-w-[440px] space-y-0">

              {/* Logo for mobile only */}
              <div className="flex justify-center mb-8 lg:hidden">
                <Link href="/" className="flex gap-2 items-center text-center">
                  <div className="relative h-12 w-12">
                    <Image src="/images/logo/ihc_logo.png" fill alt="Max PMS Logo" className="object-contain" />
                  </div>
                  <span className="text-xl font-bold text-default-900">MAX-PMS</span>
                </Link>
              </div>

              <div className="text-center space-y-1">
                <h4 className="font-bold text-4xl text-default-900 tracking-tight">Welcome Back</h4>
                <p className="text-default-500 text-base">
                  Sign in to your account to continue
                </p>
              </div>

              <div className="bg-transparent py-4">
                <LoginForm />
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-default-500 font-medium">
                  Don’t have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-primary-600 font-bold hover:text-primary-700 transition-colors ml-1"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

            </div>

            <div className="absolute bottom-8 w-full text-center">
              <p className="text-xs text-default-400 opacity-70">
                <Copyright />
              </p>
            </div>
          </div>
        </div>

        <LoginAnimation />

      </div>
    </div>
  );
};

export default Login2;
