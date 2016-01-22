// This script is executed in the context of the panel in the Dev Tools

// TODO: this shouldn't be a timeout...
setTimeout(function() {
  sendObjectToInspectedPage({action: "script", content: "a11y.bundle.js"});
  sendObjectToInspectedPage({action: "script", content: "a11y.panel.js"});
}, 500);

function renderA11yResults(validation) {
  plastiq.replace(document.querySelector('#panel'), renderValidation, validation);
}

var h = plastiq.html;

function renderValidation(validation) {
  return h('.a11y',
    h('h1', 'BBC A11y Accessibility Report'),
    h('table.standards', validation.results.map(function(result) {
      var pass = result.errors.length == 0;
      return h('tr', { style: passStyle(pass) },
        h('td', h.rawHtml('.symbol', pass ? '&#x2714;' : '&#x2718;')),
        h('td', result.standard,
          pass ? null :
          h('ul', result.errors.map(function(error) {
            return h('li', error.map(function(part) {
              return h('span.part', { style: { 'margin-right': '4px' } }, part);
            }));
          }))
        )
      )
    }))
  );
}

function passStyle(pass) {
  return { color: pass ? 'green' : 'red', 'vertical-align': 'top' };
}
