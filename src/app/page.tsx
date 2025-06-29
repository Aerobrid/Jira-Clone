// importing the Button component from the UI library
import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { UserButton } from "@/features/auth/components/user-button";

// Home component is the main component for the home page
export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div>
      <UserButton />
    </div>
  );
};
