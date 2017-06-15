var topicId = getParameterByName('topic_id');

//Solo por propositos de debug
//if(topicId){
//  alert("El topic ID es:"+topicId);
//}
var api = {
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/' + topicId,
    urlResp: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/' + topicId + '/responses',
}

var plantilla =
    '<section class="container">' +
    '<div class="row">' +
    '<h3>Por: __author-topic__</h3>' +
    ' </div>' +
    ' <div class="row"> <p>__content__</p>' +
    '</div>' +
    ' <hr>' +
    ' </section>';

var plantillaResp =
    '<article>' +
    '<p>__content__</p>' +
    '<p>__author__</p>'+
    '</article>';

var cargarTopic = function () {
    $.getJSON(api.url, function (topic) {
        renderThisTopic(topic);
    });
};

var cargarResponses = function(){
    $.getJSON(api.urlResp, function (responses) {
        responses.forEach(function(response){
            renderThisResponses(response);
        })
        
    });
};



var renderThisTopic = function (topic) {
    var $topicHTML = $("#myTopic")
    var titleTopic = topic.content;
    var authorTopic = topic.author_name;
    var id = topic._id;

    var plantillaFinal = "";

    plantillaFinal += plantilla.replace("__author-topic__", authorTopic).replace("__content__", titleTopic);

    $topicHTML.append(plantillaFinal);
};


var renderThisResponses = function (response) {
    var $containerResponses = $("#myResponses");
    var $respAuthor = response.author_name;
    var $respContent = response.content;
    
    var plantillaFinal ="";
    
    plantillaFinal += plantillaResp.replace("__content__",$respContent).replace("__author__",$respAuthor);
    
    $containerResponses.append(plantillaFinal   )
    
}
var cargarPagina = function () {
    cargarTopic();
    cargarResponses();
   
};

$(document).ready(cargarPagina);
