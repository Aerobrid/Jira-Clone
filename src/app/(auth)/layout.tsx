"use client";

// image and link components from Next.js (for optimized images and client-side navigation)
import Image from "next/image";
import Link from "next/link";
// usePathname is a hook from Next.js allowing you to get the current pathname (ex: "/sign-in" or "/sign-up")
import { usePathname } from "next/navigation";
// button component from ui library 
import { Button } from "@/components/ui/button";

// typescript interface is a way to define the shape of an object
// it is used to create the props that the AuthLayout component expects
// it expects a children prop which is of type React.ReactNode (can be any valid React element)
interface AuthLayoutProps {
  children: React.ReactNode
};

// AuthLayout component is a layout component for the authentication pages (sign-in and sign-up)
const AuthLayout = ({ children }: AuthLayoutProps ) => {
  // usePathname hook to get the current pathname
  const pathname = usePathname();
  // isSignIn is a boolean that checks if the current pathname is "/sign-in"
  // this is used to render a button for either signing in or signing up
  const isSignIn = pathname === "/sign-in";

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl; p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" height={56} width={152} alt="logo" />
          <Button asChild variant="secondary">
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? "Sign Up" : "Login"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout