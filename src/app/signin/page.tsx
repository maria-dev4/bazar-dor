import { Suspense } from "react";
import SignInForm from "@/components/SignIn";

interface Props {
  searchParams: Promise<{ from?: string }>;
}

const SignInContent = async ({ searchParams }: Props) => {
  const { from } = await searchParams;

  return <SignInForm fromProtected={from === "protected"} />;
};

const SignInPage = ({ searchParams }: Props) => {
  return (
    <Suspense>
      <SignInContent searchParams={searchParams} />
    </Suspense>
  );
};

export default SignInPage;
