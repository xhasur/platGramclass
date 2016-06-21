var page = require('page');
var empty = require('empty-element');
var template = require('./template')
var title= require('title');
var request = require('superagent');
var axios = require('axios');
var header = require('../header');
var Webcam= require('webcamjs');
var picture= require('../picture-card')

page('/',header,asyncLoad, function (context,next) {
//    main.innerHTML='signup <a href="/">Home</a>';
//    main.innerHTML='Home <a href="/signup">Signup</a>';
    title('webGram');
    var main  = document.getElementById('main-container');






   /* var pictures = [
        {
            user: {
                username: 'slifszyc',
                avatar: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11031148_10153448564292612_2579019413701631604_n.jpg?oh=d83cdd0687c87c91b247a42375fc5a57&oe=57B12767'
            },
            url: 'office.jpg',
            likes: 0,
            liked: true,
            createdAt:new Date()
        },
        {
            user: {
                username: 'slifszyc',
                avatar: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11031148_10153448564292612_2579019413701631604_n.jpg?oh=d83cdd0687c87c91b247a42375fc5a57&oe=57B12767'
            },
            url: 'office.jpg',
            likes: 1,
            liked: true,
            createdAt:new Date().setDate(new Date().getDate()-10)
        }
    ];
*/

    empty(main).appendChild(template(context.pictures));


    const picturePreview = $('#picture-preview');
    const camaraInput = $('#camara-input');
    const cancelPicture = $('#cancelPicture');
    const shootButton = $('#shoot');
    const uploadButton = $('#uploadButton');



    function reset(){
        picturePreview.addClass('hide');
        cancelPicture.addClass('hide');
        uploadButton.addClass('hide');
        shootButton.removeClass('hide');
        camaraInput.removeClass('hide')
    }

    cancelPicture.click(reset)

    $('.modal-trigger').leanModal({
        ready: function () {
            //se ejcuta cuando se dispara el modal
            Webcam.attach( '#camara-input' );
            shootButton.click((ev) => {
                Webcam.snap((data_uri) => {
                    picturePreview.html(`<img src="${data_uri}"/>`);
                    picturePreview.removeClass('hide');
                    cancelPicture.removeClass('hide');
                    uploadButton.removeClass('hide');
                    shootButton.addClass('hide');
                    camaraInput.addClass('hide');
                    uploadButton.off('click');  //para quitar los anteriores
                    uploadButton.click(() => {
                       const pic = {
                           url: data_uri,
                           likes:0,
                           liked: false,
                           createdAt: +new Date(),
                           user: {
                               username: 'slifszyc',
                               avatar: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11031148_10153448564292612_2579019413701631604_n.jpg?oh=d83cdd0687c87c91b247a42375fc5a57&oe=57B12767'
                           }
                       }
                        //prepedn pone elemento antes que los otros que tien
                       $('#picture-cards').prepend(picture(pic));
                        reset();
                        $('#modalCamara').closeModal();
                    })
                })
            })
        },
        complete: function () {
            //se ejuta cuando se cierra
            Webcam.reset();
            reset();
        }

    });
})


function loadPictures(ctx, next) {
    request
        .get('/api/pictures')
        .end(function (err, res) {
            if (err) return console.log(err);

            ctx.pictures = res.body;
            next();
        })
}


function loadPicturesAxios(ctx, next) {
    axios
        .get('/api/pictures')
        .then(function (res) {
            ctx.pictures = res.data;
            next();
        })
        .catch(function (err) {
            console.log(err);
        })
}

function loadPicturesFetch(ctx,next){

    fetch('/api/pictures')
        .then(function (res) {
            return res.json();
            //nos devuelve una promesa mas  con el res.json convertifs en json la respuesta
            //por eso creamos otro then
        })
        .then(function (pictures) {
            //ahora sii tenemos las respuestas
            ctx.pictures = pictures;
            next();
        })
        .catch(function (err) {
            console.log(err);
        })
}



async function asyncLoad(ctx, next) {
    try {
        //await detiene la ejeccon hasta que se cimpla la promesa
        ctx.pictures = await fetch('/api/pictures').then(res => res.json());
        next();
    } catch (err) {
        return console.log(err);
    }
}

