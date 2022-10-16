// export DATABASE_URL="postgresql://Bark:gdhF3hKeE5OBWHsJzpRG1A@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dcalhack-3988"

const { lazyrouter } = require("express/lib/application");

function parse(table) {
  //  var table = document.getElementById("example_data");
    var result = [];

    for (var i = 0, row; row = table.rows[i]; i++) {
        result.append(table[i]);
        print(result);
   //iterate through rows
   //rows would be accessed using the "row" variable assigned in the for loop
   //for (var j = 0, col; col = row.cells[j]; j++) {
     //iterate through columns
     //columns would be accessed using the "col" variable assigned in the for loop
   }  
}

    // var lat;
    // var lon;
    // lat = <?php echo json_encode($lat); ?>;
    // lon = <?php echo json_encode($lon); ?>; 