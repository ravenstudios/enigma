console.log("enigma");

let rotor1Index;
let rotor2Index;
let rotor3Index;
let lampboardRow1 = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O"];
let lampboardRow2 = ["A", "S", "D", "F", "G", "H", "J", "K"];
let lampboardRow3 = ["P", "Y", "X", "C", "V", "B", "N", "M", "L"];

let alph = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let reflector = ["Y", "R", "U", "H", "Q", "S", "L", "D", "P", "X", "N", "G", "O", "K", "M", "I", "E", "B", "F", "Z", "C", "W", "V", "J", "A", "T"];
let I = ["E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C", "J"];
let II = ["A", "J", "D", "K", "S", "I", "R", "U", "X", "B", "L", "H", "W", "T", "M", "C", "Q", "G", "Z", "N", "P", "Y", "F", "V", "O", "E"];
let III =  ["B", "D", "F", "H", "J", "L", "C", "P", "R", "T", "X", "V", "Z", "N", "Y", "E", "I", "W", "G", "A", "K", "M", "U", "S", "Q", "O"];
let rotor1;
let rotor2;
let rotor3;
let r1Turnover;
let r2Turnover;
let r3Turnover;

let inputString = "";

let rotors = {
  I:{
    arr: I,
    turnover: "Q"
  },
  II:{
    arr: II,
    turnover: "E"
  },
  III:{
    arr: III,
    turnover: "V"
  }
};


let result = ""

$(()=>{
  console.log("j querry");

  makeSelectList();
  makeLampBoard();
  $('#slot1').val("I");
  $('#slot2').val("II");
  $('#slot3').val("III");

  $(window).keyup(function(key) {
    validateKeyPress(key);
    // console.log(key.originalEvent.key);
    // console.log(key.which);
    // let input = key.originalEvent.key.toUpperCase()
    // inputString += input;
    // $("#input").val(inputString);
    // transformLetter(input)
  });


});



function transformLetter(input){
  clearLampBoard();
  rotor1 = rotors[$("#slot1").val()].arr;
  rotor2 = rotors[$("#slot2").val()].arr;
  rotor3 = rotors[$("#slot3").val()].arr;
  r1Turnover = rotors[$("#slot1").val()].turnover;
  r2Turnover = rotors[$("#slot2").val()].turnover;
  r3Turnover = rotors[$("#slot3").val()].turnover;

  rotor1Index = parseInt($( "#slot1Index" ).val());
  rotor2Index = parseInt($( "#slot2Index" ).val());
  rotor3Index = parseInt($( "#slot3Index" ).val());


  //let input = $("#input").val().toUpperCase();

  //rotor1Index++;
  turnover();

  let inputPosistion = mod(alph.indexOf(input) + rotor1Index, 26);
  $("#r1In").val(alph[inputPosistion])
  $("#r1Out").val(rotor1[inputPosistion])

  inputPosistion = mod(alph.indexOf(rotor1[inputPosistion]) - rotor1Index + rotor2Index, 26);

  $("#r2In").val(alph[inputPosistion])
  $("#r2Out").val(rotor2[inputPosistion])


  inputPosistion = mod(alph.indexOf(rotor2[inputPosistion]) - rotor2Index + rotor3Index, 26);

  $("#r3In").val(alph[inputPosistion])
  $("#r3Out").val(rotor3[inputPosistion])

  inputPosistion = mod(alph.indexOf(rotor3[inputPosistion]) - rotor3Index, 26);
/////////////////////////REFLECTOR////////////////////////////////////////////////////////////////////
  $("#rIn").val(alph[inputPosistion]);
  $("#rOut").val(reflector[inputPosistion])
  /////////////////////////REFLECTOR////////////////////////////////////////////////////////////////////


  /////////////////////////Rotor 3////////////////////////////////////////////////////////////////////

  inputPosistion = mod(alph.indexOf(reflector[inputPosistion]) + rotor3Index, 26);
  $("#r3InBack").val(alph[inputPosistion])
  inputPosistion = mod(rotor3.indexOf(alph[inputPosistion]), 26);
  $("#r3OutBack").val(alph[inputPosistion]);

  /////////////////////////Rotor 2////////////////////////////////////////////////////////////////////

  inputPosistion = mod(inputPosistion - rotor3Index + rotor2Index, 26);
  $("#r2InBack").val(alph[inputPosistion])
  inputPosistion = mod(rotor2.indexOf(alph[inputPosistion]), 26);
  $("#r2OutBack").val(alph[inputPosistion]);




  /////////////////////////Rotor 1////////////////////////////////////////////////////////////////////

  inputPosistion = mod(inputPosistion - rotor2Index + rotor1Index, 26);
  $("#r1InBack").val(alph[inputPosistion])
  inputPosistion = mod(rotor1.indexOf(alph[inputPosistion]), 26);
  $("#r1OutBack").val(alph[inputPosistion]);

  /////////////////////////output////////////////////////////////////////////////////////////////////

  inputPosistion = mod(inputPosistion - rotor1Index, 26);
  result += alph[inputPosistion];
  $("#output").val(result)

  $('#slot1Index').val(rotor1Index % 26);
  $('#slot2Index').val(rotor2Index % 26);
  $('#slot3Index').val(rotor3Index % 26);

  $("#lamp" + alph[inputPosistion]).css("background-color", "yellow");
}



var mod = function (n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};


function makeSelectList(){



  for (var i = 0; i < 26; i++) {

    $('#slot1Index').append($('<option>', {
      value: i,
      text:  alph[i] + " " + (i + 1)
    }));

    $('#slot2Index').append($('<option>', {
      value: i,
      text:  alph[i] + " " + (i + 1)
    }));

    $('#slot3Index').append($('<option>', {
      value: i,
      text:  alph[i] + " " + (i + 1)
    }));
  }
}

function turnover(){


  let r1Pos = alph[$( "#slot1Index" ).val()];
  let r2Pos = alph[$( "#slot2Index" ).val()];
  //let r3Pos = alph[$( "#slot1Index" ).val()];

  if(r1Pos === r1Turnover){
    rotor2Index++;
  }

  if(r1Pos === r1Turnover && r2Pos === r2Turnover){
    rotor3Index++;
  }
  rotor1Index++;
}

function turnoverBack(){


  let r1Pos = alph[$( "#slot1Index" ).val() - 1];
  let r2Pos = alph[$( "#slot2Index" ).val() - 1];
  //let r3Pos = alph[$( "#slot1Index" ).val()];

  if(r1Pos === r1Turnover){
    rotor2Index--;
  }

  if(r1Pos === r1Turnover && r2Pos === r2Turnover){
    rotor3Index--;
  }
  rotor1Index--;
}

function clearLampBoard(){
  for (var i = 0; i < 26; i++) {
    let l = alph[i];
      $("#lamp" + l).css("background-color", "white");
    }
}
function makeLampBoard(){
  let html = "<table><tr>";
  lampboardRow1.forEach((i)=>{

    html +="<td><input class=\"lamp\" type=\"text\" id=\"lamp" + i +"\" value=\"" +i +"\"readonly></td>";


  });
  html += "</tr>";
  html += "<tr>";
  lampboardRow2.forEach((i)=>{

    html += "<td><input style=\"margin-left: 50%\" class=\"lamp\" type=\"text\" id=\"lamp" + i +"\" value=\"" +i +"\"readonly></td>";

  });
  html += "</tr>";
  html += "<tr>";


  lampboardRow3.forEach((i)=>{

    html += "<td><input class=\"lamp\" type=\"text\" id=\"lamp" + i +"\" value=\"" +i +"\"readonly></td>";
  });

  html += "</tr></table>"
  $("#lampboard").append(html);
}

function validateKeyPress(key){

  // console.log(key.originalEvent.key);
  // console.log(key.which);
  // let input = key.originalEvent.key.toUpperCase()
  // inputString += input;
  // $("#input").val(inputString);
  // transformLetter(input)

  if(key.which >= 65 && key.which <= 90){
    input = key.originalEvent.key.toUpperCase();
    inputString += input;
    $("#input").val(inputString);
    transformLetter(input);
  }

  if(key.which >= 97 && key.which <= 122){
    input = key.originalEvent.key.toUpperCase();
    inputString += input;
    $("#input").val(inputString);
    transformLetter(input);
  }

  if(key.which === 8 || key.which === 46){


    if(result.length > 0){
      clearLampBoard();
      inputString = inputString.substring(0, inputString.length - 1);
      $("#input").val(inputString);
      result = result.substring(0, result.length - 1);
      $("#output").val(result)

      turnoverBack();

      $('#slot1Index').val(rotor1Index % 26);
      $('#slot2Index').val(rotor2Index % 26);
      $('#slot3Index').val(rotor3Index % 26);
      $("#lamp" + result[result.length - 1]).css("background-color", "yellow");
    }


  }
}
