import { type CmsComponent } from "@remkoj/optimizely-cms-react/rsc";
import { type DisclosureListBlockDataFragment, DisclosureListBlockDataFragmentDoc } from "@/gql/graphql";
import { CmsContentArea } from "@remkoj/optimizely-cms-react/rsc";

export const DisclosureListBlockComponent: CmsComponent<DisclosureListBlockDataFragment> = ({ data, ctx }) => {
  return (
    
    <div className="disclosure-list-block vb:section vb:section:DefaultGrid flex flex-col w-full on-light-grey dark:border-y-4">
    <div className="container mx-auto px-8">
     <div className="vb:row vb:row:DefaultRow flex-1 flex flex-col flex-nowrap lg:flex-row justify-start justify-items-start content-start items-start my-2 gap-0  ">
      <div className="vb:column vb:column:DefaultColumn block w-full relative top-0 flex flex-col gap-0 py-0 justify-start justify-items-start content-start items-start  ">
      <div className="rich-text prose max-w-none mr-auto ml-0">     
        {data.heading && <h2>{data.heading}</h2>}
      <CmsContentArea
        as="ol"
        className="list-decimal pl-6"
        items={data.DisclosureListBlockItems ?? []}
        itemWrapper={{ as: "li" }}
        ctx={ctx}
      />
    </div></div></div></div></div>
  );
};

DisclosureListBlockComponent.displayName = "Disclosure List Block (Component/DisclosureListBlock)";
DisclosureListBlockComponent.getDataFragment = () => ["DisclosureListBlockData", DisclosureListBlockDataFragmentDoc];

export default DisclosureListBlockComponent;
