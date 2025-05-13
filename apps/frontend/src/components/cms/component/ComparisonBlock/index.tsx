import { CmsComponent, CmsEditable } from '@remkoj/optimizely-cms-react/rsc';
import ComparisonClient from './ComparisonClient';
import { ComparisonBlockDataFragmentDoc, type ComparisonBlockDataFragment } from '@/gql/graphql';

export const ComparisonBlockComponent: CmsComponent<ComparisonBlockDataFragment> = ({ data }) => {
  return (
    <section className="vb:section vb:section:DefaultGrid relative container mx-auto px-8 flex flex-col py-4 md:py-8 lg:py-12">
      {data.comparisonTitle && (
        <CmsEditable content={data} field="ComparisonTitle" as="h2" className="text-3xl font-bold">
          {data.comparisonTitle}
        </CmsEditable>
      )}

      {/* ----------------------------------------------------------------
          data.products: (ComparisonProduct | null | undefined)[] | null | undefined
          ComparisonClient.products:            ComparisonProduct[]
         ---------------------------------------------------------------- */}
      <ComparisonClient
        products={
          (data?.products ?? []).filter(
            (p): p is NonNullable<typeof p> => Boolean(p)
          )
        }
        /* factory={factory} */
      />
    </section>
  );
};

ComparisonBlockComponent.displayName = "ComparisonBlock";
ComparisonBlockComponent.getDataFragment = () => ["ComparisonBlockData", ComparisonBlockDataFragmentDoc];

export default ComparisonBlockComponent;
