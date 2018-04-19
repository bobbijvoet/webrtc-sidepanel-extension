

console.log(document.title);


iframe = document.createElement('iframe');
// iframe.src = 'https://example.com';
iframe.src = chrome.runtime.getURL('contents.html');
iframe.style.height = '100%';
iframe.style.width = '246px';
iframe.style.float = 'left';
iframe.style.position = 'fixed';
iframe.style.top = '0px';
iframe.style.left = '0px';
iframe.style.zIndex= '999';
iframe.style.border= 'none';


document.documentElement.style.marginLeft = '246px';

document.documentElement.insertBefore(iframe, document.body);
