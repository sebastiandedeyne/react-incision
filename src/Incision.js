import React from "react";
import { noop } from "./util";
import { applyPatches } from "immer";
import IncisionContext from "./IncisionContext";

export default function Incision({
  container = null,
  state = null,
  onChange = null,
  beforePatch = noop,
  children
}) {
  if (container && state) {
    invalidPropsError("[container] and [state] provided");
  }

  if (container && onChange) {
    invalidPropsError("[container] and [onChange] provided");
  }

  if (!container && !state && !onChange) {
    invalidPropsError("none provided");
  }

  if (container) {
    state = container.state;
    onChange = container.setState.bind(container);
  }

  const update = (newState, path = []) => {
    const patch = {
      op: "replace",
      path: path.split("."),
      value: newState
    };

    beforePatch(patch);
    onChange(applyPatches(state, [patch]));
  };

  return (
    <IncisionContext.Provider value={{ state, update }}>
      {children}
    </IncisionContext.Provider>
  );
}

function invalidPropsError(reason) {
  throw new Error(
    `You must provide a [container] or a [state] object and an [onChange] handler, ${reason}.`
  );
}
