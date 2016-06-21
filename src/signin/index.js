var page = require('page')
var empty = require('empty-element');
var template = require('./template')
var title= require('title')

page('/signin', function (context,next) {
//    main.innerHTML='signup <a href="/">Home</a>';
    title('webGram-signin');
    var main  = document.getElementById('main-container');
    empty(main).appendChild(template);

})