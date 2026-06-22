import RegisterForm from "./RegisterForm";

export default async function RegisterPage({ searchParams }) {
  const params = await searchParams;
  const redirectTo = params?.redirect || "/";
  return <RegisterForm redirectTo={redirectTo}></RegisterForm>;
}
