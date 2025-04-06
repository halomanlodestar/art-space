import React, { PropsWithChildren } from "react";

const CreateCommunityLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={
        "flex w-full h-page items-center justify-center container-x container-y"
      }
    >
      {children}
    </div>
  );
};

export default CreateCommunityLayout;
