import { getWindow } from '../window';

function focusWebView() {
  const window = getWindow();
  if (window) {
    window.focusOnWebView();
  }
}

export {
  focusWebView
}