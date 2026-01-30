"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });
      if (!response.ok) {
        throw new Error("Unable to create session");
      }
      const next = searchParams?.get("next") ?? "/";
      router.push(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
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
      const next = searchParams?.get("next") ?? "/";
      router.push(next);
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
              <CardTitle>Welcome Back</CardTitle>
              <p className="text-sm text-ink-500">Sign in to access your dashboard</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4" onSubmit={handleLogin}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                {error ? <p className="text-xs text-red-500">{error}</p> : null}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              <div className="flex items-center gap-3 text-xs text-ink-400">
                <div className="h-px flex-1 bg-ink-100" />
                OR CONTINUE WITH
                <div className="h-px flex-1 bg-ink-100" />
              </div>
              <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={loading}>
                Sign in with Google
              </Button>
              <p className="text-xs text-ink-500">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold text-brand-600">
                  Sign Up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#d7e1fb]" />}>
      <LoginContent />
    </Suspense>
  );
}
