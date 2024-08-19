import { fetchProducts } from "@/actions/server";
import { ImageCarousel } from "@/components/carousel/hero-carousel";
import Catalog from "@/features/catalog/catalog";
import { Product } from "@/types/products";
import Image from "next/image";

export default async function Home() {
  const { products, paginationMetaData } = await fetchProducts();

  const featuredProducts = products?.filter(
    (product: Product) => product.isFeatured
  );

  return (
    <>
      <section className="w-full flex justify-center">
        <ImageCarousel />
      </section>
      <section>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 border-t-none shadow-lg">
          <div className=" flex flex-col items-center justify-center space-y-4 text-2xl p-10">
            <p>
              We sell <span className="text-blue-600">NEW</span> and{" "}
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
          <div>
            <Catalog
              products={featuredProducts}
              metaData={paginationMetaData}
              hidden={true}
            />
          </div>
        </div>
      </section>
    </>
  );
}
