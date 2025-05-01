import React from 'react';
import { CmsComponent, CmsEditable } from '@remkoj/optimizely-cms-react/rsc';
import AccordionBlockClient from './AccordionBlockClient';
import { AccordionBlockDataFragmentDoc, type AccordionBlockDataFragment } from '@/gql/graphql';

export const AccordionBlockComponent: CmsComponent<AccordionBlockDataFragment> = ({ data, contentLink }) => (
  <section className="vb:section vb:section:AccordionBlock relative container mx-auto px-8 flex flex-col my-8">
    {data.heading && (
      <CmsEditable content={data} field="AccordionBlockHeading" as="h2" className="text-3xl font-bold mb-6">
        {data.heading}
      </CmsEditable>
    )}

    <div className="bg-ghost-white dark:bg-vulcan border border-gray-200 dark:border-gray-700 rounded-[1rem] shadow-sm">
      <AccordionBlockClient data={data} />
    </div>
  </section>
);

AccordionBlockComponent.displayName = "AccordionBlock";
AccordionBlockComponent.getDataFragment = () => ["AccordionBlockData", AccordionBlockDataFragmentDoc];

export default AccordionBlockComponent;
