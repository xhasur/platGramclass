var yo = require('yo-yo');
var translate = require('../traslate');

module.exports = function layout(content) {
    return yo`<div class="content">
      ${content}
      </div>`;
}