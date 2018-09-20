import React from "react";
import { get } from "./util";
import IncisionContext from "./IncisionContext";

export default function Operate({ path, children }) {
  return (
    <IncisionContext.Consumer>
      {({ state, update }) =>
        children(get(state, path), newState => update(newState, path))
      }
    </IncisionContext.Consumer>
  );
}
