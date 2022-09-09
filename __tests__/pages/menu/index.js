import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Menu from "../../../pages/menu/index";

test("Page Displays image of coffee shop interior", () => {
  const page = render(<Menu />);
});
