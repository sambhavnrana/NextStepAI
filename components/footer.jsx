import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full border-t bg-background/80 backdrop-blur-xl z-50 supports-[backdrop-filter]:bg-background/60 px-3 sm:px-4 md:px-6 md:py-1 text-center text-base sm:text-sm md:text-base shadow mt-2 py-1">
      &copy;{new Date().getFullYear()}
      {"  "}
      <Link
        href="https://www.github.com/sambhavnrana/NextStepAI"
        target="_blank"
        rel="noopener noreferrer"
        className="gradient-title sm:font-medium lg:font-bold sm:text-base lg:text-xl"
      >
        {" "}
        NextStepAI<span className="sm:text-sm text-slate-200"> .</span>
      </Link>
      <span className=" sm:inline md:hidden">Made by </span>
      <span className=" hidden md:inline">Developed by </span>
      <Link
        href="https://www.sambhavrana.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="gradient-title sm:font-medium lg:font-bold sm:text-base lg:text-xl"
      >
        Sambhav Rana
      </Link>
    </footer>
  );
};

export default Footer;
