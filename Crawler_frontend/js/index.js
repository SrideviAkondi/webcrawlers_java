jQuery(document).ready(function ($) {
    console.log("test");
    $("button").click(function (e) {
        $("button").attr('disabled',true);
         $("button").css('color','#9E9E9E');
         $("#img1").css('display','block');
        console.log($('#txtURL').val());
        console.log($('#txtKeyword').val());
        $.get("http://localhost:8181/CrawlerService/rest/search/query?url=" + $('#txtURL').val() + "&keyword=" + $('#txtKeyword').val()).done(function (data) {
            testcall(data);
            //console.log(data);
            document.getElementById('rs').innerHTML = "";

        });
        e.preventDefault();
    });




    function testcall(somedata) {
        var newpage = "_blank";
        $.ajax({
            'url': "http://localhost:8983/solr/select/?q=" + $('#txtKeyword').val() + "&wt=json&json.wrf=?&indent=true",
            'success': function (result) {
                 $("button").attr('disabled',false);
                $("button").css('color','#000');
                $("#img1").css('display','none');
                $("#res").css('display','block');
                var seconds = result.responseHeader.QTime / 1000;
                var Parent = document.getElementById('rs');
                var heading = "<div id='search'><h2> Search Results</h2><p>" + result.response.numFound + " Results in " + seconds + " seconds </p></div>"
                var para = document.createElement("P");
                para.innerHTML = heading;
                Parent.appendChild(para);
                for (var i = 0; i < result.response.docs.length; i++) {
                    var text1 = $('#txtKeyword').val();
                    var myRegex = new RegExp(text1, "ig");
                    var content1 = result.response.docs[i].content.replace(myRegex, "<span class='highlight'>" + $('#txtKeyword').val() + "</span>");
                    var thisResult = "<div id='list'><a href=" + result.response.docs[i].url + " target=" + newpage + ">" + result.response.docs[i].title + "</a> <p id='link'>" + result.response.docs[i].url + "</p> <div class='innerText'>" + content1 + "</div> <br></div>";
                    var NewDiv = document.createElement("DIV");
                    NewDiv.innerHTML = thisResult;
                    Parent.appendChild(NewDiv);
                }
            },
            'dataType': 'jsonp',
            'jsonp': 'json.wrf'
        });
    }







    /* function testcall(somedata) {
          $.ajax({
    'url': "http://localhost:8983/solr/select/?q="+ $('#txtKeyword').val() + "&wt=json&json.wrf=?&indent=true",
    'success': function(result) {  var Parent = document.getElementById('rs');
              for (var i = 0; i < result.response.docs.length; i++) {
                  var thisResult = "<b>" + result.response.docs[i].boost + "</b><br>" + result.response.docs[i].title
                      + "<br>" + result.response.docs[i].content + "<br>";
                  var NewDiv = document.createElement("DIV");
                  NewDiv.innerHTML = thisResult;
                  Parent.appendChild(NewDiv);
              }},
    'dataType': 'jsonp',
    'jsonp': 'json.wrf'
      });   
    }  */

    // $(txtURL).val('');
    //  $(txtKeyword).val('');
});

