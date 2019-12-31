import React from "react";
import Header from "./Header";
import { shallow } from "enzyme";

// Note how with shallow render you search for the React component tag
it("contains 3 NavLinks via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toEqual(3);
});
