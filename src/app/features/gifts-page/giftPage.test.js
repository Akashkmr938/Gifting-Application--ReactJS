import React from "react";
import renderer from "react-test-renderer";
import GiftPage from "./giftspage";

describe("The GiftPage component", () => {
  const props = {
    location: {
      search: ""
    }
  };
  it("renders correctly", () => {
    const tree = renderer.create(<GiftPage {...props}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
