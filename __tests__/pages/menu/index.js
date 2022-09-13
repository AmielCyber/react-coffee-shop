import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Menu from "../../../pages/menu/index";

const PageTitle = "React Coffee";
test("Page Displays image of coffee shop interior", () => {
  const page = render(<Menu />);
});
