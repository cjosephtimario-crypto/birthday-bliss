import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Lock, Users, Clock } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { TulipBorder, Tulip } from "@/components/Tulips";
import { Button } from "@/components/ui/button";
import tulipsArt from "@/assets/tulips.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Tulip Birthdays" },
      {
        name: "description",
        content:
          "Our mission: help people never miss or forget a special birthday moment, with a warm, private and beautifully simple reminder app.",
      },
      { property: "og:title", content: "About Us — Tulip Birthdays" },
      {
        property: "og:description",
        content: "Why we built a birthday reminder that feels like a handwritten note, not a calendar alert.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    icon: Heart,
    title: "Moments over notifications",
    text: "A birthday is a once-a-year chance to make someone feel seen. We design every screen to protect that feeling.",
  },
  {
    icon: Clock,
    title: "Gentle, on time",
    text: "One calm reminder at 6:00 AM your local time — early enough to plan, quiet enough to never nag.",
  },
  {
    icon: Lock,
    title: "Private by default",
    text: "Accounts are encrypted and row-level security means your birthday data is readable only by you. Never sold, never shared.",
  },
  {
    icon: Users,
    title: "Made for everyone",
    text: "Readable type, generous spacing and a responsive layout, so it feels lovely on a phone at breakfast or a laptop at work.",
  },
];

function About() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="px-4 py-12">
        <section className="mx-auto max-w-4xl text-center">
          <Tulip className="mx-auto h-16 w-11 animate-sway" bloom="var(--tulip-purple)" stem="var(--tulip-stem)" />
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
            We exist so no one feels <span className="text-gradient">forgotten</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Tulip Birthdays began with a missed call and a late "happy birthday" text. We wanted something
            softer than a calendar: a little companion that counts down with you, remembers on your behalf,
            and makes the day itself feel like confetti.
          </p>
        </section>

        <TulipBorder className="my-10" />

        <section className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title} className="card-cute p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-petal text-petal-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-xl font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-12 grid max-w-5xl items-center gap-8 md:grid-cols-2">
          <div className="card-cute p-6">
            <img
              src={tulipsArt}
              alt="Illustrated bouquet of pastel blue and purple tulips"
              loading="lazy"
              width={1024}
              height={768}
              className="mx-auto w-full max-w-xs"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold">Why tulips?</h2>
            <p className="mt-3 text-muted-foreground">
              Tulips return faithfully every single year, right on schedule — exactly what a good reminder
              should do. Blue for calm, purple for celebration, and a bloom for every person worth
              remembering.
            </p>
            <Button asChild size="lg" className="mt-6 rounded-full gradient-dream shadow-soft">
              <Link to="/auth">Start your countdown</Link>
            </Button>
          </div>
        </section>
      </main>

      <TulipBorder className="pb-8" />
    </div>
  );
}
