import { getIndustryInsights } from "@/actions/dashboard";
import { redirect } from "next/navigation";
import DashboardView from "./_components/dashboard-view";
import { checkUser } from "@/lib/checkUser";

const IndustryInsightsPage = async () => {
  const user = await checkUser();
  if (!user || !user.industry) {
    redirect("/onboarding");
  }
  const insights = await getIndustryInsights();
  return (
    <div className="animate-fade-in-down duration-1000">
      <div className="animate-fade-in-up duration-1000">
        <DashboardView insights={insights} />
      </div>
    </div>
  );
};

export default IndustryInsightsPage;
