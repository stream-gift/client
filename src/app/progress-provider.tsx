"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const ProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <ProgressBar
        height="1px"
        color="#3C83F6"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};
