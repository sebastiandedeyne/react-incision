import React from "react";
import { get } from "./util";
import IncisionContext from "./IncisionContext";

export default function Operate({ path, children }) {
  return (
    <IncisionContext.Consumer>
      {({ values, update }) =>
        children(get(values, path), newValue => update(newValue, path))
      }
    </IncisionContext.Consumer>
  );
}
