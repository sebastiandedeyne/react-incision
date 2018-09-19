import React from "react";
import { get } from "./util";
import IncisionContext from "./IncisionContext";

export default function Slice({ path, children }) {
  return (
    <IncisionContext.Consumer>
      {({ values, update }) => (
        <IncisionContext.Provider
          value={{
            values: get(values, path),
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
