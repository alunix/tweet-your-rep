function displayResults(result) {
  $( "#results" ).fadeOut(function() {
    $( "#results" ).html(result);
  });
  $( "#results" ).fadeIn();
}

$('#parse-address').click(function(e){
  e.preventDefault();
  var input_address = encodeURIComponent($('#input-address').val())
  if (input_address != "") {
    $.get(('http://tweet-your-rep.datamade.us/api/?address=' + input_address), 
      function(resp){
        // console.log(resp);

        var rows = '';
        var csv1 = []
        var csv2 = []
        $.each(resp['result'], function(i, data){
          csv1.push(data['tag']);
          csv2.push(data['value'])
          rows += "\
          <tr>\
            <td>" + data['value'] + "</td>\
            <td>" + data['tag'] + "</td>\
          </tr>\
          "
        });

        var csv = '"' + csv1.join('","') + '"\n"' + csv2.join('","') + '"';

        var result = "\
          <p>Parsing results: </p>\
          <table class='table table-bordered'>\
            <thead>\
              <tr>\
                <th>Address part</th>\
                <th>Tag</th>\
              </tr>\
            </thead>\
            <tbody>\
              " + rows + "\
            </tbody>\
          </table>\
          <p>Results in CSV format:</p>\
          <p>\
            <textarea class='csv-results' rows='4'>" + csv + "</textarea>\
          </p>\
          <p>Does this look wrong? <a href='https://github.com/datamade/us-address-parser/issues/new'>Let us know by reporting an issue on GitHub</a>.</p>";
        displayResults( result );
        
      }
    ).fail(function() {
      displayResults( "<strong>Error parsing that address</strong>.");
    });
  }
  else {
    displayResults( "<strong>Please provide an address to parse</strong>." );
  }
});