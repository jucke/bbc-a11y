// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
//
// Can use:
// chrome.tabs.*
// chrome.extension.*

chrome.extension.onConnect.addListener(function (port) {
  var extensionListener = function (message, sender, sendResponse) {
    if (message.tabId && message.content) {
        if (message.action === 'code') {
          // Evaluate a script in inspectedPage
          chrome.tabs.executeScript(message.tabId, {code: message.content});
        } else if (message.action === 'script') {
          // Attach script to inspectedPage
          chrome.tabs.executeScript(message.tabId, {file: message.content});
        } else {
          // Pass message to inspectedPage
          chrome.tabs.sendMessage(message.tabId, message, sendResponse);
        }
    } else {
      // Accept messages from the inspectedPage and send them to the panel
      port.postMessage(message);
    }
    sendResponse(message);
  }

  // Listen to messages sent from the panel
  chrome.extension.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function(port) {
    chrome.extension.onMessage.removeListener(extensionListener);
  });

  // port.onMessage.addListener(function (message) {
  //   port.postMessage(message);
  // });

  // this should fire when the tab URL changes. But I can't get it to work.
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    port.postMessage({ message: 'Tab Updated' });
  });

  // this should fire when a new tab is created. But I can't get it to work.
  chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
    port.postMessage({ message: 'Tab Updated' });
  });

});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  return true;
});
