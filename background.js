let initialized = false;
let counter = 0;
let intervalId;

chrome.browserAction.onClicked.addListener((tab) => {
  if (!initialized) {
    chrome.tabs.executeScript({
      file: 'contentscript.js',
    });
    initialized = true;
  }

  chrome.tabs.executeScript(tab.id, {
    code: `
      window.onbeforeunload = function() {
        return true;
      }`,
  });
});

chrome.tabs.onCreated.addListener((tab) => {
  chrome.tabs.executeScript(tab.id, {
    file: 'contentscript.js',
  });

});

chrome.runtime.onConnect.addListener((port) => {

  port.onMessage.addListener((event) => {
    if (event.type === 'START_CALL' && !intervalId) {
      setCallDuration(port);
      intervalId = window.setInterval(setCallDuration, 1000);

    }
    if (event.type === 'END_CALL' && intervalId) {
      window.clearInterval(intervalId);
      intervalId = counter = 0;

    }
  });
});

function setCallDuration() {

  let date = new Date();
  date.setMinutes(0);
  date.setSeconds(counter);

  let options = {
    minute: '2-digit',
    second: '2-digit',
  };

  chrome.storage.sync.set(
      {duration: new Intl.DateTimeFormat('en-US', options).format(date)},
  );

  counter++;

}

