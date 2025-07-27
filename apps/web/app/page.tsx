"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import {
  Code,
  Feather,
  MessageSquare,
  Share2,
  Users,
  Mail,
} from "lucide-react";
import { RxArrowTopRight } from "react-icons/rx";
import { TbBeta } from "react-icons/tb";
import { BsTwitterX } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import { FaCode } from "react-icons/fa6";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    console.log("NEXT_PUBLIC_HTTP_URL", process.env.NEXT_PUBLIC_HTTP_URL);
    console.log("NEXT_PUBLIC_WS_URL", process.env.NEXT_PUBLIC_WS_URL);
  }, []);

  return (
    <div className="w-full min-h-screen h-fit overflow-x-clip bg-neutral-950 text-white [&::-webkit-scrollbar]:hidden font-nunito-variable">
      <section
        id="hero"
        className="relative w-full h-screen flex flex-col justify-center items-center text-center px-4"
      >
        <h1 className="text-white/90 text-4xl font-bold font-pencerio absolute top-4 left-4">
          meetdraw
        </h1>
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-green-500/80 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold font-cabinet-grotesk bg-clip-text tracking-tight text-transparent bg-gradient-to-b from-neutral-50 to-neutral-700 py-1">
            Draw Together, <br className="block lg:hidden" /> Create Together
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300/90 max-w-2xl">
            The collaborative whiteboard that brings your ideas to life.{" "}
            <br className="hidden md:block" />
            Draw, chat, and brainstorm in real-time with your team.
          </p>
          <div className="mt-8 flex flex-col items-center sm:flex-row gap-4">
            <Link href="/demo">
              <Button
                size="lg"
                className="w-full sm:w-auto cursor-pointer bg-neutral-400/20 backdrop-blur-[1px] border text-neutral-300 border-neutral-300/20 hover:bg-neutral-400/30 hover:border-neutral-300/30"
              >
                Try the Demo <RxArrowTopRight />
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto cursor-pointer py-[20px] bg-black/20 backdrop-blur-[1.5px] border text-neutral-300 border-neutral-300/20 hover:bg-black/30 hover:border-neutral-300/30"
              >
                Create an account
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-neutral-400">
            No signup required for the demo
          </p>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 ">
            Everything you need to collaborate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Feather size={24} />,
                title: "Real-time Drawing",
                desc: "Collaborative canvas with live feedback.",
              },
              {
                icon: <MessageSquare size={24} />,
                title: "Instant Chat",
                desc: "Built-in messaging while you work.",
              },
              {
                icon: <Share2 size={24} />,
                title: "Share & Join",
                desc: "One-click room sharing with anyone.",
              },
              {
                icon: <Users size={24} />,
                title: "Any Browser",
                desc: "Works seamlessly on chrome, safari, edge.",
              },
              {
                icon: <Code size={24} />,
                title: "Lightning Fast",
                desc: "No lag, instant synchronization.",
              },
              {
                icon: <TbBeta size={24} />,
                title: "Coming Soon",
                desc: "Voice & video calls.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg"
              >
                <div className="text-green-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 font-cabinet-grotesk tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-neutral-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="how-it-works"
        className="py-16 md:py-24 px-4 overflow-clip relative"
      >
        <div className="mx-auto text-center bg-white/5 p-8 rounded-xl backdrop-blur-[2px] border border-neutral-500/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="absolute top-[90px] left-0 w-full h-px bg-white/10 -translate-y-1/2 hidden md:block"></div>
            <div className="flex flex-col items-center p-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-2xl font-bold mb-4 z-10">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create or Join</h3>
              <p className="text-neutral-400">
                Start a new board or enter a room code.
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-2xl font-bold mb-4 z-10">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Draw & Chat</h3>
              <p className="text-neutral-400">
                Collaborate with real-time tools and messaging.
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-2xl font-bold mb-4 z-10">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Share Ideas</h3>
              <p className="text-neutral-400">
                Save and continue your session later.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perfect For...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-lg">
              <h3 className="text-2xl font-bold mb-4">Remote Teams</h3>
              <p className="text-neutral-400">
                Daily standups, sprint planning, and brainstorming sessions that
                feel like you're in the same room.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-lg">
              <h3 className="text-2xl font-bold mb-4">Education</h3>
              <p className="text-neutral-400">
                Interactive lessons, student collaboration, and visual learning
                that engages the entire classroom.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-lg">
              <h3 className="text-2xl font-bold mb-4">Creative Work</h3>
              <p className="text-neutral-400">
                Design reviews, wireframing, and creative workshops where ideas
                can flow freely and visually.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="footer" className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-around items-center mb-[200px] md:mb-[300px]">
            <div className="hover:scale-110 transition-all duration-300">
              <a
                href="https://x.com/I_Break_Prod"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <BsTwitterX className="w-6 h-6 md:w-7 md:h-7" />
              </a>
            </div>
            <div className="hover:scale-110 transition-all duration-300">
              <a
                href="https://www.linkedin.com/in/harshit-breaks-prod/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <FiLinkedin className="w-6 h-6 md:w-7 md:h-7" />
              </a>
            </div>
            <div className="hover:scale-110 transition-all duration-300">
              <a
                href="mailto:g1harshit7@gmail.com"
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <Mail className="w-6 h-6 md:w-7 md:h-7" />
              </a>
            </div>
            <div className="hover:scale-110 transition-all duration-300">
              <a
                href="https://github.com/HarshitBreaksProd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <FiGithub className="w-6 h-6 md:w-7 md:h-7" />
              </a>
            </div>
            <div className="hover:scale-110 transition-all duration-300">
              <a
                href="https://github.com/HarshitBreaksProd/meetdraw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <FaCode className="w-6 h-6 md:w-7 md:h-7" />
              </a>
            </div>
          </div>
          <div className="flex w-full items-center justify-center cursor-default">
            <div className="text-6xl sm:text-8xl md:text-9xl lg:text-[150px] xl:text-[200px] font-pencerio font-bold bg-clip-text text-transparent bg-gradient-to-b from-green-500/45 to-green-900/45 px-4 md:px-10 leading-none">
              meetdraw
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
