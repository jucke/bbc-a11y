// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create("BBC A11y", "toast.png", "panel.html", function(panel) {});
