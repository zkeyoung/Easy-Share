import { getWindow } from '../window';

function focusWebView() {
  const window = getWindow();
  window.focusOnWebView();
}

export {
  focusWebView
}