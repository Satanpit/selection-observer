export const validate = {
  isElement(value, arg) {
    if (value instanceof Element) {
      return;
    }

    throw new TypeError(`Argument ${arg} must be an Element`);
  },

  isFunction(value, arg) {
    if (typeof value === 'function') {
      return;
    }

    throw new TypeError(`Argument ${arg} must be a Function`);
  }
};

export const findElementNode = (node, target, filter = () => true) => {
  if (!node || !target.contains(node)) {
    return null;
  }

  if (node.nodeType === Node.TEXT_NODE || !filter(node)) {
    return findElementNode(node.parentElement, target, filter);
  }

  return node;
};
