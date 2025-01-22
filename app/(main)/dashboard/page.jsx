import { getIndustryInsights } from "@/actions/dashboard";
import { redirect } from "next/navigation";
import DashboardView from "./_components/dashboard-view";
import { checkUser } from "@/lib/checkUser";

const IndustryInsightsPage = async () => {
    const user = await checkUser();
    if (!user.industry) {
        redirect('/onboarding');
    }
    const insights = await getIndustryInsights();
    return (
        <div>
            <DashboardView insights={insights} />
        </div>
    );
}

export default IndustryInsightsPage;