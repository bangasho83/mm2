"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });
      if (!response.ok) {
        throw new Error("Unable to create session");
      }
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      const idToken = await credential.user.getIdToken();
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });
      if (!response.ok) {
        throw new Error("Unable to create session");
      }
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#d7e1fb] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full flex-1 flex-col gap-10">
          <div className="flex items-center gap-2 text-lg font-semibold text-ink-900">
            MetrixMate
          </div>
          <div className="hidden max-w-md text-4xl font-semibold text-ink-900 lg:block">
            AI Co-pilot that <span className="text-brand-600">reduces</span> agency&apos;s{" "}
            <span className="text-brand-600">guesswork</span>
          </div>
        </div>

        <div className="w-full max-w-md">
          <Card className="border-ink-100 shadow-glass">
            <CardHeader className="text-center">
              <CardTitle>Create your account</CardTitle>
              <p className="text-sm text-ink-500">Start managing your brand analytics in minutes.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4" onSubmit={handleSignup}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password (min 6 characters)"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                {error ? <p className="text-xs text-red-500">{error}</p> : null}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>
              <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={loading}>
                Sign up with Google
              </Button>
              <p className="text-xs text-ink-500">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-brand-600">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
