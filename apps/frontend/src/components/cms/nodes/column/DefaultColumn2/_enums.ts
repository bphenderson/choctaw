import { type extractSettings } from "@remkoj/optimizely-cms-react/rsc";
import { type DefaultColumn2Props } from "../displayTemplates";

type DefaultColumn2LayoutSpec = Required<
  ReturnType<typeof extractSettings<DefaultColumn2Props>>
>;
type DefaultColumn2LayoutDict<
  K extends keyof DefaultColumn2LayoutSpec,
  T = any,
> = {
  [P in DefaultColumn2LayoutSpec[K]]: T;
};

export const contentSpacingClasses: DefaultColumn2LayoutDict<
  "contentSpacing",
  string
> = {
  none: "gap-0 py-0",
  small: "gap-1 py-1",
  medium: "gap-2 py-2",
  large: "gap-4 py-4 lg:gap-4 lg:py-4",
  xl: "gap-6 py-6 lg:gap-12 lg:py-12",
  xxl: "gap-8 py-8 lg:gap-36 lg:py-36",
};

export const justifyContentClasses: DefaultColumn2LayoutDict<
  "justifyContent",
  string
> = {
  start: "justify-start justify-items-start",
  center: "justify-center justify-items-center",
  end: "justify-end justify-items-end",
};

export const alignContentClasses: DefaultColumn2LayoutDict<
  "alignContent",
  string
> = {
  start: "content-start items-start",
  center: "content-center items-center",
  end: "content-end items-end",
};

export const showFromClasses: DefaultColumn2LayoutDict<"showFrom", string> = {
  fromSmall: "hidden sm:block",
  fromMedium: "hidden md:block",
  fromLarge: "hidden lg:block",
  always: "block",
};

export const minWidthClasses: DefaultColumn2LayoutDict<"minWidth", string> = {
  small: "lg:min-w-[12rem]",
  medium: "lg:min-w-[24rem]",
  large: "lg:min-w-[32rem]",
  auto: "",
};

export const overFlowClasses: DefaultColumn2LayoutDict<"overflow", string> = {
  right: "left-0",
  left: "right-0",
  clip: "overflow-hidden",
  full: "",
};

export const widthClasses: DefaultColumn2LayoutDict<"width", string> = {
  full: "w-full",
  "three-quarters": "w-full lg:w-3/4",
  half: "w-full lg:w-1/2",
  third: "w-full lg:w-1/3",
  quarter: "w-full lg:w-1/4",
};
