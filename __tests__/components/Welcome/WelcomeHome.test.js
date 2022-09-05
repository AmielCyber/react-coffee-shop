import React from "react";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import WelcomeMessage from "../../../components/Welcome/WelcomeMessage";
import "@testing-library/jest-dom";

const userName = "First Last";
const email = "demo@email.com";

const WelcomeRender = ({ session }) => {
  return (
    <SessionProvider session={session}>
      <WelcomeMessage />
    </SessionProvider>
  );
};

const sessionObj = {
  expires: "1",
  user: {
    email: email,
    name: userName,
  },
};

test("Page Displays heading with signin user's name.", () => {
  render(<WelcomeRender session={sessionObj} />);
  expect(
    screen.getByRole("heading", {
      name: new RegExp(userName),
    })
  );
});

test("Page Displays heading displays Welcome to guest.", () => {
  render(<WelcomeRender session={null} />);
  expect(
    screen.getByRole("heading", {
      name: new RegExp("Welcome to"),
    })
  );
});

test("Page has link to redirect user to order coffee.", () => {
  render(<WelcomeRender session={null} />);
  const linkElement = screen.getByRole("link");
  expect(linkElement).toHaveAttribute("href", "/menu");
});
