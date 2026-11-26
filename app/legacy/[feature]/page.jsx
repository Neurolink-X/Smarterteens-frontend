import Link from "next/link";
import {notFound} from "next/navigation";
const features = {
  mentor: ["Mentor dashboard", "Mentor accounts, course publishing and student submissions are being rebuilt."],
  admin: ["Admin dashboard", "Platform administration is not yet available in the new application."],
  parent: ["Parent view", "Verified guardian access and student progress sharing are being rebuilt."],
  auth: ["Account access", "Legacy account sign-in is not available here. The free courses work without an account."]
};
export default async function LegacyFeature({params}){
  const {feature}=await params;
  if(!Object.hasOwn(features,feature))notFound();
  const [title,description]=features[feature];
  return <section className="section"><p className="eyebrow">PLATFORM TRANSITION</p><h1>{title}</h1><p>{description}</p><p>Do not enter account credentials or personal information on unofficial pages.</p><Link href="/courses">Explore free courses</Link><p><Link href="/">Return home</Link></p></section>;
}
