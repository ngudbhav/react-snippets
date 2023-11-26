let oldDeps = [];
let initialRender = false;

/**
 * Lacks support for component unmounting
 * @param callback {Function}
 * @param deps {Array}
 */
export function useEffect(callback, deps = []) {
  if (typeof deps === 'undefined' || deps === null) {
    deps = [];
  }
  if (deps.length === 0) {
    if (!initialRender) {
      callback();
      initialRender = true;
      oldDeps = deps;
      return;
    } else {
      return;
    }
  }

  if (deps.length !== oldDeps.length) {
    callback();
    oldDeps = deps;
    return;
  }
  for(let i = 0; i < deps.length; i++) {
    if (deps[i] !== oldDeps[i]) {
      callback();
      oldDeps = deps;
      break;
    }
  }
}
