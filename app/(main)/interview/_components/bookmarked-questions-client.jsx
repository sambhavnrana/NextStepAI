"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import BookmarkedQuestions from "./bookmarked-questions";

export default function BookmarkedQuestionsClient({ assessments, children }) {
  const [showBookmarks, setShowBookmarks] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          className="cursor-pointer"
          variant={showBookmarks ? "default" : "outline"}
          onClick={() => setShowBookmarks((v) => !v)}
        >
          {showBookmarks ? "Back to Dashboard" : "Bookmarked Questions"}
        </Button>
      </div>
      {showBookmarks ? (
        <BookmarkedQuestions assessments={assessments} />
      ) : (
        children
      )}
    </div>
  );
}
