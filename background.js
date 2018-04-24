// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict'

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     // console.log('The color is green.');
//   });
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'developer.chrome.com'},
//       })],
//       actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });

let initialized = false

chrome.browserAction.onClicked.addListener(function (tab) {
  if (!initialized) {
    chrome.tabs.executeScript({
      file: 'master.js',
    })
    initialized = true;
  }

    chrome.tabs.executeScript({
      code: 'window.onbeforeunload = function() {\n' +
      '  return "Master toolbar is initialized. Close tab?";\n' +
      '}',
    })
});

chrome.tabs.onCreated.addListener(function (tab) {
  chrome.tabs.executeScript(tab.id, {
    file: 'slave.js',
  })

});

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    if (msg.text == "Hello from the iframe!") {
      port.postMessage({text: "Background script received: " + msg.text});

    }

  });
});




