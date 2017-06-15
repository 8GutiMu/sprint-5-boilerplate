var api = {
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var $topicList = $("#topic-list");

var filterTopics = function (e) {
    e.preventDefault();
    var criterioBusqueda = $("#inputFilter").val().toLowerCase();

//    $.getJSON(api.url, function (topics) {
//         topics.filter(function (topic) {
//            var nuevos = topic.nombre.toLowerCase().indexOf(criterioBusqueda) >= 0;
//            return nuevos;
//        });
//    });

   
    console.log(scontactosFiltrados);
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
    console.log(id)

    //  <tdTopic>Topic <spanAuthor>-por: Bren</span></td>
    //    <tdResponses>Respuestas: <spanCount>0</span></td>


    var $tr = $("<tr />");
    var $tdTopic = $("<td />")
    var $tdResponses = $("<td />")
    var $spanAuthor = $("<span />")
    var $spanCount = $("<span />")

    $tdTopic.text(content);
    $tdResponses.text("Respuestas: ")
    $spanAuthor.text(" -por: " + author_name);
    $spanCount.text(responseConunt);

    $tr.attr("id", id);

    $tdTopic.append($spanAuthor);
    $tdResponses.append($spanCount);

    $tr.append($tdTopic);
    $tr.append($tdResponses);

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
    $("#inputFilter").submit(filterTopics);
};

$(document).ready(cargarPagina);
