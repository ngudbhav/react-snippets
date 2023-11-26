import { useForceUpdate } from '../utils/useForceUpdate'

const states = [];
let index = 0;

export function useState(initialValue = null) {
  const localIndex = index;
  states[localIndex] ||= initialValue;
  const forceUpdate = useForceUpdate();
  const setState = (newValue) => {
    if (typeof newValue === 'function') {
      states[localIndex] = newValue(states[localIndex]);
    } else {
      states[localIndex] = newValue;
    }
    forceUpdate();
    index = 0;
  };
  index += 1;

  return [states[localIndex], setState];
}
