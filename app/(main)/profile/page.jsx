import { industries } from "@/data/industries";
import { checkUser } from "@/lib/checkUser";
import OnboardingForm from "../onboarding/_components/onboarding-form";

export default async function EditProfilePage() {
  const user = await checkUser();

  let industry = "";
  let subIndustry = "";
  if (user?.industry) {
    const [ind, ...sub] = user.industry.split("-");
    industry = ind;
    subIndustry = sub.join("-");
  }

  let skills = Array.isArray(user?.skills)
    ? user.skills.join(", ")
    : user?.skills || "";

  const initialValues = {
    industry,
    subIndustry,
    experience: user?.experience?.toString() || "",
    skills,
    bio: user?.bio || "",
  };

  return (
    <main className="animate-fade-in-up  px-5">
      <h1 className="animate-fade-in-down text-4xl lg:text-6xl font-bold gradient-title">
        Edit Profile
      </h1>
      <OnboardingForm
        industries={industries}
        initialValues={initialValues}
        mode="profile"
      />
    </main>
  );
}
