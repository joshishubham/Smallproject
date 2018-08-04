  var a = -1; 

function time() {
    
  if (a < 59) {
      
      a++

      setTimeout("time()", 1000);

      document.getElementById('Time').innerHTML = "Time "+": "+ a;
  
  }

  else if (a == 59) {

        var form = document.getElementById('form');
        var elements = form.elements;

          for (var i = 0; i < form.length; i++) {
                        
                        form[i].disabled = true;
          }


        alert("Your time is over");    
  }
}
