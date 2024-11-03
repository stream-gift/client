import { APIService } from "@/lib/api/server";
import { redirect } from "next/navigation";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { Bento } from "./components/Bento";
import WordRotate from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Particles from "@/components/magicui/particles";
import { TbBrandTwitter, TbBrandX } from "react-icons/tb";
import FlickeringGrid from "@/components/ui/flickering-grid";

export default async function Home() {
  const user = await APIService.Auth.getUser();
  const streamer = user ? await APIService.Streamer.getStreamer(user.id) : null;

  if (streamer) {
    return redirect(`/home`);
  }

  if (user) {
    return redirect(`/onboard`);
  }

  
  return (
    <main className="min-h-screen relative">
      <div className="absolute w-full h-full bg-primary -z-20 bg-gradient-to-b from-background via-background/75 to-black"></div>

      <header>
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 py-12 bg-gradient-to-b from-background to-background/0">
            <img src="/images/logo.svg" className="size-8" alt="Logo" />
            <h1 className="text-xl font-normal">stream.gift</h1>
          </div>

          <div className="mt-3 text-center w-full flex flex-col items-center justify-center">
            <div className="text-5xl lg:text-7xl font-medium leading-tight max-w-[700px]">
              Receive{" "}
              <span className="text-primary font-semibold brightness-110">
                <WordRotate
                  words={[
                    <span key="crypto">crypto</span>,
                    <span key="sui">SUI</span>,
                  ]}
                />
              </span>{" "}
              donations on stream
            </div>

            <div className="mt-6 lg:mt-8">
              <p className="text-lg font-normal text-white/90 max-w-[500px] px-4">
                Receive donations from anyone, anywhere via crypto. Withdraw to
                your wallet.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="rounded-2xl border-primary/60 border-2 p-1 bg-primary/20">
                <Link href="/login">
                  <Button size="lg" className="text-lg font-medium h-10">
                    Get Started
                  </Button>
                </Link>
              </div>

              <div className="rounded-2xl border-primary/60 border-2 p-1 w-fit">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="text-lg font-medium h-10 bg-primary/20 hover:bg-primary/30 text-white"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-20 max-w-[85vw] lg:max-w-5xl mx-auto">
            <Bento />
          </div>

          <div
            className="mt-12 max-w-[85vw] lg:max-w-5xl mx-auto bg-gradient-to-br from-primary to-primary/80 shadow-inner
          rounded-2xl h-fit px-8 lg:px-12 pt-12 pb-16 flex flex-col items-start justify-center relative overflow-hidden"
          >
            <div className="text-3xl font-medium">
              Ready to start receiving crypto donations?
            </div>

            <div className="text-lg text-white/70 mt-1">
              Sign up now to start receiving crypto donations on your stream.
            </div>

            <Link href="/login">
              <Button className="mt-4" size="lg" variant="light">
                Get Started
              </Button>
            </Link>

            <div className="absolute h-[220px] w-[220px] -bottom-16 -right-16">
              <FlickeringGrid
                className="z-0 absolute inset-0 [mask:radial-gradient(circle_at_center,#fff_90px,transparent_0)]"
                squareSize={4}
                gridGap={6}
                color="#ffffff"
                maxOpacity={0.5}
                flickerChance={0.1}
                height={220}
                width={220}
              />
            </div>
          </div>

          <div className="mt-8 max-w-[85vw] lg:max-w-5xl mx-auto pb-8">
            <div className="h-[2px] bg-white/10 w-full rounded-full"></div>

            <div className="mt-4 flex items-center justify-between text-white/70">
              <div className="text-sm">
                &copy; {new Date().getFullYear()} stream.gift
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="https://twitter.com/streamgift_"
                  passHref
                  target="_blank"
                >
                  <div className="hover:text-white transition-all">
                    <TbBrandX />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(800px_circle_at_center,rgba(255,255,255,0.85),rgba(255,255,255,0.7),rgba(255,255,255,0.55),transparent,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[120%]",
              "-z-10",
            )}
          />

          <Particles
            className="absolute inset-0 -z-10 max-h-screen"
            quantity={100}
            ease={80}
            staticity={100}
            color={"#e3b3ff"}
            refresh
          />
        </div>
      </header>
    </main>
  );
}
