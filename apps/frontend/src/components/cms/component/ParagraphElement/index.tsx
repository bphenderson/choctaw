import { CmsComponent } from "@remkoj/optimizely-cms-react";
import { ParagraphElementDataFragmentDoc, type ParagraphElementDataFragment } from "@/gql/graphql";
import { CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import { RichText, extractSettings } from "@remkoj/optimizely-cms-react/rsc";
import getFactory from "@/components/factory";
import { DefaultParagraphProps } from "./displayTemplates";
import { sanitizeRichText } from "@/lib/sanitize-rich-text";

enum AlignClasses {
    left = " mr-auto ml-0",
    center = " mx-auto",
    right = " ml-auto mr-0"
}

/**
 * Paragraph
 * 
 */
export const ParagraphElementElement : CmsComponent<ParagraphElementDataFragment, DefaultParagraphProps> = ({ data: { text }, contentLink, layoutProps, ctx }) => {
    const factory = ctx?.factory
    const {
        placement = "left",
        transform = "default"
    } = extractSettings(layoutProps)

    const width = transform == "full" ? ' max-w-none' : ''
    const align = AlignClasses[placement]

    

    return <CmsEditable as={RichText} factory={ factory ?? getFactory() } text={ sanitizeRichText(text?.json) } cmsId={ contentLink.key } className={`rich-text prose${ width }${ align }`} ctx={ctx} forwardCtx={true} />
}
ParagraphElementElement.displayName = "Paragraph (Element/ParagraphElement)"
ParagraphElementElement.getDataFragment = () => ['ParagraphElementData', ParagraphElementDataFragmentDoc]

export default ParagraphElementElement