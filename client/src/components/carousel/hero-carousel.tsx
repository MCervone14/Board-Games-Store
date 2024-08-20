"use client";

import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const carouselItems = [
  {
    href: "DSK_sma_key_1640x680_en.webp",
    alt: "Promotional Board Game Image for Duskmourn",
    width: 1640,
    height: 680,
    title: "Discover the Secrets of Duskmourn",
    description:
      "Explore the mysterious land of Duskmourn in this new Magic the Gathering set. Coming September 27th.",
  },
  {
    href: "Invincible_KeyArt_2560x680.png",
    alt: "Promotional Board Game Image for Invincible The-Hero-Building-Game",
    width: 1440,
    height: 500,
    title: "Can't get enough Superhero Fun?",
    description:
      "Join the fight against evil and save the world in Invincible: The-Hero-Building-Game.",
  },
  {
    href: "arcs-banner.webp",
    alt: "Promotional Board Game Image for Arcs",
    width: 1440,
    height: 500,
    title: "Unleash the Power of the Arcs",
    description:
      "Embark on an epic journey to defeat the dark forces and save the world.",
  },
];

export function ImageCarousel() {
  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
      }}
      plugins={[
        Autoplay({
          delay: 15000,
        }),
      ]}
    >
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index}>
            <CardContent className="flex aspect-auto items-center justify-center p-0">
              <div className="relative">
                <Image
                  src={`/images/promotionals/${item.href}`}
                  alt={item.alt}
                  className="mx-auto max-h-[500px] min-h-[250px]"
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 1440px) 100vw, (max-width 768px) 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6 md:p-8">
                  <div className="space-y-2 text-white">
                    <h3 className="text-lg md:text-3xl font-bold">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base">{item.description}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
