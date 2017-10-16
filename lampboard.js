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
