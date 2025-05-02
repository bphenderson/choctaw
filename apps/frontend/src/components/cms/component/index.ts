// Auto generated dictionary
// @not-modified => When this line is removed, the "force" parameter of the CLI tool is required to overwrite this file
import { type ComponentTypeDictionary } from "@remkoj/optimizely-cms-react";
import VideoElementComponent from "./VideoElement";
import TextBlockComponent from "./TextBlock";
import TestimonialElementComponent from "./TestimonialElement";
import RichTextElementComponent from "./RichTextElement";
import QuoteBlockComponent from "./QuoteBlock";
import ParagraphElementComponent from "./ParagraphElement";
import PageSeoSettingsComponent from "./PageSeoSettings";
import OdpEmbedBlockComponent from "./OdpEmbedBlock";
import MenuNavigationBlockComponent from "./MenuNavigationBlock";
import MegaMenuGroupBlockMobileComponent from "./MegaMenuGroupBlock/mobile";
import MegaMenuGroupBlockComponent from "./MegaMenuGroupBlock";
import LayoutSettingsBlockComponent from "./LayoutSettingsBlock";
import ImageElementComponent from "./ImageElement";
import HeroBlockComponent from "./HeroBlock";
import HeadingElementComponent from "./HeadingElement";
import CTAElementComponent from "./CTAElement";
import ContentRecsElementComponent from "./ContentRecsElement";
import CarouselBlockComponent from "./CarouselBlock";
import ButtonBlockComponent from "./ButtonBlock";
import ArticleListElementComponent from "./ArticleListElement";
import ArticleListElementLoader from "./ArticleListElement/loading";
import ComponentPageFactory from "./Page";
import UserProfileCardBlockComponent from "./UserProfileCardBlock";
import SecondaryNavigationBlockComponent from "./SecondaryNavigationBlock";
import AccordionBlockComponent from "./AccordionBlock";
import CalculatorBlockComponent from "./CalculatorBlock";
import ComparisonBlockComponent from "./ComparisonBlock";

// Prefix entries - if needed
prefixDictionaryEntries(ComponentPageFactory, "Page");

// Build dictionary
export const ComponentFactory: ComponentTypeDictionary = [
  {
    type: "VideoElement",
    component: VideoElementComponent,
  },
  {
    type: "TextBlock",
    component: TextBlockComponent,
  },
  {
    type: "TestimonialElement",
    component: TestimonialElementComponent,
  },
  {
    type: "RichTextElement",
    component: RichTextElementComponent,
  },
  {
    type: "QuoteBlock",
    component: QuoteBlockComponent,
  },
  {
    type: "ParagraphElement",
    component: ParagraphElementComponent,
  },
  {
    type: "PageSeoSettings",
    component: PageSeoSettingsComponent,
  },
  {
    type: "OdpEmbedBlock",
    component: OdpEmbedBlockComponent,
  },
  {
    type: "MenuNavigationBlock",
    component: MenuNavigationBlockComponent,
  },
  {
    type: "MegaMenuGroupBlock/mobile",
    component: MegaMenuGroupBlockMobileComponent,
  },
  {
    type: "MegaMenuGroupBlock",
    component: MegaMenuGroupBlockComponent,
  },
  {
    type: "LayoutSettingsBlock",
    component: LayoutSettingsBlockComponent,
  },
  {
    type: "ImageElement",
    component: ImageElementComponent,
  },
  {
    type: "HeroBlock",
    component: HeroBlockComponent,
  },
  {
    type: "HeadingElement",
    component: HeadingElementComponent,
  },
  {
    type: "CTAElement",
    component: CTAElementComponent,
  },
  {
    type: "ContentRecsElement",
    component: ContentRecsElementComponent,
  },
  {
    type: "CarouselBlock",
    component: CarouselBlockComponent,
  },
  {
    type: "ButtonBlock",
    component: ButtonBlockComponent,
  },
  {
    type: "ArticleListElement",
    component: ArticleListElementComponent,
    useSuspense: true,
    loader: ArticleListElementLoader,
  },
  {
    type: "SecondaryNavigationBlockComponent",
    component: SecondaryNavigationBlockComponent,
  },
  {
    type: "UserProfileCardBlock",
    component: UserProfileCardBlockComponent,
  },
  {
    type: "AccordionBlock",
    component: AccordionBlockComponent,
  },
  {
    type: "CalculatorBlock",
    component: CalculatorBlockComponent,
  },
  {
    type: "ComparisonBlock",
    component: ComparisonBlockComponent,
  },
  ...ComponentPageFactory,
];

// Export dictionary
export default ComponentFactory;

// Helper functions
function prefixDictionaryEntries(
  list: ComponentTypeDictionary,
  prefix: string,
): ComponentTypeDictionary {
  list.forEach((component, idx, dictionary) => {
    dictionary[idx].type =
      typeof component.type == "string"
        ? prefix + "/" + component.type
        : [prefix, ...component.type];
  });
  return list;
}
