export default function title(title) {
  const titleElement = document.querySelector('title');
  if (titleElement) {
    titleElement.innerText = title;
  }
}
