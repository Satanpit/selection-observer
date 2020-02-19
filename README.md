# Selection Observer

This is JavaScript library for tracking selection changes in the page,
we will using this for create wysiwyg editor or page builder.

For track selection library use
[Range API](https://developer.mozilla.org/en-US/docs/Web/API/Range),
[Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection)
and listen `selectionchange` and `pointerdown` events

## Browsers support

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | ? |

## Installing

```bash
npm install selection-observer
```

## Demo

[Demo page](https://satanpit.github.io/selection-observer/)

## Example

Listen all selection changes:

```javascript
import { SelectionObserver } from './selection-observer';

const observer = new SelectionObserver((entry) => {
  console.log(entry);
});

observer.observe(document.body);
```

Listen only base element changes:

```javascript
import { SelectionObserver } from './selection-observer';

const observer = new SelectionObserver((entry) => {
  console.log(entry);
});

observer.observe(document.body, {
  onlyElements: true,
});
```

## API

SelectionObserver interface:
```typescript
interface SelectionObserver {
  constructor(callback: (entry: SelectionObserverEntry) => void);
  observe(target: Element, options?: SelectionObserverObserveOptions): void;
  disconnect(target: Element): void;
  unselectHandler(callback: ({ target: Element, oldTarget: Element }) => void): void;
}
```

SelectionObserverEntry interface:
```typescript
interface SelectionObserverEntry {
  target: Element;
  tag: string;
  type: 'layer' | 'title' | 'list' | 'list-item' | 'line' | 'image' | 'paragraph' | 'code' | string;
  selection: Selection;
  range: Range;
  getSelectedNodes: () => Node[];
}
```

SelectionObserverObserveOptions interface:
```typescript
interface SelectionObserverObserveOptions {
  filter: (item: Element) => boolean;
  ignoreMainContainer: boolean;
  onlyElements: boolean;
}
```
