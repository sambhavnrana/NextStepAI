import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4 text-center gap-y-4 -mt-24">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-red-500 via-red-600 to-pink-700 text-transparent bg-clip-text drop-shadow-lg pb-5">
                404             </h1>


            <h2 className="text-xl lg:text-2xl font-semibold text-gray-300 flex items-center gap-2">
                Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                <span className="hidden md:inline md:text-3xl lg:text-5xl">🤖</span>

            </h2>

            <p className="text-base md:text-lg text-gray-400 italic">
                Possible causes: <br />
                - Misspelled URL<br />
                - You clicked a broken link<br />

            </p>

            <Link href="/">
                <Button className="text-base md:text-lg px- mt-6 lg:mt-12 py-3 font-mono md:px-16 md:py-5 animate-pulse">
                    🏠 Back to Homepage
                </Button>
            </Link>
        </div>
    );
}

