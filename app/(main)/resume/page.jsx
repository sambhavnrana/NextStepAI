import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6 animate-fade-in-up duration-1000">
      <div className="animate-fade-in-up duration-1000">
        <ResumeBuilder initialContent={resume?.content} />
      </div>
    </div>
  );
}
