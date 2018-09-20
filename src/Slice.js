import React from "react";
import { get } from "./util";
import IncisionContext from "./IncisionContext";

export default function Slice({ path, children }) {
  return (
    <IncisionContext.Consumer>
      {({ state, update }) => (
        <IncisionContext.Provider
          value={{
            state: get(state, path),
            update: (value, subPath = null) =>
              update(value, subPath ? `${path}.${subPath}` : path)
          }}
        >
          {children}
        </IncisionContext.Provider>
      )}
    </IncisionContext.Consumer>
  );
}
