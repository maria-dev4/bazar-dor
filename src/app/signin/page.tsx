import SignInForm from "@/components/SignIn";

interface Props {
  searchParams: Promise<{ from?: string }>;
}

const SignInPage = async ({ searchParams }: Props) => {
  const { from } = await searchParams;

  return <SignInForm fromProtected={from === "protected"} />;
};

export default SignInPage;