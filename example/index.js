import { SelectionObserver } from '../lib';

const $editorOne = document.querySelector('.editor-one');
const $editorTwo = document.querySelector('.editor-two');

const observer = new SelectionObserver((entry) => {
  if (entry.oldTarget) {
    entry.oldTarget.classList.remove('focused');
  }

  entry.target.classList.add('focused');

  console.log(entry);
});

observer.observe($editorOne);
observer.observe($editorTwo);

observer.unselectHandler(({ oldTarget }) => {
  oldTarget.classList.remove('focused');
});
