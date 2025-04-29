import React from "react";
import Image from "next/image";
import { CmsImage } from "@/components/shared/cms_image";
import { ContentTypeProps } from "@optimizely/cms/types";
import {
  CmsEditable,
  type CmsComponent,
  RichText,
} from "@remkoj/optimizely-cms-react/rsc";
import { UserProfileCardBlock } from "@gql/graphql";
import {
  UserProfileCardBlockDataFragment,
  UserProfileCardBlockDataFragmentDoc,
} from "@/gql/graphql";

interface UserProfileCardBlockProps extends ContentTypeProps {
  Name?: string;
  Bio?: string;
  ProfileImage?: {
    url: string;
    alt?: string;
  };
}

export const UserProfileCardBlockComponent: CmsComponent<
  UserProfileCardBlockDataFragment
> = ({ data: { Name, Bio, ProfileImage } }) => {
  return (
    <div className="user-profile-card">
      <CmsImage
        src={ProfileImage}
        alt={"Profile Image"}
        width={100}
        height={100}
        style={{ borderRadius: "50%" }}
      />
      <h2 style={{ fontSize: "22px" }}>{Name}</h2>
      <p>{Bio}</p>
    </div>
  );
};

UserProfileCardBlockComponent.displayName =
  "User Profile Card (Component/UserProfileCardBlock)";
UserProfileCardBlockComponent.getDataFragment = () => [
  "UserProfileCardBlockData",
  UserProfileCardBlockDataFragmentDoc,
];

export default UserProfileCardBlockComponent;

// Optimizely CMS metadata
UserProfileCardBlockComponent.contentType = "UserProfileCardBlock";
