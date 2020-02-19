import { SelectionObserverEntry } from './selection-entry';
import { NON_SELECTION_TAGS } from './selection-types';
import { validate, findElementNode } from './utils';

const SELECTION_TARGETS = new WeakMap();
const UNSELECT_HANDLERS = new WeakMap();

const DEFAULT_OBSERVE_OPTIONS = {
  filter: undefined,
  ignoreMainContainer: false,
  onlyElements: false,
};

export class SelectionObserver {
  constructor(callback) {
    validate.isFunction(callback);

    const targets = SELECTION_TARGETS.set(this, []).get(this);
    const unselectHandlers = UNSELECT_HANDLERS.set(this, []).get(this);

    let currentElement = null;

    const onPointerDown = (event) => {
      if (targets.length === 0) {
        return;
      }

      const src = targets.find(({ target }) => target.contains(event.target));

      if (!src) {
        event.preventDefault();

        currentElement && unselectHandlers.forEach(handler => handler({
          target: event.target,
          oldTarget: currentElement
        }));

        currentElement = null;
        return;
      }

      if (src.options.ignoreMainContainer && event.target === src.target) {
        event.preventDefault();
        return;
      }

      if (!NON_SELECTION_TAGS.has(event.target.localName)) {
        return;
      }

      event.preventDefault();

      const selection = window.getSelection();

      try {
        selection.collapse(event.target);
      } catch (e) {
        selection.removeAllRanges();
        selection.addRange(new Range());
      }

      if (selection.focusNode !== event.target) {
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent('selectionchange', { detail: event.target }));
        });
      }
    };

    const onSelectionChange = (event) => {
      if (targets.length === 0) {
        return;
      }

      const selection = window.getSelection();

      if (selection.rangeCount === 0) {
        return;
      }

      const range = selection.getRangeAt(0);
      const src = targets.find(({ target }) => target.contains(event.detail || range.commonAncestorContainer));

      if (!src) {
        return;
      }

      let findContainer = event.detail;

      if (!findContainer) {
        if (range.commonAncestorContainer === src.target && range.endOffset === 0) {
          findContainer = range.startContainer;
        } else {
          findContainer = range.commonAncestorContainer;
        }
      }

      const target = findElementNode(findContainer, src.target, src.options.filter);

      if (src.options.onlyElements && target === currentElement) {
        return;
      }

      if (!target) {
        return;
      }

      const entry = new SelectionObserverEntry({
        selection,
        range,
        target,
        oldTarget: currentElement,
        srcTarget: src.target,
      });

      callback(entry);
      currentElement = target;
    };

    document.addEventListener('pointerdown', onPointerDown, false);
    document.addEventListener('selectionchange', onSelectionChange, false);
  }

  observe(target, options) {
    validate.isElement(target, 'target');

    SELECTION_TARGETS.get(this).push({
      target,
      options: Object.assign({}, DEFAULT_OBSERVE_OPTIONS, options)
    });
  }

  unselectHandler(callback) {
    validate.isFunction(callback, 'callback');

    UNSELECT_HANDLERS.get(this).push(callback);
  }

  disconnect(target) {
    validate.isElement(target, 'target');

    const targets = SELECTION_TARGETS.get(this);
    const recordIndex = targets.findIndex(item => item.target === target);

    if (~recordIndex) {
      targets.splice(recordIndex, 1);
    }
  }
}
