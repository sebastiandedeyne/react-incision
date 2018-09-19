export function get(object, path) {
  if (!path) {
    return object;
  }

  if (object === null || typeof object !== "object") {
    return object;
  }

  const [pathHead, pathTail] = path.split(/\.(.+)/);

  return get(object[pathHead], pathTail);
}

export function noop() {
  return undefined;
}
