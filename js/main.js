var api = {
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};
var $topicList = $("#topic-list");
var topicsArray = [];

($.getJSON(api.url, function (topics) {
    topics.forEach(function (topic) {
        topicsArray.push(topic)
    })
}))

var filterTopics = function (e) {
    e.preventDefault();
    var searchTopic = $("#inputFilter").val().toLowerCase();



    var topicsFilterNew = topicsArray.filter(function (topic) {
        var brandNew = topic.content.toLowerCase().indexOf(searchTopic) >= 0;
        return brandNew;
    })

    console.log(topicsFilterNew)
    renderTopic(topicsFilterNew);

};

var showForm = function () {
    $("#topic-form").attr("class", "show-form");
};

var cargarTopics = function () {
    $.getJSON(api.url, function (topic) {
        topic.forEach(renderTopic)
    });
};

var renderTopic = function (topic) {
    var author_name = topic.author_name;
    var content = topic.content;
    var responseConunt = topic.responses_count;
    var id = topic.id;

    var $tr = $("<tr />");
    var $tdTopic = $("<td />");
    var $tdResponses = $("<td />");
    var $spanAuthor = $("<span />");
    var $spanCount = $("<span />");
    var $link = $("<a />");
    
    $tdTopic.text(content);
    $tdResponses.text("Respuestas: ")
    $spanAuthor.text(" -por: " + author_name);
    $spanCount.text(responseConunt);

    $tr.attr("id", id);
    $link.attr("href", "verTopic.html?topic_id="+id);

    $tdTopic.append($spanAuthor);
    $tdResponses.append($spanCount);
    

    $tr.append($link);
    $tr.append($tdResponses);
    $tr.attr("class", "topic-list-item");
    
    $link.append($tdTopic);
    $topicList.append($tr);
}

var addTopic = function (event) {
    event.preventDefault();

    var authorName = $("#author_name").val();
    var topicContent = $("#topic_content").val();


    $.post(api.url, {
        author_name: authorName,
        content: topicContent,
    }, function (topic) {
        renderTopic(topic);
        $("#author_name").text("");
        $("topic_content").empty;
        $("#topic-form").removeAttr("class", "show-form");
        $("#topic-form").attr("class", "hide-form");
    });

};


var cargarPagina = function () {
    cargarTopics();
    $("#topics-form").submit(addTopic);
    $("#createBtn").click(showForm);
    $("#inputFilter").keyup(filterTopics);
};

$(document).ready(cargarPagina);
