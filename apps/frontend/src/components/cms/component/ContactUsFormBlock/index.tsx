import {
  type ContactUsFormBlockDataFragment,
  ContactUsFormBlockDataFragmentDoc,
} from "@/gql/graphql";
import type { DocumentNode } from "graphql";
import { type CmsComponent } from "@remkoj/optimizely-cms-react/rsc";
import ContactUsFormBlockClient from "./ContactUsFormBlockClient";

export const ContactUsFormBlockComponent: CmsComponent<
  Partial<ContactUsFormBlockDataFragment>
> = ({ data, inEditMode = false }) => {
  return <ContactUsFormBlockClient />;
};

ContactUsFormBlockComponent.displayName = "Contact Us Form Block";
ContactUsFormBlockComponent.getDataFragment = () => [
  "ContactUsFormBlockData",
  ContactUsFormBlockDataFragmentDoc,
];

export default ContactUsFormBlockComponent;
