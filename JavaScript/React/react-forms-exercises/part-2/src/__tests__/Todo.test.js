import React from "react";
import { render } from "@testing-library/react";
import Todo from "../Todo";

const str = 'test todo'

it("renders without crashing", function() {
    render(<Todo text={str} />);
});
  
it("matches snapshot", function() {
    const {asFragment} = render(<Todo text={str} />);
    expect(asFragment()).toMatchSnapshot();
});