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
