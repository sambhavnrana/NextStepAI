import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="animate-fade-in duration-1000">
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5">
        <h1 className="animate-fade-in-down text-4xl lg:text-6xl font-bold gradient-title">
          My Cover Letters
        </h1>
        <Link href="/ai-cover-letter/new">
          <div className="animate-fade-in-down relative inline-block shining-border hover:scale-105 transition-transform">
            <Button className="cursor-pointer duration-700 delay-200 relative z-10">
              <span className="sm:text-xl text-2xl">+ </span> Create New
            </Button>
          </div>
        </Link>
      </div>

      <div className="animate-fade-in-up duration-1000">
        <CoverLetterList coverLetters={coverLetters} />
      </div>
    </div>
  );
}
