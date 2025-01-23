"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl xl:text-9xl gradient-title">
            Your Personal <span className="gradient-text">AI Coach</span> <br />
            for Career Advancement
          </h1>
          <p className="mx-auto lg:max-w-[1000px] sm:max-w-[600px] text-muted-foreground md:text-2xl sm:text-xl">
            Get personalized guidance, master interviews, and leverage
            AI-powered tools to achieve your career aspirations.
          </p>
        </div>

        <div className="flex justify-center space-x-4 mt-12">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="
    px-4 py-3 text-base
    sm:px-6 sm:py-4 md:text-lg
    md:px-8 md:py-6 lg:text-xl
    animate-glow bg-gray-200 hover:scale-110 mr-4 md:mr-12 cursor-pointer
  "
            >
              {" "}
              Get Started
            </Button>
          </Link>
          <Link
            href="https://www.github.com/sambhavnrana/NextStepAI"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="px-6 py-3 text-base border border-white text-white ml-2 
              sm:px-8 sm:py-4 sm:text-lg 
              md:px-12 md:py-6 md:text-xl md:ml-8 hover:scale-110 cursor-pointer"
              variant="outline"
            >
              Github
            </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src={"/banner.jpeg"}
              alt="NextStepAI Banner"
              width={1280}
              height={720}
              className="rounded-lg shadow-2xl border-2xl mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
