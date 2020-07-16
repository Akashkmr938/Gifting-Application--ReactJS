import React from "react";
import renderer from "react-test-renderer";
import Layout from "./layout";
import { MemoryRouter } from "react-router";

describe("The Layout component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
