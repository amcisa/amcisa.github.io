
riot.tag('itemlist', '<stocklist></stocklist>', function(opts) {
    var itemtableID = "1kMn9JVdaWt3FjlHruaDKzfL2JNqRYwAcn-kn8oNt";
    var userKey = "AIzaSyA-WmxQvSijrHIk6NxcsfE6KKJVexRjYAw";
    var fusiurl = "https://www.googleapis.com/fusiontables/v2/";
    $(document).ready(function(){
      console.log("Rendering all items");
      $.ajax({
        url: constructSQLforURL("SELECT * FROM "+itemtableID),
        type: "GET"
        })
        .done(function(data){
          console.log($("stocklist").html());
        })
    })
    function constructSQLforURL (sqlText){
      return fusiurl+"query?sql="+sqlText+"&key="+userKey;
    }
  
});