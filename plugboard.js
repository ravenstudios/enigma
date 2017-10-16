function makePlugBoard(){

  let html = "<table><tr>"

  for (var i = 0; i <10; i++) {
    html += "<th>Set " + (i + 1)+ "</th>";
  }

  html += "</tr><tr>";

  for (var i = 0; i < 10; i++) {

    html += "<td><select class=\"pbSelect\" id=\"" + i + "in\">";

    html += "<option value=\"\"> </option>"
    for (var j = 0; j < alph.length; j++) {
      html += "<option value=\""+ alph[j]+"\">"+ alph[j]+"</option>"
    }
    html +="</select></td>";
  }

  html +="</tr><tr>"
  for (var i = 0; i < 10; i++) {

    html += "<td><select class=\"pbSelect\" id=\"" + i + "out\">";

    html += "<option value=\"\"> </option>"
    for (var j = 0; j < alph.length; j++) {
      html += "<option value=\""+ alph[j]+"\">"+ alph[j]+"</option>"
    }
    html +="</select></td>"
  }

  html += "</tr></table>"
  $("#plugboard").append(html);

  plugboardIn.forEach((i, index)=>{
    $("#"+i).val("");
  });

  plugboardOut.forEach((i, index)=>{
    $("#"+i).val("");
  });
}

function plugboardValidation(currentItem){
  plugboardValues = [];
  let pbInVals = [];
  let pbOutVals = [];
  let error = false;
  let errorIndex;


  plugboardIn.forEach((i)=>{

    plugboardValues.push($("#" + i).val());
    plugboardValuesIn.push($("#" + i).val());
  });


  plugboardOut.forEach((i)=>{

    plugboardValues.push($("#" + i).val());
    plugboardValuesOut.push($("#" + i).val());
  });


  plugboardValues.forEach((item, index)=>{
    if(item){
      if(plugboardValues.indexOf(item) !== -1){

        if(plugboardValues.indexOf(item) !== index){
          errorIndex = index;
          error = true;
        }
      }
    }

  });

  if (error) {
    alert("That letter is already being used");
    $("#" + currentItem.id).val("");
    plugboardValues[errorIndex] = "";
  }



}

function checkPlugBoard(){

  let missingConnections = 0;
  plugboardValues.forEach((item)=>{
    if(item === ""){
      missingConnections++;
    }


  });

  if(missingConnections > 0 && missingConnections <= 20){
    alert("Missing connections on plugboard.");
    return false;
  }
  return true;
}

function plugboardRandom(){
  dataReset();
  let pb = [];
  let alphArr = alph.slice(0);


  plugboardIn.forEach((i)=>{
    pb.push(i)
  });


  plugboardOut.forEach((i)=>{
    pb.push(i)
  });

  for (var i = 0; i < pb.length; i++) {

    let rand = Math.floor(Math.random() * (alphArr.length - 0)) + 0;;
    let letter = alphArr[rand];

    alphArr.splice(rand, 1);
    $("#"+pb[i]).val(letter);

  }

  plugboardValidation();

}


function plugboardConvert(input){

  let index;

  index = plugboardValuesIn.indexOf(input);
  if(index !== -1){
    return plugboardValuesOut[index];
  }

  index = plugboardValuesOut.indexOf(input);
  if(index !== -1){
    return plugboardValuesIn[index];
  }


  return input;

}
