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

  for (var i = 0; i < 26; i++) {

    $('#ringSetting3').append($('<option>', {
      value: i,
      text:  i
    }));

    $('#ringSetting2').append($('<option>', {
      value: i,
      text:  i
    }));

    $('#ringSetting1').append($('<option>', {
      value: i,
      text:  i
    }));
  }
}
