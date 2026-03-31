import { redirect } from "next/navigation";

export default async function VerificarTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  // Redirect to the API endpoint that handles verification + auto-login
  redirect(`/api/auth/verificar/${token}`);
}
