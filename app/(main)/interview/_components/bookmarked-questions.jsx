import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";

export default function BookmarkedQuestions({ assessments }) {
  const bookmarks = assessments
    .filter((a) => a.bookmarkedQuestions && a.bookmarkedQuestions.length > 0)
    .map((a) => ({
      assessmentId: a.id,
      date: a.createdAt,
      score: a.quizScore,
      questions: a.bookmarkedQuestions,
      allQuestions: a.questions,
    }));

  if (bookmarks.length === 0) {
    return (
      <Card className="my-6">
        <CardHeader>
          <CardTitle>No Bookmarked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You haven't bookmarked any questions yet. Bookmark tough questions
            after a quiz to review them here!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 my-6">
      {bookmarks.map((b, i) => (
        <Card key={b.assessmentId}>
          <CardHeader>
            <CardTitle>
              Quiz on {format(new Date(b.date), "MMMM dd, yyyy hh:mm a")}{" "}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {b.questions.map((q, idx) => {
              const fullQ =
                b.allQuestions.find((qq) => qq.question === q.question) || q;
              return (
                <div
                  key={idx}
                  className="border rounded-lg p-4 space-y-2 bg-muted/50"
                >
                  <div className="font-medium">{q.question}</div>
                  {fullQ.explanation && (
                    <div className="text-sm text-muted-foreground">
                      Explanation: {fullQ.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
