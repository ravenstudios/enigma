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

  plugboardIn.forEach((i, index)=>{//gets values from select input row of plugboard
    $("#"+i).val("");
  });

  plugboardOut.forEach((i, index)=>{//gets values from select output row of plugboard
    $("#"+i).val("");
  });
}

function plugboardValidation(currentItem){
  plugboardValuesIn = [];
  plugboardValuesOut = [];
  plugboardValues = [];
  let pbInVals = [];
  let pbOutVals = [];
  let error = false;//uses this to show error or multiple alerts would show
  let errorIndex;

  plugboardIn.forEach((i)=>{

    plugboardValues.push($("#" + i).val());//sets an array with all values to use for validation
    plugboardValuesIn.push($("#" + i).val());//gets the values from the input row
  });


  plugboardOut.forEach((i)=>{

    plugboardValues.push($("#" + i).val());//sets an array with all values to use for validation
    plugboardValuesOut.push($("#" + i).val());//gets the values from the output row
  });




  plugboardValues.forEach((item, index)=>{
    if(item){// !== ""
      if(plugboardValues.indexOf(item) !== -1){//if item is in the array

        if(plugboardValues.indexOf(item) !== index){//and item is not checking itself then it must have a duplicate
          errorIndex = index;//sets item that caused the error
          error = true;//uses this to show error or multiple alerts would show
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
  plugboardValues.forEach((item)=>{//loops through all plugbord select boxs and checks for any missing
    if(item === ""){
      missingConnections++;
    }


  });
//if missing 1 or more settings but not all the error shown. All missing is ok
  if(missingConnections > 0 && missingConnections <= 20){
    alert("Missing connections on plugboard.");
    return false;
  }
  return true;
}

function plugboardRandom(){

  let pb = [];
  let alphArr = alph.slice(0);


  plugboardIn.forEach((i)=>{//textboxs ids
    pb.push(i)
  });


  plugboardOut.forEach((i)=>{//textboxs ids
    pb.push(i)
  });

  for (var i = 0; i < pb.length; i++) {

    let rand = Math.floor(Math.random() * (alphArr.length - 0)) + 0;;
    let letter = alphArr[rand];

    alphArr.splice(rand, 1);
    $("#"+pb[i]).val(letter);//displays on plugboard textbox

  }

  plugboardValidation();
  dataReset();
}


function plugboardConvert(input){

  let index;

//checks if input is in this array then returns output value from same index of output array
  index = plugboardValuesIn.indexOf(input);
  if(index !== -1){
    return plugboardValuesOut[index];
  }
//checks if input is in this array then returns output value from same index of input array
  index = plugboardValuesOut.indexOf(input);
  if(index !== -1){
    return plugboardValuesIn[index];
  }


  return input;

}
