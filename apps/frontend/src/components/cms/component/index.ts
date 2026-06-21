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
import ChartBlockComponent from "./ChartBlock";
import ComparisonBlockComponent from "./ComparisonBlock";
import ContactUsFormBlockComponent from "./ContactUsFormBlock";
import FormMetricsBlockComponent from "./FundMetricsBlock";
import FundTabsComponent from "./FundTabs";
import TabItemComponent from "./TabItem";
import DisclosureBlockComponent from "./DisclosureBlock";
import DisclosureListBlockComponent from "./DisclosureListBlock";
import BookingBarBlockComponent from "./BookingBarBlock";
import SuiteGridBlockComponent from "./SuiteGridBlock";
import SuiteCardBlockComponent from "./SuiteCardBlock";
import ExperiencesBlockComponent from "./ExperiencesBlock";
import ExperienceCardBlockComponent from "./ExperienceCardBlock";

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
    type: "MenuNavigationBlock/default",
    component: MenuNavigationBlockComponent,
  },
  {
    type: "MenuNavigationBlock/footer",
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
    type: "MegaMenuGroupBlock/default",
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
    type: "ButtonBlock/default",
    component: ButtonBlockComponent,
  },
  {
    type: "ArticleListElement",
    component: ArticleListElementComponent,
    useSuspense: true,
    loader: ArticleListElementLoader,
  },
  {
    type: "SecondaryNavigationBlock",
    component: SecondaryNavigationBlockComponent,
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
    type: "ChartBlock",
    component: ChartBlockComponent,
  },
  {
    type: "ComparisonBlock",
    component: ComparisonBlockComponent,
  },
  {
    type: "ContactUsFormBlock",
    component: ContactUsFormBlockComponent,
  },
  {
    type: "FundMetricsBlock",
    component: FormMetricsBlockComponent,
  },
  {
    type: "FundTabs",
    component: FundTabsComponent,
  },
  {
    type: "TabItem", 
    component: TabItemComponent,
  },
  {
    type: "DisclosureBlock",
    component: DisclosureBlockComponent,
  },
  {
    type: "DisclosureListBlock",
    component: DisclosureListBlockComponent,
  },
  {
    type: "BookingBarBlock",
    component: BookingBarBlockComponent,
  },
  {
    type: "SuiteGridBlock",
    component: SuiteGridBlockComponent,
  },
  {
    type: "SuiteCardBlock",
    component: SuiteCardBlockComponent,
  },
  {
    type: "ExperiencesBlock",
    component: ExperiencesBlockComponent,
  },
  {
    type: "ExperienceCardBlock",
    component: ExperienceCardBlockComponent,
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
