import { CmsComponent, CmsEditable } from '@remkoj/optimizely-cms-react/rsc';
import ComparisonClient from './ComparisonClient';
import { ComparisonBlockDataFragmentDoc, type ComparisonBlockDataFragment } from '@/gql/graphql';

export const ComparisonBlockComponent: CmsComponent<ComparisonBlockDataFragment> = ({ data }) => {
  return (
    <section className="comparison-block my-8">
      {data.comparisonTitle && (
        <CmsEditable content={data} field="ComparisonTitle" as="h2" className="text-3xl font-bold">
          {data.comparisonTitle}
        </CmsEditable>
      )}

      <ComparisonClient products={data.products} />
    </section>
  );
};

ComparisonBlockComponent.displayName = "ComparisonBlock";
ComparisonBlockComponent.getDataFragment = () => ["ComparisonBlockData", ComparisonBlockDataFragmentDoc];

export default ComparisonBlockComponent;
