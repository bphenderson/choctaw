"use client";
import Image from "next/image";
import Link from "next/link";
import { type FunctionComponent } from "react";
import useFlag from "@/useFlag";

type LogoProps = JSX.IntrinsicElements["a"] & {
  logo?: string;
};

export const Logo: FunctionComponent<LogoProps> = ({
  logo = "/assets/XC-Innovations13x.webp",
  ...divProps
}) => {
  const { logo: logoUrl } = useFlag("layout_configuration", {
    logo,
    theme_switcher: false,
  });
  return (
    <Link href="/" className="flex items-center grow-0 shrink-0" {...divProps}>
      <Image
        src={logoUrl}
        alt="Choctaw Casinos & Resorts Logo"
        width={320}
        height={56}
        unoptimized
        priority
        className="dark:brightness-0	dark:invert !relative h-9 sm:h-11 w-auto max-w-full"
      />
    </Link>
  );
};

Logo.displayName = "Logo";

export default Logo;
