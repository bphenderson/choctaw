import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import "server-only";
import dynamic from "next/dynamic";
import {
  NoticeBarBlockDataFragmentDoc,
  type NoticeBarBlockDataFragment,
} from "@/gql/graphql";

const NoticeBar = dynamic(() => import("./_notice-bar"), { ssr: true });

/**
 * Notice Bar
 * Dismissible advisory strip rendered above the site header. The dismiss
 * interaction (and its sessionStorage persistence) lives in the client child.
 */
export const NoticeBarBlockComponent: CmsComponent<NoticeBarBlockDataFragment> = ({
  data,
  contentLink,
}) => {
  return <NoticeBar data={data} cmsId={contentLink?.key ?? undefined} />;
};
NoticeBarBlockComponent.displayName = "Notice Bar (Component/NoticeBarBlock)";
NoticeBarBlockComponent.getDataFragment = () => [
  "NoticeBarBlockData",
  NoticeBarBlockDataFragmentDoc,
];

export default NoticeBarBlockComponent;
