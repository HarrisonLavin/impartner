// var listing;
// var fact;

// $(function(){
//   $.getJSON("https://www.reddit.com/r/funfacts/random.json", function(data){
//     listing = data[0].data.children[0].data;
//     fact = listing.data.title
//     debugger; 
//   })

//   $(document).ajaxSuccess(function(){
//     $()
//   })
// })

$(function(){
  $('.random-fact button').on("click", function(){
    $.ajax({
      url: "/factoids",
      method: "GET"
    })
    // $('.random-fact button').replaceWith("<h3>Loading Fact...</h3>")
    $('.random-fact button').prop( "disabled", true );
    $('.random-fact button').html("<img width= '50' src='http://sampson.washcoll.edu/~ksugalski2/final%20project/images/squid3.gif'>")
  })

  $(document).ajaxSuccess(function(event, request, options, data){
    var url= "<p><a href=" + data.url +">Learn More Here!</a></p>"
    $('.random-fact button').text(data.title)
    $('.random-fact button').append(url)
  })
})