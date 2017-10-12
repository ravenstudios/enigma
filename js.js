console.log("enigma");
//
//
// // 1 -EKMFLGDQVZNTOWYHXUSPAIBRCJ
// // 2- AJDKSIRUXBLHWTMCQGZNPYFVOE
// // 3- BDFHJLCPRTXVZNYEIWGAKMUSQO
// //
// // ref- EJMZALYXVBWFCRQUONTSPIKHGD
//
// let s = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
//
// let arr = s.split("");
// console.log(arr);
// console.log(arr.toString());
let rotor1Index = 0;
let rotor2Index = 0;
let rotor3Index = 0;

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
  //$("#r1In").val(alph[mod((inputPosistion + rotor1Index) , 26)])

  inputPosistion = alph.indexOf(rotor1[inputPosistion]) - rotor1Index + rotor2Index;

  $("#r2In").val(alph[inputPosistion])
  $("#r2Out").val(rotor2[inputPosistion])
  //$("#r1Out").val(rotor1[mod((inputPosistion  + rotor1Index) , 26)])

  //inputPosistion = alph.indexOf(rotor1[mod((inputPosistion  + rotor1Index) , 26)]) - rotor1Index;

  // $("#r2In").val(alph[mod(inputPosistion + rotor2Index , 26)])
  // $("#r2Out").val(rotor2[mod((inputPosistion   + rotor2Index) , 26)])

  // inputPosistion = alph.indexOf(rotor2[mod((inputPosistion  + rotor2Index) , 26)]) - rotor2Index;
  //
  // $("#r3In").val(rotor2[mod(inputPosistion + rotor3Index , 26)])
  // $("#r3Out").val(rotor3[mod(inputPosistion, 26)])

  inputPosistion = alph.indexOf(rotor2[inputPosistion]) - rotor2Index + rotor3Index;

  $("#r3In").val(alph[inputPosistion])
  $("#r3Out").val(rotor3[inputPosistion])

  inputPosistion = alph.indexOf(rotor3[inputPosistion]) - rotor3Index;
/////////////////////////REFLECTOR////////////////////////////////////////////////////////////////////
  $("#rIn").val(alph[inputPosistion]);
  $("#rOut").val(reflector[inputPosistion])
  /////////////////////////REFLECTOR////////////////////////////////////////////////////////////////////

  //inputPosistion = alph.indexOf(rotor3[mod((inputPosistion  + rotor3Index) , 26)]) - rotor3Index;
  console.log(inputPosistion);
  //inputPosistion = rotor3.indexOf(reflector[inputPosistion]) + rotor3Index;

  inputPosistion = alph.indexOf(reflector[inputPosistion]) + rotor3Index;
  $("#r3InBack").val(alph[inputPosistion])
  inputPosistion = rotor3.indexOf(reflector[mod(inputPosistion ,26)]) - rotor3Index;
  let temp = alph.indexOf(rotor3[inputPosistion]) - rotor2Index;
  $("#r3OutBack").val(alph[temp]);

  inputPosistion = alph.indexOf(rotor3[inputPosistion]) + rotor2Index;
  $("#r2InBack").val(alph[inputPosistion])
  inputPosistion = rotor2.indexOf(rotor3[mod(inputPosistion ,26)]) - rotor2Index;
   temp = alph.indexOf(rotor2[inputPosistion]) - rotor1Index;
  $("#r2OutBack").val(alph[temp]);






//   $("#r2InBack").val(alph[inputPosistion % 26])
//
//   inputPosistion = rotor2.indexOf(alph[mod(inputPosistion , 26)]) - rotor2Index;
//
//
//
//   $("#r2OutBack").val(alph[inputPosistion % 26])//c
//
//
// inputPosistion = inputPosistion + rotor1Index
//
//
//   $("#r1InBack").val(alph[mod(inputPosistion , 26)])
//
//
//
//   $("#r1OutBack").val(alph[rotor1.indexOf(alph[mod(inputPosistion , 26)])])
let test = rotor1.indexOf(alph[inputPosistion % 26]) - rotor1Index;

test = mod(test, 26);
  //result += alph[rotor1.indexOf(alph[mod(inputPosistion,26)]) - mod(rotor1Index,26)]
result += alph[test];
  $("#output").val(result)
}












function shiftArray(arr, int){

  let result = [];
  arr.forEach((item, index)=>{
    result.push(arr[(int + index)% arr.length])
  });
  //console.log(result);
  return result

}

var mod = function (n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};

//shiftArray(alph, 25);

// shift arrays according to starting position
// run through rotor3Start
// update rotor positions
// start over
