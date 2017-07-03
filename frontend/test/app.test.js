import React from "react";
import App from "../components/app";
import { shallow } from "enzyme";

describe("App Component'", () => {
  it("contains 'hello' text", () => {
    const app = shallow(<App/>);
    expect(app.contains(<div>hello</div>)).toBe(true);
  });
});
