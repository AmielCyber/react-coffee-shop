import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";
import WelcomeMessage from "../../../components/Welcome/WelcomeMessage";

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

test("Component displays heading with signin user's name.", () => {
  render(<WelcomeRender session={sessionObj} />);
  expect(
    screen.getByRole("heading", {
      name: new RegExp(userName),
    })
  );
});

test("Component displays heading Welcome to guest.", () => {
  render(<WelcomeRender session={null} />);
  // Assertion
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
