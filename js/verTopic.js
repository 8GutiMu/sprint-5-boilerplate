var topicId = getParameterByName('topic_id');

var api = {
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/' + topicId,
    urlResp: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/' + topicId + '/responses',
}

var plantilla =
    '<section class="container">' +
    '<div class="row">' +
    '<h1>Por: __author-topic__</h1>' +
    ' </div>' +
    ' <div class="row"> <h2>__content__</h2>' +
    '</div>' +
    ' <hr>' +
    ' </section>';

var plantillaResp =
    '<article class="container">' +
    '<p>__content__</p>' +
    '<p>__author__</p>' +
    '</article>' +
    '<hr>';

var cargarTopic = function () {
    $.getJSON(api.url, function (topic) {
        renderThisTopic(topic);
    });
};

var cargarResponses = function () {
    $.getJSON(api.urlResp, function (responses) {
        responses.forEach(function (response) {
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

    var plantillaFinal = "";

    plantillaFinal += plantillaResp.replace("__content__", $respContent).replace("__author__", $respAuthor);

    $containerResponses.append(plantillaFinal)

}

var showResponseForm = function () {
    var $responseForm = $("#response-form");
    $responseForm.removeAttr("class", "hide-form");
    $responseForm.attr("class", "show-form");
}

var addResponse = function (e) {
    e.preventDefault();

    var respAuthorName = $("#authorResponse").val();
    var respContent = $("#contentResponse").val();

    $.post(api.urlResp, {
        author_name: respAuthorName,
        content: respContent,
    }, function (topic) {
        renderThisResponses(topic);
    });


    var $responseForm = $("#response-form");
    $responseForm.removeAttr("class", "show-form");
    $responseForm.attr("class", "hide-form");
}
var cargarPagina = function () {
    cargarTopic();
    cargarResponses();
    $("#addResponse").click(showResponseForm);
    $("#response-form").submit(addResponse)
};

$(document).ready(cargarPagina);
