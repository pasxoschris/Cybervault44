import React, { useState } from "react";
import { signInWithProvider } from "@/lib/authMfaFlow";
import { Button } from "@/components/ui/button";
import { LogIn, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import { safeReturnTo } from "@/lib/authReturnTo";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Post-login destination (e.g. the MCP OAuth consent page sends users here
  // with returnTo so the grant flow can resume). Same-origin paths only.
  const returnTo = safeReturnTo();

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithProvider("google", returnTo);
    } catch (err) {
      setError(err.message || "Unable to sign in with Google");
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      icon={LogIn}
      title="Welcome back"
      subtitle="Log in to your account"
      footer={
        <>
          <span className="block">
            Θέλεις πρόσβαση στο εκπαιδευτικό υλικό; Στείλε email στο{" "}
            <a href="mailto:support@cybervault.gr" className="text-primary font-medium hover:underline">
              support@CyberVault.gr
            </a>
          </span>
        </>
      }
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <Button
        variant="outline"
        className="w-full h-12 text-sm font-medium"
        onClick={handleGoogle}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Redirecting...
          </>
        ) : (
          <>
            <GoogleIcon className="w-5 h-5 mr-2" />
            Continue with Google
          </>
        )}
      </Button>
    </AuthLayout>
  );
}