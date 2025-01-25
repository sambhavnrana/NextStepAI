import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performace-chart";
import QuizList from "./_components/quiz-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookmarkedQuestionsClient from "./_components/bookmarked-questions-client";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();
  return (
    <div className="animate-fade-in duration-100">
      <div className="animate-fade-in-down flex items-center justify-between mb-5">
        <h1 className="text-4xl lg:text-6xl font-bold gradient-title">
          Interview Preparation
        </h1>
        <Link href="/interview/mock" className="hidden md:block">
          <div className="relative inline-block shining-border hover:scale-105 transition-transform">
            <Button className="cursor-pointer duration-700 relative z-10">
              <span className="sm:text-xl text-2xl">+ </span> Take Quiz
            </Button>
          </div>
        </Link>
      </div>
      <BookmarkedQuestionsClient assessments={assessments}>
        <div className="space-y-6 animate-fade-in-up duration-1000">
          <StatsCards assessments={assessments} />
          <PerformanceChart assessments={assessments} />
          <QuizList assessments={assessments} />
        </div>
      </BookmarkedQuestionsClient>
    </div>
  );
}
