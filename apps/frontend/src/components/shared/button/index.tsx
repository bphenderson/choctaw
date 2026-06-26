import {
  type FunctionComponent,
  type PropsWithChildren,
  type ComponentProps,
  type ComponentType,
} from "react";
import Link from "next/link";

type ButtonTypes = typeof buttonTypes;
type ButtonVariants = typeof buttonVariants;
type ButtonColors = typeof buttonColors;

export type ButtonProps = Readonly<
  PropsWithChildren<{
    url?: string | URL;
    buttonType?: keyof ButtonTypes;
    buttonVariant?: keyof ButtonVariants;
    buttonColor?: keyof ButtonColors;
  }> &
    Omit<ComponentProps<typeof Link>, "href" | "as" | "type" | "ref">
>;

const buttonTypes = {
  primary: "btn--primary",
  secondary: "btn--secondary",
};
const buttonVariants = {
  default: "btn--default",
  cta: "btn--cta",
  pill: "btn--pill",
};
const buttonColors = {
  default: "",
  dark: "btn--dark",
  light: "btn--light",
};
export const Button: FunctionComponent<ButtonProps> = ({
  className = "",
  buttonType = "primary",
  buttonVariant = "default",
  buttonColor = "default",
  url = "#",
  children,
  ...props
}) => {
  const hrefValue = url ? (typeof url == "string" ? url : url.href) : "#";
  const classNameValue =
    `${buttonTypes[buttonType]} ${buttonVariants[buttonVariant]} ${buttonColors[buttonColor]} ${className}`.trim();

  return (
    <Link href={hrefValue} className={classNameValue} {...props}>
      <div className="btn__content">
        {children}
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </Link>
  );
};

export default Button;
