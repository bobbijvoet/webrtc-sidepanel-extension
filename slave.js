

console.log(document.title);


iframe = document.createElement('div');
// iframe.src = 'https://example.com';
iframe.style.height = '100%';
iframe.style.width = '246px';
iframe.style.float = 'left';
iframe.style.position = 'fixed';
iframe.style.top = '0px';
iframe.style.left = '0px';
iframe.style.zIndex= '999';
iframe.style.border= 'none';
iframe.style.backgroundColor = 'lightgrey';


document.documentElement.style.marginLeft = '246px';



document.documentElement.insertBefore(iframe, document.body);

var port = chrome.runtime.connect({name: 'knockknock'})

port.onMessage.addListener(function (msg) {
  console.log(msg)
})



