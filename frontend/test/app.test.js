import React from "react";

import Root from "../components/root";
import { shallow } from "enzyme";

describe("App Component'", () => {
  it("contains 'hello' text", () => {
    const root = shallow(
      <Root/>
    );
    expect(root.contains(<div>hello</div>)).toBe(true);
  });
});
