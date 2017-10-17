

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
let IV = ["E","S","O","V","P","Z","J","A","Y","Q","U","I","R","H","X","L","N","F","T","G","K","D","C","M","W","B"];
let V = ["V", "Z", "B", "R", "G", "I", "T", "Y", "U", "P", "S", "D", "N", "H", "L", "X", "A", "W", "M", "J", "Q", "O", "F", "E", "C", "K"];
let routes = ["r1In", "r1Out", "r2In", "r2Out", "r3In", "r3Out", "rIn", "rOut", "r3InBack", "r3OutBack", "r2InBack", "r2OutBack", "r1InBack", "r1OutBack"];
let elements = ["slot3", "slot3Index", "ringSetting3", "slot2", "slot2Index", "ringSetting2", "slot1", "slot1Index", "ringSetting1"];
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
let result = ""

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
  },
  IV:{
    arr: IV,
    turnover: "J"
  },
  V:{
    arr: V,
    turnover: "Z"
  }
};




$(()=>{


  makeSelectList();
  makeLampBoard();
  makePlugBoard();

  $('#slot1').val("I");
  $('#slot2').val("II");
  $('#slot3').val("III");

  $(window).keydown(function(key) {
    //allows to copy and paste without entering an input
    if ((key.metaKey || key.ctrlKey) && ( key.which === 67 || key.which === 86 || key.which === 90)) {

    }
    else{
      validateKeyPress(key);
    }
  });



  $("#submit").click(()=>{
    decodeMessage();
  });

  $("#reset").click(()=>{
    reset();
  });

  $("#randSettings").click(()=>{
    randSettings()
  });

  $("#getSettings").click(()=>{
    if(validateRotors()){
      $("#settingsIO").val(getSettings);
    }

  });

  $("#setSettings").click(()=>{

    let settings = $("#settingsIO").val();
    let patt = new RegExp(/(\w{1,3}:\d{1,2}:\d{1,3}:){3}(\w?:){20}/g);

    if(settings !== ""){
      if(patt.test(settings)){
        setSettings(settings)
      }
      else{
        alert("Input settings invalid. Please check and reenter");
        $("#settingsIO").val("")
      }
    }
  });

  $(".pbSelect").change(()=>{

    plugboardValidation(document.activeElement);
    dataReset();
  });

  $(".rotor").change(()=>{
    $("#slot1").css("background-color", "white");
    $("#slot2").css("background-color", "white");
    $("#slot3").css("background-color", "white");
  });


  $("#randomPlugboard").click(()=>{
    plugboardRandom();
  });

  $("#input").on('paste',()=> {

  setTimeout(()=> {
    var text = $("#input").val().toUpperCase().replace(/\W+/g, "");

    $("#input").val(formatCode(text))
  }, 100);
  });

  $(".lamp").click((lamp)=>{

    if(!checkPlugBoard()){
      return;
    }
    if(!validateRotors()){
      return;
    }

    playSound();
    let element = lamp.currentTarget.id;

    setTimeout(()=> {
      $("#" + element).css("background-color", "grey")
    }, 20);
    setTimeout(()=> {
      $("#" + element).css("background-color", "white")
    }, 100);

    let temp = $("#input").val().replace(/\W+/g, "");//get text from input
    input = plugboardConvert($("#" + element).val());
    temp += input//add on current key pressed


    $("#input").val(formatCode(temp));
    transformLetter(input);

  });

  $(".dataReset").change(()=>{
    dataReset();
  });




  setSettings();
});



function playSound(){
  new Audio('sounds/click.mp3').play();
}




var mod = function (n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};

function validateRotors(){

  let error = false;
  let errorIndex;
  let r1 = $("#slot1").val();
  let r2 = $("#slot2").val();
  let r3 = $("#slot3").val();

  let arr = [r1, r2, r3];

  arr.forEach((item, index)=>{
    if(arr.indexOf(item) !== -1){

      if(arr.indexOf(item) !== index){
        error = true;
        errorIndex = index;
      }
    }
  });

  if(error){
    alert("Conflicting rotors. Please change a rotor.")
    $("#slot" + (errorIndex + 1)).css("background-color", "red");
    return false;
  }
  return true;
}


function validateKeyPress(key){

  if(!checkPlugBoard()){
    return;
  }
  if(!validateRotors()){
    return;
  }

  if(hasBeenDecoded){
    reset();
    hasBeenDecoded = false;
  }

  if((key.which >= 97 && key.which <= 122) || (key.which >= 65 && key.which <= 90)){
    document.activeElement.blur();//removes focus
    playSound();
    input = key.originalEvent.key.toUpperCase();
    input = plugboardConvert(input);
    inputString += input;
    $("#input").val(formatCode(inputString));
    transformLetter(input);
  }

  if(key.which === 8 || key.which === 46){


    if(result.length > 0){
      clearLampBoard();
      inputString = inputString.substring(0, inputString.length - 1);
      $("#input").val(formatCode(inputString));
      result = result.substring(0, result.length - 1);
      $("#output").val(formatCode(result));

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
      if(i !== " "){
        transformLetter(i);
      }

    })

    hasBeenDecoded = true;
  }


}
function dataReset(){
  $("#input").val("");
  $("#output").val("");
  clearLampBoard();
  inputString = "";
  result = "";
  hasBeenDecoded = false;
  plugboardValues = [];
  saveCookie();
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
  $("#ringSetting3").val("0")
  $("#ringSetting2").val("0")
  $("#ringSetting1").val("0")
  routes.forEach((i)=>{
    $("#" + i).val("");
  });
  inputString = "";
  result = "";
  hasBeenDecoded = false;
  plugboardValuesIn = [];



  plugboardIn.forEach((i, index)=>{
    $("#"+i).val("");
  });

  plugboardOut.forEach((i, index)=>{
    $("#"+i).val("");
  });

  saveCookie();
}


function formatCode(str){


  let result;
  var ret = [];
      var i;
      var len;

      for(i = 0, len = str.length; i < len; i += 4) {
         ret.push(str.substr(i, 4))
      }

      result =  ret.join(" ");
      return result;
}

function getSettings(){
  let settings = ""

  elements.forEach((i)=>{
    settings += $("#" + i).val() + ":";
  });

  plugboardIn.forEach((i)=>{
    settings += $("#" + i).val() + ":";
  });

  plugboardOut.forEach((i)=>{
    settings += $("#" + i).val() + ":";
  });
  return settings;
}

function setSettings(inputSettings){
  let settings;

  if(inputSettings === "" || inputSettings === undefined){
    settings = getCookie();
    if(settings === ""){
      settings = "III:0:0:II:0:0:I:0:0:"
    }
  }
  else{
    settings = inputSettings;
  }


  settings = settings.split(":");
  elements.forEach((i, index)=>{
    $("#" + i).val(settings[index]);
  });


  if(settings.length > 8){

    plugboardIn.forEach((i, index)=>{
      $("#" + i).val(settings[index + 9]);
    });

    plugboardOut.forEach((i, index)=>{
      $("#" + i).val(settings[index + 19]);
    });
  }
}

function saveCookie(){
  setCookie("settings", getSettings(), 30);
}

function getCookie(){
  var name = "settings=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          let temp = c.substring(name.length, c.length);
            return temp;
        }
    }
    return "";
}


function setCookie(cname,cvalue,exdays) {

    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    let temp = cname + "=" + cvalue + ";" + expires + ";path=/";

    document.cookie = temp;
}



function randSettings(){

  let elements = ["slot3Index", "ringSetting3", "slot2Index", "ringSetting2", "slot1Index", "ringSetting1"];

  plugboardRandom();

  let randRotorArr = [];
  let rotorArrLength = 0;

  for (var rotor in rotors) {
      randRotorArr.push(rotor);
      rotorArrLength++;
    }

  for (var i = 0; i < rotorArrLength; i++) {

      let rand = Math.floor(Math.random() * (randRotorArr.length - 0)) + 0;
      $("#slot"+(i + 1)).val(randRotorArr[rand]);
      randRotorArr.splice(rand, 1);
    }

  elements.forEach((i)=>{

    let rand = Math.floor(Math.random() * (26 - 0)) + 0;
    $("#" + i).val(rand);
  });
}
