import { SelectionObserver } from '../lib';

const $editorOne = document.querySelector('.editor-one');
const $editorTwo = document.querySelector('.editor-two');
const $controls = document.createElement('div');

$controls.classList.add('controls');
$controls.hidden = true;

document.body.appendChild($controls);

Array.from($editorOne.querySelectorAll('*')).forEach(node => {
  node.contentEditable = 'true';
});

Array.from($editorTwo.querySelectorAll('*')).forEach(node => {
  node.contentEditable = 'true';
});

const observer = new SelectionObserver((entry) => {
  if (entry.oldTarget) {
    entry.oldTarget.classList.remove('focused');
  }

  entry.target.classList.add('focused');

  const controlRect = $controls.getBoundingClientRect();

  $controls.hidden = false;
  $controls.textContent = `${entry.type} -> ${entry.tag}`;
  $controls.style.transform = `translate(
    ${entry.rects.left + (entry.rects.width - controlRect.width) + scrollX + 2}px,
    ${entry.rects.top + scrollY - 26}px
  )`;

  console.log(entry);
});

observer.observe($editorOne, {
  ignoreMainContainer: true,
});

observer.observe($editorTwo, {
  ignoreMainContainer: true,
});

observer.unselectHandler(({ oldTarget }) => {
  oldTarget.classList.remove('focused');
  $controls.hidden = true;

  window.getSelection().removeAllRanges();
});
