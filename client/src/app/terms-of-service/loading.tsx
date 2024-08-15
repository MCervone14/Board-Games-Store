import { Skeleton } from "@/components/ui/skeleton";

const TermsofServiceLoadingPage = () => {
  return (
    <div className="max-w-5xl mx-auto my-10">
      <h1 className="text-3xl">Tabletop Zealot - Terms of Service</h1>
      <small>Last updated: June 11th, 2024</small>
      <div className="space-y-5 my-5">
        <Skeleton className="h-48 bg-gray-200" />
      </div>
      <div className="space-y-5 mt-5">
        <h2 className="text-xl text-blue-600">
          Changes to This Privacy Policy
        </h2>
        <Skeleton className="h-12 bg-gray-200" />
        <h2 className="text-xl text-blue-600">
          What Personal Information We Collect
        </h2>
        <Skeleton className="h-24 bg-gray-200" />
        <h3 className="text-xl text-blue-600">
          Section 1: Information We Collect Directly from You
        </h3>
        <Skeleton className="h-48 bg-gray-200" />
        <h3 className="text-xl text-blue-600">
          Section 2: Information We Collect through Cookies
        </h3>
        <Skeleton className="h-48 bg-gray-200" />
        <h3 className="text-xl text-blue-600">
          Section 4: How We Use Your Personal Information
        </h3>
        <Skeleton className="h-48 bg-gray-200" />
        <h3 className="text-xl text-blue-600">
          How We Disclose Personal Information
        </h3>
        <Skeleton className="h-48 bg-gray-200" />
      </div>
      <div className="space-y-5 mt-5">
        <h2 className="text-xl text-blue-600">
          Third Party Websites and Links
        </h2>
        <Skeleton className="h-48 bg-gray-200" />
        <h2 className="text-xl text-blue-600">Children's Data</h2>
        <Skeleton className="h-48 bg-gray-200" />
        <h2 className="text-xl text-blue-600">
          Security and Retention of Your Information
        </h2>
        <Skeleton className="h-48 bg-gray-200" />
        <h2 className="text-xl text-blue-600">Your Rights and Choices</h2>
        <Skeleton className="h-48 bg-gray-200" />
      </div>
    </div>
  );
};

export default TermsofServiceLoadingPage;
