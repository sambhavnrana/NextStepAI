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
    <main>
      <h1 className="text-3xl font-bold mb-6 gradient-title text-center">
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
