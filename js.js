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
let rotor2Start = 0;
let rotor3Start = 0;

let alph = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let reflector = ["Y", "R", "U", "H", "Q", "S", "L", "D", "P", "X", "N", "G", "O", "K", "M", "I", "E", "B", "F", "Z", "C", "W", "V", "J", "A", "T"];
let rotor1 = ["E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C", "J"];
let rotor2 = ["A", "J", "D", "K", "S", "I", "R", "U", "X", "B", "L", "H", "W", "T", "M", "C", "Q", "G", "Z", "N", "P", "Y", "F", "V", "O", "E"];
let rotor3 =  ["B", "D", "F", "H", "J", "L", "C", "P", "R", "T", "X", "V", "Z", "N", "Y", "E", "I", "W", "G", "A", "K", "M", "U", "S", "Q", "O"];

let result = ""



function transformLetter(){
//   rotor1Index ++;
//   shiftArray(rotor1, rotor1Index);
//   shiftArray(rotor2, rotor2Start);
//   shiftArray(rotor3, rotor3Start);
//   let inputKey = document.getElementById('input').value;
//   let rotor1Index = alph.indexOf(inputKey) + rotor1Index;
//   $("#r1In").val(rotor1Index);
//   console.log("inputIndex: " + rotor1Index);
//   console.log("rotor1: " + rotor1[rotor1Index]);
//   let rotor2Index = alph.indexOf(rotor1[rotor1Index]);
//   console.log("rotor2 index: " + rotor2Index);
//   console.log("rotor2: " + rotor2[rotor2Index]);
//   let rotor3Index = alph.indexOf(rotor2[rotor2Index]);
//   console.log("rotor3 index: " + rotor3Index);
//   console.log("rotor3: " + rotor3[rotor3Index]);
//   let reflectorIndex = alph.indexOf(rotor3[rotor3Index]);
//   console.log("reflector: " + reflector[reflectorIndex]);
//   rotor3Index = rotor3.indexOf(reflector[reflectorIndex]);
//   console.log("rotor3Index: " + rotor3Index);
//   console.log("rotor3 letter " + alph[rotor3Index]);
//   rotor2Index = rotor2.indexOf(alph[rotor3Index]);
//   console.log("rotor2Index: " + rotor2Index);
//   console.log("rotor2 letter " + alph[rotor2Index]);
//   rotor1Index = rotor1.indexOf(alph[rotor2Index]);
//   console.log("rotor1Index: " + rotor1Index);
//   console.log("rotor1 letter " + alph[rotor1Index]);
//   let resultLetter = alph[rotor1Index];
//   result += resultLetter;
//   console.log("RESULT LETTER: " + resultLetter);
// document.getElementById("output").value = result;

//get letter pressed
  let input = $("#input").val().toUpperCase();
//rotate rotors
//console.log(rotor1);
  rotor1Index++;
  // console.log(rotor1Index);
  // console.log(rotor1);
//shift arrays
  // rotor1 = shiftArray(rotor1, rotor1Index);
  // shiftArray(rotor2, rotor2Start);
  // shiftArray(rotor3, rotor3Start);
//get pin posisiton of input
  let inputPosistion = alph.indexOf(input);
  console.log("step 1: " + inputPosistion);
  //console.log(inputPosistion);
  $("#r1In").val(alph[(inputPosistion + rotor1Index) % 26])
  $("#r1Out").val(rotor1[(inputPosistion  + rotor1Index) % 26])

inputPosistion = alph.indexOf(rotor1[mod((inputPosistion  + rotor1Index) , 26)]) - rotor1Index;
console.log("step 2: " + inputPosistion);
  $("#r2In").val(alph[inputPosistion % 26])


  $("#r2Out").val(rotor2[(inputPosistion   + rotor1Index) % 26])

  $("#r3In").val(rotor2[inputPosistion % 26])
  inputPosistion = alph.indexOf(rotor2[mod(inputPosistion , 26)]);//e
  console.log("step 3: " + inputPosistion);
  $("#r3Out").val(rotor3[inputPosistion])

  $("#rIn").val(rotor3[inputPosistion % 26])
  inputPosistion = alph.indexOf(rotor3[mod(inputPosistion , 26)]);//e
  console.log("step 4: " + inputPosistion);
  $("#rOut").val(reflector[inputPosistion % 26])

  $("#r3InBack").val(reflector[inputPosistion% 26])
  inputPosistion = rotor3.indexOf(reflector[mod(inputPosistion ,26)]);//e
  console.log("step 5: " + inputPosistion);
  $("#r3OutBack").val(alph[inputPosistion])

  $("#r2InBack").val(alph[inputPosistion % 26])
  inputPosistion = rotor2.indexOf(alph[mod(inputPosistion , 26)]);//e
  console.log("step 6: " + inputPosistion);
  $("#r2OutBack").val(alph[inputPosistion % 26])//c


inputPosistion = inputPosistion + rotor1Index
console.log("step 7: " + inputPosistion);
  $("#r1InBack").val(alph[inputPosistion % 26])

  // console.log(inputPosistion);
  // console.log(alph[inputPosistion]);

  $("#r1OutBack").val(alph[rotor1.indexOf(alph[inputPosistion % 26])])
  console.log("inputPosistion: " + inputPosistion % 26);
let test = rotor1.indexOf(alph[inputPosistion % 26]) - rotor1Index;
console.log("test: " + test);
test = mod(test, 26);
console.log("test after mod: " + test);
console.log("result pos: " + (rotor1.indexOf(alph[inputPosistion % 26]) - rotor1Index));
  //result += alph[rotor1.indexOf(alph[mod(inputPosistion,26)]) - mod(rotor1Index,26)]
result += alph[test];
  console.log("step 8: " + inputPosistion);
  $("#output").val(result)
}
////////////////works nned to fix out of bounds with %mod
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
