import Image from "next/image";

const LoadingIndicator = () => {
  return (
    <Image
      src="/icons/loading.png"
      width={20}
      height={20}
      alt="loading icon"
      className="animate-spin"
    />
  );
};

export default LoadingIndicator;
