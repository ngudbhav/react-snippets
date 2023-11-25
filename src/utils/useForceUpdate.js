import React from "react";

export function useForceUpdate() {
  return React.useReducer(() => ({}), null)[1];
}
