import LoginForm from "./LoginForm";

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const redirectTo = params?.redirect || "/";
  return <LoginForm redirectTo={redirectTo}></LoginForm>;
}