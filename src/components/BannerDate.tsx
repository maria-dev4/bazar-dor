"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const getSnapshot = () =>
  new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

const getServerSnapshot = () => "";

const BannerDate = () => {
  const date = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!date) return null;

  return (
    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
      {date}
    </span>
  );
};

export default BannerDate;