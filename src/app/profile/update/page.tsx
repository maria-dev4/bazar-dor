import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { auth } from "@/lib/auth";

export const instant = false;

const UpdateProfilePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin?from=protected");
  }

  return <UpdateProfileForm currentName={session.user.name} />;
};

export default UpdateProfilePage;