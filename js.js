console.log("enigma");

let rotor1Index;
let rotor2Index;
let rotor3Index;
let lampboardRow1 = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O"];
let lampboardRow2 = ["A", "S", "D", "F", "G", "H", "J", "K"];
let lampboardRow3 = ["P", "Y", "X", "C", "V", "B", "N", "M", "L"];
let plugboardIn = ["0in", "1in", "2in", "3in", "4in", "5in", "6in", "7in", "8in", "9in"];
let plugboardOut = ["0out", "1out", "2out", "3out", "4out", "5out", "6out", "7out", "8out", "9out"];
let alph = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let reflector = ["Y", "R", "U", "H", "Q", "S", "L", "D", "P", "X", "N", "G", "O", "K", "M", "I", "E", "B", "F", "Z", "C", "W", "V", "J", "A", "T"];
let I = ["E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C", "J"];
let II = ["A", "J", "D", "K", "S", "I", "R", "U", "X", "B", "L", "H", "W", "T", "M", "C", "Q", "G", "Z", "N", "P", "Y", "F", "V", "O", "E"];
let III =  ["B", "D", "F", "H", "J", "L", "C", "P", "R", "T", "X", "V", "Z", "N", "Y", "E", "I", "W", "G", "A", "K", "M", "U", "S", "Q", "O"];
let plugboardValues = [];
let rotor1;
let rotor2;
let rotor3;
let r1Turnover;
let r2Turnover;
let r3Turnover;
let plugboardValuesIn = [];
let plugboardValuesOut = [];
let inputString = "";
let hasBeenDecoded = false;
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
  makePlugBoard();

  $('#slot1').val("I");
  $('#slot2').val("II");
  $('#slot3').val("III");

  $(window).keydown(function(key) {
    document.activeElement.blur();//removes focus
  });

  $(window).keyup(function(key) {
    validateKeyPress(key);
  });

  $("#submit").click(()=>{
    decodeMessage();
  });

  $("#reset").click(()=>{
    reset();
  });

  $(".pbSelect").change(()=>{
    plugboardValidation(document.activeElement);
  });
  $("#randomPlugboard").click(()=>{
    plugboardRandom();
  });

});







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

  if(!checkPlugBoard()){
    return;
  }
  if(hasBeenDecoded){
    reset();
    hasBeenDecoded = false;
  }

  if(key.which >= 65 && key.which <= 90){
    input = key.originalEvent.key.toUpperCase();
    input = plugboardConvert(input);
    inputString += input;
    $("#input").val(inputString);
    transformLetter(input);
  }

  if(key.which >= 97 && key.which <= 122){
    input = key.originalEvent.key.toUpperCase();
    input = plugboardConvert(input);
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

function decodeMessage(){

  if(result.length === 0){
    if(hasBeenDecoded){
      reset();

    }
    $("#output").val("");

    let message = $("#input").val().split("");


    message.forEach((i)=>{
      transformLetter(i);
    })

    hasBeenDecoded = true;
  }


}

function reset(){
  $("#input").val("");
  $("#output").val("");
  clearLampBoard();
  $('#slot1Index').val(0);
  $('#slot2Index').val(0);
  $('#slot3Index').val(0);
  $('#slot1').val("I");
  $('#slot2').val("II");
  $('#slot3').val("III");
  inputString = "";
  result = "";
  hasBeenDecoded = false;

  plugboardIn.forEach((i, index)=>{
    $("#"+i).val("");
  });

  plugboardOut.forEach((i, index)=>{
    $("#"+i).val("");
  });

}
