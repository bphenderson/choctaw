"use client";
import Image from "next/image";
import Link from "next/link";
import { urlToRelative } from "@/components/shared/cms_link";
import { useEffect, useState } from "react";

export type FundPostProps = {
  title: string;
  description: string;
  author?: string;
  published?: string;
  category: string;
  url: string;
  id: string;
  image: { src: string; alt: string; width: number; height: number };
  symbol: string;
};

type FundPostCardProps = {
  blogPost: FundPostProps;
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

import fundPerformanceData from "../../../data/fund_performance.json";

const FundPostCard: React.FC<FundPostCardProps> = ({ blogPost }) => {
  const {
    title,
    description,
    author,
    published,
    category,
    url,
    image,
    symbol,
  } = blogPost;
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    setDate(formatDate(published));
  }, [published]);

  const relativeUrl = urlToRelative(url);
  const fundData =
    fundPerformanceData[symbol as keyof typeof fundPerformanceData];

  const article = (
    <tr className="even:bg-light-grey">
      {title ? (
        <td>
          <Link
            href={relativeUrl}
            className="relative w-full text-indigo-600 hover:text-indigo-900"
          >
            {title}
          </Link>
        </td>
      ) : null}
      {description ? <td>{description}</td> : null}
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        {symbol}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        {fundData?.date}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        ${fundData?.price?.toFixed(2)}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        {fundData?.performanceData.ytd?.toFixed(2)}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        {fundData?.performanceData.oneMonth?.toFixed(2)}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        {fundData?.performanceData.threeMonth?.toFixed(2)}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        {fundData?.performanceData.sixMonth?.toFixed(2)}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        {fundData?.performanceData.oneYear?.toFixed(2)}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        {fundData?.performanceData.threeYear?.toFixed(2)}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        {fundData?.performanceData.fiveYear?.toFixed(2)}
      </td>
    </tr>
  );

  return article;
  // return relativeUrl ? (
  //   <Link href={relativeUrl} className="relative w-full">
  //   <tr>{article}</tr>
  // ) : (
  //   </Link>
  //   <span className="relative w-full">{article}</span>
  // );
};

export default FundPostCard;
