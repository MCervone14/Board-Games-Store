import { Skeleton } from "@/components/ui/skeleton";

const LoginLoadingPage = () => {
  return (
    <div>
      <Skeleton className="w-1/3 mx-auto my-10 h-[680px] bg-gray-200" />
    </div>
  );
};

export default LoginLoadingPage;
