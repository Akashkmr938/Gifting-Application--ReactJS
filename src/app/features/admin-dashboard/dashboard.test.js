import React from "react";
import renderer from "react-test-renderer";
import Dashboard from "./dashboard";

window.scrollTo = jest.fn();
describe("The dashboard component", () => {
  it("renders correctly", () => {
    window.scrollTo.mockClear();
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
