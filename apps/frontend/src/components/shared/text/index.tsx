'use client'
import { type FunctionComponent, type DetailedHTMLProps, type HTMLAttributes } from "react"
import { RichText, DefaultComponentFactory, RichTextComponentDictionary as DefaultComponents, type TypedNode, type NodeInput, Utils, isNodeInput, isNonEmptyString, } from "@remkoj/optimizely-cms-react"
import { sanitizeRichText } from "@/lib/sanitize-rich-text"

const richTextFactory = new DefaultComponentFactory(DefaultComponents)

export type ItemTextProps = {
    text: NodeInput | TypedNode | string | undefined | null
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const ItemTextComponent : FunctionComponent<ItemTextProps> = ({ text, ...divProps }) => {
    return Utils.isNodeInput(text) ? 
        <RichText text={ sanitizeRichText(text) } factory={ richTextFactory } {...divProps } /> : 
        <div { ...divProps }>{ Utils.isNonEmptyString(text) ? text : ''}</div>
}

export default ItemTextComponent