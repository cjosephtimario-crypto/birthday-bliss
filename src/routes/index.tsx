import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CalendarHeart, Timer, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { TulipBorder, TulipCorner, Tulip } from "@/components/Tulips";
import { Button } from "@/components/ui/button";
import tulipsArt from "@/assets/tulips.png";
import maidArt from "@/assets/maid.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tulip Birthdays — Cute Birthday Countdown & Reminders" },
      {
        name: "description",
        content:
          "Set your birthday once and get a live countdown plus gentle 6:00 AM daily reminders. Cute tulip design, private and secure.",
      },
      { property: "og:title", content: "Tulip Birthdays — Cute Birthday Countdown & Reminders" },
      {
        property: "og:description",
        content: "Live countdown, 6 AM daily reminders and a friendly maid assistant to guide you.",
      },
    ],
  }),
  component: Home,
});

const steps = [
  {
    icon: CalendarHeart,
    title: "1. Create your account",
    text: "Sign up with your first name, last name, birthday and a password. Your details are encrypted and only visible to you.",
  },
  {
    icon: Timer,
    title: "2. Watch your countdown",
    text: "Your dashboard shows days, hours, minutes and seconds until your next birthday — updating live every second.",
  },
  {
    icon: Bell,
    title: "3. Turn on 6:00 AM reminders",
    text: "Tap the reminder button and allow notifications. Every morning at 6:00 AM your local time you'll see how many days are left.",
  },
  {
    icon: Sparkles,
    title: "4. Celebrate the big day",
    text: "On your birthday the dashboard bursts into confetti with a cheerful chime, and your maid assistant sings your name.",
  },
];

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-4 pt-12 pb-6">
          <TulipCorner className="left-2 top-24 hidden md:block" />
          <TulipCorner className="right-4 top-40 hidden md:block" />
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-accent-foreground">
                <Sparkles className="h-3.5 w-3.5" /> Cute · Secure · Thoughtful
              </span>
              <h1 className="mt-5 font-display text-4xl leading-tight font-extrabold sm:text-5xl">
                Never forget a <span className="text-gradient">special birthday</span> again
              </h1>
              <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
                Tulip Birthdays keeps a live countdown to your big day, wakes you with a gentle 6:00 AM
                reminder, and cheers you on with a sweet maid assistant surrounded by tulips.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full gradient-dream shadow-glow">
                  <Link to="/auth">Get started free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/about">Our story</Link>
                </Button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Protected by encrypted accounts and row-level security.
              </p>
            </div>

            <div className="relative">
              <div className="card-cute relative overflow-hidden p-6">
                <img
                  src={tulipsArt}
                  alt="Pastel blue and purple tulip bouquet illustration"
                  width={1024}
                  height={768}
                  className="mx-auto w-full max-w-sm animate-float"
                />
              </div>
              <img
                src={maidArt}
                alt="Cute maid assistant holding a purple tulip"
                loading="lazy"
                width={768}
                height={1024}
                className="pointer-events-none absolute -bottom-6 -right-2 w-28 drop-shadow-xl sm:w-36"
              />
            </div>
          </div>
        </section>

        <TulipBorder className="mt-2" />

        <section className="px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-display text-3xl font-bold">How it works</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              Four gentle steps — read them before you sign up, so you know exactly what to expect.
            </p>

            <ol className="mt-10 grid gap-5 sm:grid-cols-2">
              {steps.map(({ icon: Icon, title, text }) => (
                <li key={title} className="card-cute relative p-6 transition-transform hover:-translate-y-1">
                  <Tulip
                    className="absolute -top-4 right-5 h-10 w-7 opacity-70"
                    bloom="var(--tulip-blue)"
                    stem="var(--tulip-stem)"
                  />
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-dream text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>

            <div className="card-cute mt-10 flex flex-col items-center gap-4 p-8 text-center">
              <h3 className="font-display text-2xl font-bold">Ready for your countdown?</h3>
              <p className="max-w-xl text-sm text-muted-foreground">
                It takes less than a minute. Your birthday, your data, your celebration.
              </p>
              <Button asChild size="lg" className="rounded-full gradient-dream shadow-soft">
                <Link to="/auth">Create my account</Link>
              </Button>
            </div>
          </div>
        </section>

        <TulipBorder className="pb-8" />
      </main>
    </div>
  );
}
