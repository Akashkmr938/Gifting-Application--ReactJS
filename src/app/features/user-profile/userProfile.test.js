import React from "react";
import renderer from "react-test-renderer";
import UserProfile from "./userProfile";

describe("The UserProfile component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<UserProfile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
