import React from "react";
import { useLoading, BallTriangle } from "@agney/react-loading";

export default function Loading() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle width="150" />,
  });
  return <section {...containerProps}>{indicatorEl}</section>;
}
