

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

let rotors = {//object that holds rotor arrays, turn over point and name
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
//***************************************************************
//**                                                           **
//**  setup for program and dom actions                        **
//**                                                           **
//***************************************************************

$(()=>{//jquery on document ready


  makeSelectList();
  makeLampBoard();
  makePlugBoard();

  $('#slot1').val("I");//sets default choosen rotors
  $('#slot2').val("II");
  $('#slot3').val("III");

  $(window).keydown(function(key) {

    if ((key.metaKey || key.ctrlKey) && ( key.which === 67 || key.which === 86 || key.which === 90)) {
      //allows to copy and paste without entering an input
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
    $("#settingsIO").val(getSettings);
  });

  $("#getSettings").click(()=>{
    if(validateRotors()){
      $("#settingsIO").val(getSettings);
    }

  });

  $("#setSettings").click(()=>{

    let settings = $("#settingsIO").val();
    //validates input setting string
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

    if(!checkPlugBoard()){//checks if plugboard settings are valid
      return;
    }
    if(!validateRotors()){//check if rotor selections are valid
      return;
    }

    playSound();
    let element = lamp.currentTarget.id;//click sound

    //mimics button press by making lamp background color go grey for waiting for 20ms the going back to white after 100ms
    setTimeout(()=> {
      $("#" + element).css("background-color", "grey")
    }, 20);
    setTimeout(()=> {
      $("#" + element).css("background-color", "white")
    }, 100);

    let temp = $("#input").val().replace(/\W+/g, "");//get text from input removing all but letters
    input = plugboardConvert($("#" + element).val());//sends the input through the plugboard
    temp += input//add on current key pressed

    $("#input").val(formatCode(temp));//uses the 4 space format
    transformLetter(input);//sends input through the rotors

  });

  $(".dataReset").change(()=>{
    dataReset();
  });

  setSettings();//on document load reads the cookie and sets the settings
});

//***************************************************************
//**                                                           **
//**  reset and validatioins                                   **
//**                                                           **
//***************************************************************

function playSound(){
  new Audio('sounds/click.mp3').play();
}




var mod = function (n, m) {//lets modulas work with negitive numbers
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
    if(arr.indexOf(item) !== -1){//if is in the array

      if(arr.indexOf(item) !== index){//and item is not checking it self
        error = true;//using a boolean because if multiple errors found mulitple alerts would be triggered
        errorIndex = index;//stores the item the error ocurred
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

  if(!checkPlugBoard()){//checks if plugboard is valid
    return;
  }
  if(!validateRotors()){//checks if rotor selection is valid
    return;
  }

  if(hasBeenDecoded){//prevents adding onto a decoded message
    reset();
    hasBeenDecoded = false;
  }
//only accepts a-z and A-Z
  if((key.which >= 97 && key.which <= 122) || (key.which >= 65 && key.which <= 90)){
    document.activeElement.blur();//removes focus
    playSound();//click sound
    input = key.originalEvent.key.toUpperCase();//gets key pressed
    input = plugboardConvert(input);//sends input through plugboard
    inputString += input;//adds input to inputString for displaying
    $("#input").val(formatCode(inputString));//displays string
    transformLetter(input);//sends through rotors
  }

//backspace
  if(key.which === 8 || key.which === 46){


    if(result.length > 0){
      clearLampBoard();
      inputString = inputString.substring(0, inputString.length - 1);//removes last char of input string
      $("#input").val(formatCode(inputString));//displays new string
      result = result.substring(0, result.length - 1);//removes the last char of the output string
      $("#output").val(formatCode(result));//displays new string

      turnoverBack();//turns rotors backwards

      $('#slot1Index').val(mod(rotor1Index, 26));//displays rotor setting
      $('#slot2Index').val(mod(rotor2Index, 26));
      $('#slot3Index').val(mod(rotor3Index, 26));
      $("#lamp" + result[result.length - 1]).css("background-color", "yellow");//displays lamp for last char entered
    }


  }
}

function decodeMessage(){

  if(result.length === 0){
    if(hasBeenDecoded){
      reset();
    }

    $("#output").val("");//clears output

    let message = $("#input").val().split("");//gets input and converts into array

    message.forEach((i)=>{
      if(i !== " "){
        transformLetter(i);
      }
    })

    hasBeenDecoded = true;
  }
}


function dataReset(){//resets inputs and outputs
  $("#input").val("");
  $("#output").val("");
  clearLampBoard();
  inputString = "";
  result = "";
  hasBeenDecoded = false;
  plugboardValues = [];
  $("#settingsIO").val(getSettings);
  saveCookie();
}

function reset(){//resets everthing
  $("#input").val("");
  $("#output").val("");
  clearLampBoard();
  setSettings("III:0:0:II:0:0:I:0:0:::::::::::::::::::::");//sets settings to default

  routes.forEach((i)=>{
    $("#" + i).val("");//clears routes textboxs
  });

  inputString = "";
  result = "";
  hasBeenDecoded = false;
  plugboardValuesIn = [];
  plugboardValuesOut = [];
  $("#settingsIO").val(getSettings);
  saveCookie();
}
function formatCode(str){//4 block spacing

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

function setSettings(inputSettings){//get settings from input settings or from cookie
  let settings;

  if(inputSettings === "" || inputSettings === undefined){//if argument is blank get settings from cookie
    settings = getCookie();
    if(settings === ""){//if no cookie then use this default
      settings = "III:0:0:II:0:0:I:0:0:"
    }
  }
  else{
    settings = inputSettings;//use settings from cookie
  }


  settings = settings.split(":");//sets all rotor settings
  elements.forEach((i, index)=>{
    $("#" + i).val(settings[index]);
  });


  if(settings.length > 8){//if plugboard settings passed inset plugboard as wel

    plugboardIn.forEach((i, index)=>{
      $("#" + i).val(settings[index + 9]);
    });

    plugboardOut.forEach((i, index)=>{
      $("#" + i).val(settings[index + 19]);
    });
  }
}

function saveCookie(){
  setCookie("settings", getSettings(), 30);//save cookie, name of cookie, value and number of days till expires
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

  for (var rotor in rotors) {//gets the arrays from the rotors object
      randRotorArr.push(rotor);
      rotorArrLength++;
    }

  for (var i = 0; i < rotorArrLength; i++) {

      let rand = Math.floor(Math.random() * (randRotorArr.length - 0)) + 0;//random number between 0 and num of rotors
      $("#slot"+(i + 1)).val(randRotorArr[rand]);//sets the rotors
      randRotorArr.splice(rand, 1);//pops the random item from the array so it dosnt get picked again
    }

  elements.forEach((i)=>{

    let rand = Math.floor(Math.random() * (26 - 0)) + 0;
    $("#" + i).val(rand);
  });
}
