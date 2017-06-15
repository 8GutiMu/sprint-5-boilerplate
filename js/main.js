var api = {
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var $topicList = $("#topic-list");

var cargarPagina = function(){
    cargarTopics();
};

var cargarTopics = function(){
    $.getJSON(api.url, function(topic){
        topic.forEach(renderTopic)
    });
};

var renderTopic = function(topic){
    var author_name = topic.author_name;
    var content = topic.content;
    
    console.log(author_name,"++",content)
}

$(document).ready(cargarPagina);