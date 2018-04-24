console.log(document.title)

iframe = document.createElement('iframe')
// iframe.src = 'https://example.com';
iframe.src = chrome.runtime.getURL('contents.html')
iframe.style.height = '100%'
iframe.style.width = '246px'
iframe.style.float = 'left'
iframe.style.position = 'fixed'
iframe.style.top = '0px'
iframe.style.left = '0px'
iframe.style.zIndex = '999'
iframe.style.border = 'none'

document.documentElement.style.marginLeft = '246px'

document.documentElement.insertBefore(iframe, document.body)

var port = chrome.runtime.connect({name: 'knockknock'})

port.onMessage.addListener(function (msg) {
  console.log(msg)
})


window.addEventListener('message', function (event) {
  if (event.data.type && (event.data.type == 'FROM_PAGE')) {
    console.log('Content script received: ' + event.data.text)
    port.postMessage({text: event.data.text});
  }
}, false)


