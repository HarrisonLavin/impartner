$(function(){
  $("table").hide(); 
  $('.new_answer').on('submit', function(e){
    e.preventDefault();
    

    var form = $(this);
    var answer = form.parent('div');
    var answer_id = answer.attr("class").match(/\d+/)
    var edit = "<a class='edit-answer "+ answer_id + "' data-remote='true' href='"+ form.attr('action') + "'>Edit Answer</a>";
    var badge = parseInt($("li.list-group-item.active > span").text())

    $.ajax({
      type: "POST", 
      url: form.attr('action'), 
      data: form.serialize(),

      success: function(data){
        if (data.correct) {
          form.remove();
          answer.append(data.content);
          $(answer).parent().parent().toggleClass("panel panel-primary panel panel-success");
          swal("Good job!", "You got the question right!", "success");
          $("li.list-group-item.active > span").text(badge - 1);
        } else if (data.correct == false) {
          form.remove();
          answer.append(data.content);
          $(answer).parent().parent().toggleClass("panel panel-primary panel panel-danger");
          swal("Oops...", "That was incorrect.", "error");
        } else {
          answer.append(data.content);
          answer.append("<a class='edit-answer <%= @answer.id %>' data-remote='true' href='/questions/" + data.question_id + "/answers/" + answer_id + "/edit'>Edit Answer</a>");
          form.remove();
          $(answer).parent().parent().toggleClass("panel panel-primary panel panel-default");
          $("li.list-group-item.active > span").text(badge - 1);
        };
      }, 
      dataType: 'JSON'
    });

  });


  $('div.panel-body > button').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $(this).parent().next().toggle();
  });


  $('.edit_answer > input[type="radio"]').on('click', function(e) {
    e.preventDefault;
    var id = $(this).parent().attr('id');

    $('#' + id + ' > input.btn').val('Update Grade');
  });

});