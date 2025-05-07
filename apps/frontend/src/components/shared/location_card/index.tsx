"use client";
import Image from "next/image";
import Link from "next/link";
import { urlToRelative } from "@/components/shared/cms_link";
import { useEffect, useState } from "react";

export type LocationPostProps = {
  title: string;
  description: string;
  published?: string;
  category: string;
  url: string;
  id: string;
  image: { src: string; alt: string; width: number; height: number };
};

type LocationPostCardProps = {
  locationPost: LocationPostProps;
};

type DateTimeFormatOptions = {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day?: "numeric" | "2-digit";
};

const formatDate = (dateString?: string | null): any => {
  if (!dateString) {
    return null;
  }

  const options: DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options,
  );
  return formattedDate;
};

const LocationPostCard: React.FC<LocationPostCardProps> = ({
  locationPost,
}) => {
  const { title, description, published, category, url, image } = locationPost;
  const [date, setDate] = useState<string>("");
  // Use blog posts fields to generate the fields needed.

  useEffect(() => {
    setDate(formatDate(published));
  }, [published]);

  const relativeUrl = urlToRelative(url);
  const article = (
    <article className="prose max-w-none p-8 pb-16 bg-white rounded-[20px] w-full h-full before:content-['']  dark:bg-vulcan-85 dark:text-ghost-white">
      {image && image.src ? (
        <Image
          className="w-full rounded-[20px] aspect-video object-cover"
          src={image.src}
          alt={image.alt ?? ""}
          width={620}
          height={430}
        />
      ) : (
        <div className="max-w-full rounded-[20px] bg-light-grey pb-[69.35%] w-[620px] mb-[2em]"></div>
      )}
      {category ? (
        <p className="text-[12px] uppercase tracking-[2px] text-azure mb-[8px]">
          {category}
        </p>
      ) : null}
      {title ? <h3 className="my-0 mt-[16px]">{title}</h3> : null}
      {description ? <p>{description}</p> : null}
      <p>Assumed Dawnview as Atlanta, GA based on ZIP 30303</p>
      <p>Hours: Mon-Fri 9:00 AM - 5:00 PM, Sat 10:00 AM - 2:00 PM</p>
      <a href="#">More Details</a> | <a href="#">Show on Map</a>
    </article>
  );
  return relativeUrl ? (
    <Link href={relativeUrl} className="relative w-full">
      {article}
    </Link>
  ) : (
    <span className="relative w-full">{article}</span>
  );
};

export default LocationPostCard;
