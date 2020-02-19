import { TYPES_TAGS } from './selection-types';

export class SelectionObserverEntry {
  constructor({ selection, range, target, srcTarget, oldTarget }) {
    this.selection = selection;
    this.range = range;
    this.target = target;
    this.srcTarget = srcTarget;
    this.oldTarget = oldTarget;
  }

  get tag() {
    const value = this.target.localName;

    Object.defineProperty(this, 'tag', { value });

    return value;
  }

  get display() {
    const value = window.getComputedStyle(this.target).display;

    Object.defineProperty(this, 'display', { value });

    return value;
  }

  get rects() {
    const value = this.target.getBoundingClientRect();

    Object.defineProperty(this, 'rects', { value });

    return value;
  }

  get type() {
    const { type: value } = TYPES_TAGS.find(({ tags }) => tags.has(this.tag)) || { type: this.display };

    Object.defineProperty(this, 'type', { value });

    return value;
  }

  getSelectedNodes() {
    this.target.normalize();

    if (this.selection.isCollapsed) {
      return [];
    }

    if (this.range.startContainer.nodeType === Node.TEXT_NODE) {
      this.range.startContainer.splitText(this.range.startOffset);
    }

    if (this.range.endContainer.nodeType === Node.TEXT_NODE) {
      this.range.endContainer.splitText(this.range.endOffset);
    }

    const walker = document.createTreeWalker(this.target, NodeFilter.SHOW_ALL);
    const nodes = [];

    while (walker.nextNode()) {
      if (!this.selection.containsNode(walker.currentNode)) {
        continue;
      }

      if (nodes.some(node => node.contains(walker.currentNode))) {
        continue;
      }

      nodes.push(walker.currentNode);
    }

    return nodes.filter(node => node.textContent.trim());
  }
}
