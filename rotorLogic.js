function transformLetter(input){
  clearLampBoard();

  rotor1 = rotors[$("#slot1").val()].arr;//gets which rotor is being used
  rotor2 = rotors[$("#slot2").val()].arr;
  rotor3 = rotors[$("#slot3").val()].arr;

  r1Turnover = rotors[$("#slot1").val()].turnover;//gets the turn over points
  r2Turnover = rotors[$("#slot2").val()].turnover;
  r3Turnover = rotors[$("#slot3").val()].turnover;

  rotor1Index = parseInt($( "#slot1Index" ).val());//gets the rotor position
  rotor2Index = parseInt($( "#slot2Index" ).val());
  rotor3Index = parseInt($( "#slot3Index" ).val());


  ringSetting();//gets ring settings

  turnover();//turns rotors

  //gets input letter and adds the position of the first rotor and sends to first rotor
  let inputPosistion = mod(alph.indexOf(input) + rotor1Index, 26);
  $("#r1In").val(alph[inputPosistion])
  $("#r1Out").val(rotor1[inputPosistion])

//gets the output position of the first rotor, subtracts the position of the first rotor and adds the posistion of the second rotor and sends to the second rotor input
  inputPosistion = mod(alph.indexOf(rotor1[inputPosistion]) - rotor1Index + rotor2Index, 26);

  $("#r2In").val(alph[inputPosistion])
  $("#r2Out").val(rotor2[inputPosistion])

  //gets the output position of the second rotor, subtracts the position of the second rotor and adds the posistion of the third rotor and sends to the third rotor input
  inputPosistion = mod(alph.indexOf(rotor2[inputPosistion]) - rotor2Index + rotor3Index, 26);

  $("#r3In").val(alph[inputPosistion])
  $("#r3Out").val(rotor3[inputPosistion])

  //gets the output position of the third rotor, subtracts the position of the third rotor  and sends to the reflector input
  inputPosistion = mod(alph.indexOf(rotor3[inputPosistion]) - rotor3Index, 26);
/////////////////////////REFLECTOR////////////////////////////////////////////////////////////////////
  $("#rIn").val(alph[inputPosistion]);
  $("#rOut").val(reflector[inputPosistion])
  /////////////////////////REFLECTOR////////////////////////////////////////////////////////////////////


  /////////////////////////Rotor 3////////////////////////////////////////////////////////////////////

//gets output of reflector and adds the position of the third rotor
  inputPosistion = mod(alph.indexOf(reflector[inputPosistion]) + rotor3Index, 26);
  $("#r3InBack").val(alph[inputPosistion])

  //gets the "input side" position of the third rotor
  inputPosistion = mod(rotor3.indexOf(alph[inputPosistion]), 26);
  $("#r3OutBack").val(alph[inputPosistion]);

  /////////////////////////Rotor 2////////////////////////////////////////////////////////////////////

//gets the "input side" position of the third rotor subtracts rotor 3 position, adds rotor 2 position and sends to rotor 2 "output side"
  inputPosistion = mod(inputPosistion - rotor3Index + rotor2Index, 26);
  $("#r2InBack").val(alph[inputPosistion])

  //gets the "input side" position of the second rotor subtracts rotor 2 position, adds rotor 1 position and sends to rotor 1 "output side"
  inputPosistion = mod(rotor2.indexOf(alph[inputPosistion]), 26);
  $("#r2OutBack").val(alph[inputPosistion]);




  /////////////////////////Rotor 1////////////////////////////////////////////////////////////////////

  //gets the "input side" position of the second rotor subtracts rotor 2 position, adds rotor 1 position and sends to rotor 1 "output side"
  inputPosistion = mod(inputPosistion - rotor2Index + rotor1Index, 26);
  $("#r1InBack").val(alph[inputPosistion])

  //gets the "input side" position of the first rotor
  inputPosistion = mod(rotor1.indexOf(alph[inputPosistion]), 26);
  $("#r1OutBack").val(alph[inputPosistion]);

  /////////////////////////output////////////////////////////////////////////////////////////////////
//gets the "input side" position of the first rotor and subtracts rotor 1 position
  inputPosistion = mod(inputPosistion - rotor1Index, 26);
  result += plugboardConvert(alph[inputPosistion]);//sends input through plugboard
  $("#output").val(formatCode(result));//4 bock format

  $('#slot1Index').val(rotor1Index % 26);//sets the rotor select boxs
  $('#slot2Index').val(rotor2Index % 26);
  $('#slot3Index').val(rotor3Index % 26);

  $("#lamp" + alph[inputPosistion]).css("background-color", "yellow");//lights up the lamp boad letter
}


function turnover(){


  let r1Pos = alph[$( "#slot1Index" ).val() - 1];//gets current rotor values
  let r2Pos = alph[$( "#slot2Index" ).val() - 1];


  if(r1Pos === r1Turnover){//if current value === turn over point turn rotor 2
    rotor2Index++;
  }

  if(r2Pos === r2Turnover){//same as above with double steeping
    rotor2Index++;
    rotor3Index++;
  }
  rotor1Index++;//turns first rotor
}

function turnoverBack(){//same as above but backwards to enable the use of back space


  let r1Pos = alph[$( "#slot1Index" ).val()];
  let r2Pos = alph[$( "#slot2Index" ).val()];


  if(r1Pos === r1Turnover){
    rotor2Index--;
  }

  if(r2Pos === r2Turnover){
    rotor2Index--;
    rotor3Index--;
  }
  rotor1Index--;
}

function ringSetting(){

  let ringSetting3 = parseInt($("#ringSetting3").val());//gets the values of ring settings
  let ringSetting2 = parseInt($("#ringSetting2").val());
  let ringSetting1 = parseInt($("#ringSetting1").val());

  rotor3 = shiftArray(rotor3, ringSetting3);//shifts arrays according to ring setting
  rotor2 = shiftArray(rotor2, ringSetting2);
  rotor1 = shiftArray(rotor1, ringSetting1);

}

function shiftArray(array, n){

  let result = [];
  let temp = [];

//shifts the values of the array by the ring settings( I.E. if ring setting is on b(+1) A = B, J = K, D = E, K = L)
//if ring setting is on c(+2) A = C, J = L, D = F, K = M
  for (var i = 0; i < array.length; i++) {
    let index = alph.indexOf(array[i])
    temp.push(alph[mod((index + n), 26)]);
  }

  for (var i = 0; i < 26; i++) {//then shifts the order of the array backwards according to the ring setting

    result.push(temp[mod((i - n), 26)]);
  }

  return result;

}
