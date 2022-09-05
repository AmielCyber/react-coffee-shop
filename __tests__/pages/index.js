import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Home from "../../pages";

const HomePage = () => {
  return (
    <SessionProvider session={null}>
      <Home />
    </SessionProvider>
  );
};

test("Page Displays image of coffee shop interior", () => {
  render(<HomePage />);
  expect(screen.getByRole("img")).toHaveAttribute(
    "alt",
    "Coffee Shop Interior"
  );
});
