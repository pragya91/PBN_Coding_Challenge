(function(){

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          rollUpData(JSON.parse(this.responseText));
      }
  };
  xmlhttp.open("GET", "graph_data.json", true);
  xmlhttp.send();

 let rollUpData = function(input){
   input = input.values;
   let output = [];
   let insert_pos = 0;
   let compressionMap = new Map();
   for(let obj of input){
     let key  = obj.paytype_id+"_"+obj.date;
     if(compressionMap.has(key)){
       let pos = compressionMap.get(key);
       output[pos].amount += obj.amount;
     }else{
       let newObj = {};
       newObj.paytype_id = obj.paytype_id;
       newObj.date = obj.date;
       newObj.amount = obj.amount;
       output.push(newObj);
       compressionMap.set(key,insert_pos); //saving the position of the object in output
       insert_pos++;
     }
   }
   console.log(output);
 }

})();
