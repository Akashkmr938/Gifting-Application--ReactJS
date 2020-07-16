import React from "react";
import renderer from "react-test-renderer";
import SendGift from "./sendgift";

describe("The SendGift component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SendGift />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
