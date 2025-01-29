"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  const router = useRouter();

  const totalQuestions = result.questions.length;
  const correctAnswers = result.questions.filter((q) => q.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;

  return (
    <div className="mx-auto w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl">
      <h1 className="flex items-center gap-2 text-3xl gradient-text">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold  gradient-title">
            {result.quizScore.toFixed(1)}%
          </h3>
          <Progress value={result.quizScore} className="w-full" />
        </div>

        {/* More Stats */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-base sm:text-lg font-medium py-2">
          <div className="block md:hidden">Questions: {totalQuestions}</div>
          <div className="hidden md:block">
            Total Questions: {totalQuestions}
          </div>

          <div>
            Correct: <span className="text-green-600">{correctAnswers}</span>
          </div>
          <div>
            Incorrect: <span className="text-red-600">{incorrectAnswers}</span>
          </div>
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Improvement Tip:</p>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="font-medium">Question Review</h3>
          {result.questions.map((q, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>
                <div className="flex items-center gap-2">
                  {q.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  )}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>
              <div className="text-sm bg-muted p-2 rounded">
                <p className="font-medium">Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter className="flex flex-col sm:flex-row gap-8 mt-2 lg:mt-5">
          <Button
            onClick={() => router.push("/interview")}
            variant="secondary"
            className="text-lg flex-1 mt-5 sm:mt-0 hover:scale-105 border-1 border-white gradient-text cursor-pointer"
          >
            Back to Dashboard
          </Button>
          {!hideStartNew && (
            <Button
              onClick={onStartNew}
              className="text-lg flex-1 hover:animate-none hover:scale-105"
            >
              Start New Quiz
            </Button>
          )}
        </CardFooter>
      )}
    </div>
  );
}
