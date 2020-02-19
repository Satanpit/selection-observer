export const NON_SELECTION_TAGS = new Set(['hr', 'img']);

export const TYPES_TAGS = [
  {
    type: 'layer',
    tags: new Set(['div', 'article', 'main', 'section', 'aside', 'header', 'footer']),
  },
  {
    type: 'title',
    tags: new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  },
  {
    type: 'list',
    tags: new Set(['ol', 'ul']),
  },
  {
    type: 'list-item',
    tags: new Set(['li']),
  },
  {
    type: 'line',
    tags: new Set(['hr']),
  },
  {
    type: 'image',
    tags: new Set(['img']),
  },
  {
    type: 'paragraph',
    tags: new Set(['p']),
  },
  {
    type: 'code',
    tags: new Set(['code', 'pre']),
  },
];
