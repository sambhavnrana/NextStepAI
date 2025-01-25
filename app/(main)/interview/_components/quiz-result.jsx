"use client";

import { Trophy, CheckCircle2, XCircle, Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { updateBookmarkedQuestions } from "@/actions/interview";
import { toast } from "sonner";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  const [bookmarked, setBookmarked] = useState(
    result.bookmarkedQuestions || []
  );
  const [loading, setLoading] = useState(false);

  const isBookmarked = (q) => bookmarked.some((b) => b.question === q.question);

  const handleBookmark = async (q) => {
    setLoading(true);
    let updated;
    if (isBookmarked(q)) {
      updated = bookmarked.filter((b) => b.question !== q.question);
    } else {
      updated = [...bookmarked, { question: q.question }];
    }
    setBookmarked(updated);
    try {
      await updateBookmarkedQuestions(result.id, updated);
      toast.success(
        isBookmarked(q) ? "Removed bookmark" : "Bookmarked for review"
      );
    } catch (e) {
      toast.error("Failed to update bookmarks");
      setBookmarked(bookmarked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <h1 className="flex items-center gap-2 text-3xl gradient-title">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{result.quizScore.toFixed(1)}%</h3>
          <Progress value={result.quizScore} className="w-full" />
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
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={
                      isBookmarked(q) ? "Remove bookmark" : "Bookmark"
                    }
                    onClick={() => handleBookmark(q)}
                    disabled={loading}
                  >
                    {isBookmarked(q) ? (
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-400" />
                    ) : (
                      <StarOff className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
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
        <CardFooter>
          <Button
            onClick={onStartNew}
            className="animate-bounce hover:animate-none hover:scale-105 w-full"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
