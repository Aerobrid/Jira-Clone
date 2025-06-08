// This file is the main entry point 
// use client is required for Next.js 13+ app directory to enable client-side rendering
"use client";

// useRouter is a hook from Next.js that allows you to programmatically navigate between pages
import { useRouter } from "next/navigation";
// useEffect is a React hook that allows you to perform side effects in function components
import { useEffect } from "react";

// importing the Button component from the UI library
import { Button } from "@/components/ui/button";
// importing the useCurrent hook to get the current user data
import { useCurrent } from "@/features/auth/api/use-current";
// importing the useLogout hook to handle user logout functionality
import { useLogout } from "@/features/auth/api/use-logout";

// Home component is the main component for the home page
export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  // mutate is a function from the useLogout hook that is used to log out the user
  const { mutate } = useLogout();

  // useEffect hook is used to redirect the user to the sign-in page if they are not authenticated
  // .push is a method from the useRouter hook that allows you to navigate to a different page
  useEffect(() => {
    if(!data && !isLoading) {
      router.push("/sign-in");
    }
    // this effect runs when the data or when the loading state or when the router changes
  }, [data, isLoading, router]);

  // if user is authorized, return this
  return (
    <div>
      Only visible to authorized users.
      <Button onClick={() => mutate()}>
        Logout
      </Button>
    </div>
  );
};
