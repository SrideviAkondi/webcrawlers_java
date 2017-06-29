$.getJSON("http://localhost:8983/solr/select/?q=Aslam&wt=json&json.wrf=?&indent=true", function(result){
    var Parent = document.getElementById('rs');
    for (var i = 0; i < result.response.docs.length; i++) {
      var thisResult = "<b>" + result.response.docs[i].boost + "</b><br>" + result.response.docs[i].title
      + ", " + result.response.docs[i].content + "<br>";
      var NewDiv = document.createElement("DIV");
      NewDiv.innerHTML = thisResult;
      Parent.appendChild(NewDiv);
    }
  });