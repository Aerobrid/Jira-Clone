import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
// Importing the SignUpCard component for the sign-up page
import { SignUpCard } from "@/features/auth/components/sign-up-card";

// SignUpPage wrapper component 
const SignUpPage = async () => {
  const user = await getCurrent();

  if (user) redirect("/");

  return <SignUpCard />;
};

// export it as default (the main entry point for the sign-up page)
export default SignUpPage;