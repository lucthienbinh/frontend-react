import React from "react";
import "./index.css";

import Container from "react-bootstrap/Container";
import { useLoading, BallTriangle } from "@agney/react-loading";

export default function Loading() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle width="150" />,
  });
  return (
    <Container className="loading-container">
      <div className="loading-background">
        <section {...containerProps}>{indicatorEl}</section>
      </div>
    </Container>
  );
}
