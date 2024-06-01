import Link from "next/link";
import Image from "next/image";
import { fetchProducts } from "@/actions/server";
import Catalog from "@/features/catalog/catalog";

export default async function Home() {
  const { products, paginationMetaData } = await fetchProducts(
    "name",
    "",
    1,
    12,
    []
  );

  return (
    <>
      <section className="w-full">
        <Image
          alt="Promotional Board Game Image found on FreePik.com"
          className="mx-auto max-h-[500px] w-full object-cover"
          height="500"
          src="/images/promotionals/boardgame-with-dice-banner.jpg"
          width="1270"
        />
      </section>
      <section className="w-full">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 py-6 border shadow-lg">
          <div className=" flex flex-col items-center justify-center space-y-4 text-2xl">
            <p>
              We sell <span className="text-blue-600">NEW </span> and{" "}
              <span className="text-blue-600">USED</span> board games!
            </p>
            <p>Look for the open-box icon in the top-right corner.</p>
          </div>
          <Image
            alt="Next icons created by Roundicons - Flaticon"
            src="/icons/right-arrow.png"
            width={64}
            height={64}
            className="transform rotate-90 lg:rotate-0"
          />
          <Image
            alt="Open box icons created by Freepik - Flaticon"
            src="/icons/open-box.png"
            width={128}
            height={128}
          />
        </div>
      </section>
      <section className="w-full py-8 md:py-16 lg:py-24">
        <div className="container space-y-8 px-4 md:px-6">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Featured Products
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Check out the featured list of board games.
              </p>
            </div>
          </div>
          <div className="">
            <Catalog products={products} metaData={paginationMetaData} />
          </div>
        </div>
      </section>
    </>
  );
}
