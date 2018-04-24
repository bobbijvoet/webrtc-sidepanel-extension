iframe = document.createElement('iframe');
iframe.src = chrome.runtime.getURL('toolbar/toolbar.html');
iframe.style.height = '100%';
iframe.style.width = '246px';
iframe.style.float = 'left';
iframe.style.position = 'fixed';
iframe.style.top = '0px';
iframe.style.left = '0px';
iframe.style.zIndex = '999';
iframe.style.border = 'none';
iframe.style.backgroundColor = 'white';
iframe.style.boxShadow = '0 0 2px lightgrey';

document.documentElement.style.marginLeft = '246px';

document.documentElement.insertBefore(iframe, document.body);

const port = chrome.runtime.connect({name: 'port1'});

window.addEventListener('message', (event) => {
  if (event.data.type && event.data.type === 'START_CALL') {
    port.postMessage({type: event.data.type});
  }

  if (event.data.type && event.data.type === 'END_CALL') {
    port.postMessage({type: event.data.type});
  }

}, false);

chrome.storage.onChanged.addListener((changes) => {
  iframe.contentWindow.postMessage(
      {type: 'UPDATE_DURATION', duration: changes.duration.newValue}, '*');
});
