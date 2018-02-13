<!--
      onerror = showError

         function showError(x, y, z) {

         	 alert(x+" "+y+" "+z)

         } 
          
          var a = -1;

          function time() {
          	  
            if (a < 59) {
                
                a++

                setTimeout("time()", 1000);

                document.getElementById('Time').innerHTML = "Time "+": "+ a;
            
            }
            
             else {

                    alert("Your time is over ")

                   document.getElementById("form").reset();
             
             }          
         } 

-->