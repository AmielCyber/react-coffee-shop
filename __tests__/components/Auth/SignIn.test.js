import React from "react";
import { render, screen } from "@testing-library/react";
import SignIn from "../../../components/Auth/SignIn";
import { Provider } from "react-redux";
import store from "../../../store/index";

test("Sign in form display", () => {
  render(
    <Provider store={store}>
      <SignIn />
    </Provider>
  );
});
