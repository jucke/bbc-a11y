function sendObjectToDevTools(message) {
  chrome.extension.sendMessage(message, function(message){
    // execute something on receipt...?
  });
}

sendObjectToDevTools(window.a11y.validate());
