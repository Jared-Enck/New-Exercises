import React from "react";
import { render } from "@testing-library/react";
import BoxList from "../BoxList";
import BOXES from "../boxes"

it("renders without crashing", function() {
  render(<BoxList boxes={BOXES} />);
});

it("matches snapshot", function() {
  const {asFragment} = render(<BoxList boxes={BOXES} />);
  expect(asFragment()).toMatchSnapshot();
});