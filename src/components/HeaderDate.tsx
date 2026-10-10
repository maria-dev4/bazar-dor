"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const getSnapshot = () =>
  new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

const getServerSnapshot = () => "";

const HeaderDate = () => {
  const date = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">{date}</p>;
};

export default HeaderDate;
