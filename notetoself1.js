window.onload = init;

function init(){
	var addButton = document.getElementById("add_button");
	add_button.onclick = createSticky;

	//window.addEventListener("storage","storageChanged",false); // 一定要寫嗎
	
	var stickiesArry = getStickiesArray();

	for (var i=0;i<stickiesArry.length;i++){
		var key = stickiesArry[i];
		var value = localStorage[key];
		addStickDome(key,value);
	}
}

var getStickiesArray = function(){
	var stickiesArry = localStorage.getItem("stickiesArry"); // 得一字串
	if (!stickiesArry){ // 如果不存在,create 一陣子 (網頁第一次load時)
		stickiesArry =[];
		localStorage.setItem("stickiesArry", JSON.stringify(stickiesArry)); // localStorage.setItem(string, string)
	}else{
		stickiesArry = JSON.parse(stickiesArry); // 字串轉成陣列
	}
	return stickiesArry;
};

var createSticky = function(){
	/*
	var stickiesArry = localStorage.getItem("stickiesArry"); // 得一字串
	if (!stickiesArry){ // 如果不存在,create 一陣子 (網頁第一次load時)
		stickiesArry =[];
		localStorage.setItem("stickiesArry", JSON.stringify(stickiesArry)); // localStorage.setItem(string, string)
	}else{
		stickiesArry = JSON.parse(stickiesArry); // 字串轉成陣列
	}
	*/
	var stickiesArry = getStickiesArray();

	var currentDate = new Date(); // 日期物件(創造唯一值)
	var key = "stick_" + currentDate.getTime();
	var value = document.getElementById("note_text").value;
	localStorage.setItem(key, value);

	// update key
	stickiesArry.push(key);
	localStorage.setItem("stickiesArry", JSON.stringify(stickiesArry));

	addStickDome(key, value); // show在畫面上
};


var addStickDome = function(key, value) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    sticky.setAttribute("id", key);
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = value; // 顯示value就好
    sticky.appendChild(span);
    stickies.appendChild(sticky);

    sticky.onclick = deleteSticky; 
};

var deleteSticky = function(e){
	// step 1
	var key = e.target.id;
	if(e.target.tagName.toLowerCase=="span"){
		key = e.target.parentNode.id;
	}
	localStorage.removeItem(key);

	// step 2
	// rest 
	var stickiesArry = getStickiesArray();
	if (stickiesArry){
		for(var i=0;i<stickiesArry.length;i++){
			if (key==stickiesArry[i]){
				stickiesArry.splice(i,1); // .splice(position, number of items)
			}
		}
	}
	localStorage.setItem("stickiesArry", JSON.stringify(stickiesArry));

	// Step 3
	removeStickyFromDom(key);

};

var removeStickyFromDom = function(key){
 	var item = document.getElementById(key);
 	item.parentNode.removeChild(item);
 	//item.remove(); 點選<span></span>無法work
};
