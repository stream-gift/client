"use client";

import { useTimeAgo } from "next-timeago";

export const TimeAgo = ({ date }: { date: string | Date }) => {
  const { TimeAgo } = useTimeAgo();

  return (
    <div suppressHydrationWarning>
      <TimeAgo date={date} live={false} />
    </div>
  );
};
