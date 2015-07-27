 $.fn.getStickiesArray = function(){
        var stickiesArry = localStorage.getItem("stickiesArry"); // get 字串
        if (!stickiesArry){ // 如果不存在,create陣列
            stickiesArry =[];
            localStorage.setItem("stickiesArry", JSON.stringify(stickiesArry)); // localStorage.setItem(string, string)
        }else{
            stickiesArry = JSON.parse(stickiesArry); // Str轉成array
        }
        return stickiesArry;
    };

    $.fn.addStickDome = function(key, value) {
        /*
        var newLi = "<li id='"+key+"''><span class='sticky'>"+value+"</span></li>";
         $("#stickies").append(newLi);
         */
        var sticky = $("<li></li>");
        sticky.prop("id",key);
        
        var span = $("<span></span>");
        span.prop("class","sticky");
        span.prop("innerHTML",value);
        sticky.append(span);

        $("#stickies").append(sticky);
    };

    $(document).ready(function(){
        // show all notes
        var stickiesArry = $.fn.getStickiesArray();
        for (var i=0;i<stickiesArry.length;i++){
            var key = stickiesArry[i];
            var value = localStorage[key];
            $.fn.addStickDome(key, value); 
        }

        // 點選新增button
        $("#add_button").click(function(){
            // step 1:get key array or create
            var stickiesArry = $.fn.getStickiesArray();

            // step 2:create new note's key and value
            var currentDate = new Date(); // 日期物件(創造唯一值)
            var key = "stick_" + currentDate.getTime();
            var value = $("#note_text").val();
            localStorage.setItem(key, value); // add to localStorage

            // step 3:add key to "stickiesArry"
            stickiesArry.push(key);
            localStorage.setItem("stickiesArry", JSON.stringify(stickiesArry));

            // step 4:change view
            $.fn.addStickDome(key, value); // show在畫面上
        });

        // double click stick
        // ".on" for jQuery 1.7+ ,replacement .live()
        $(document).on("dblclick","#stickies li", function(){
            // step 1:get key
            var key = $(this).prop("id");
          
            // step 2:remove from localStorage
            localStorage.removeItem(key);

            // step 3:remove key from "stickiesArry"
            var stickiesArry = $.fn.getStickiesArray();
            stickiesArry = jQuery.grep(stickiesArry,function(i){
                return (i!==key);
            });
            localStorage.setItem("stickiesArry", JSON.stringify(stickiesArry));

            // step 4:change view
            $(this).remove(); // when double click
        });
    });