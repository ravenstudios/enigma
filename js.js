console.log("enigma");

let rotor1Index = 1;
let rotor2Index = 2;
let rotor3Index = 3;

let alph = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let reflector = ["Y", "R", "U", "H", "Q", "S", "L", "D", "P", "X", "N", "G", "O", "K", "M", "I", "E", "B", "F", "Z", "C", "W", "V", "J", "A", "T"];
let rotor1 = ["E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C", "J"];
let rotor2 = ["A", "J", "D", "K", "S", "I", "R", "U", "X", "B", "L", "H", "W", "T", "M", "C", "Q", "G", "Z", "N", "P", "Y", "F", "V", "O", "E"];
let rotor3 =  ["B", "D", "F", "H", "J", "L", "C", "P", "R", "T", "X", "V", "Z", "N", "Y", "E", "I", "W", "G", "A", "K", "M", "U", "S", "Q", "O"];

let result = ""



function transformLetter(){

  let input = $("#input").val().toUpperCase();

  rotor1Index++;

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

}



var mod = function (n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};
