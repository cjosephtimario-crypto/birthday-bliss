import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { TulipBorder, Tulip } from "@/components/Tulips";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { playError, playSuccess } from "@/lib/sound";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Login or Sign Up — Tulip Birthdays" },
      {
        name: "description",
        content:
          "Create your secure Tulip Birthdays account with your name and birthday, or sign in to see your live countdown.",
      },
      { property: "og:title", content: "Login or Sign Up — Tulip Birthdays" },
      {
        property: "og:description",
        content: "Secure, encrypted accounts for your birthday countdown and daily reminders.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !birthday) {
      playError();
      toast.error("Please fill in your name and birthday.");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          birthday,
        },
      },
    });
    setLoading(false);

    if (error) {
      playError();
      toast.error(error.message);
      return;
    }
    playSuccess();
    if (data.session) {
      navigate({ to: "/dashboard", replace: true });
    } else {
      toast.success("Almost there! Check your email to confirm your account.");
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);
    if (error) {
      playError();
      toast.error(error.message);
      return;
    }
    playSuccess();
    navigate({ to: "/dashboard", replace: true });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="px-4 py-10">
        <div className="mx-auto max-w-md">
          <div className="text-center">
            <Tulip className="mx-auto h-14 w-10 animate-sway" bloom="var(--tulip-purple)" stem="var(--tulip-stem)" />
            <h1 className="mt-3 font-display text-3xl font-extrabold">Welcome to your countdown</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in, or create an account in under a minute.
            </p>
          </div>

          <div className="card-cute mt-6 p-6">
            <Tabs defaultValue="signup">
              <TabsList className="grid w-full grid-cols-2 rounded-full">
                <TabsTrigger value="signup" className="rounded-full">
                  Sign Up
                </TabsTrigger>
                <TabsTrigger value="login" className="rounded-full">
                  Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signup">
                <form className="mt-5 space-y-4" onSubmit={handleSignUp}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Luna"
                        autoComplete="given-name"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Santos"
                        autoComplete="family-name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="birthday">Birthday</Label>
                    <Input
                      id="birthday"
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      max={new Date().toISOString().slice(0, 10)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      minLength={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full gradient-dream shadow-soft"
                  >
                    {loading ? "Planting your tulip…" : "Create my account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="login">
                <form className="mt-5 space-y-4" onSubmit={handleLogin}>
                  <div className="space-y-1.5">
                    <Label htmlFor="loginEmail">Email</Label>
                    <Input
                      id="loginEmail"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="loginPassword">Password</Label>
                    <Input
                      id="loginPassword"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full gradient-dream shadow-soft"
                  >
                    {loading ? "Signing you in…" : "Login"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-2 rounded-2xl bg-muted/60 p-4 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Passwords are hashed and never stored in
                plain text.
              </p>
              <p className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" /> Row-level security means only you can read your
                birthday details.
              </p>
            </div>
          </div>
        </div>
      </main>

      <TulipBorder className="pb-8" />
    </div>
  );
}
