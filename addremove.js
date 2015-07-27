window.onload = init;

function init(){
    var addButton = document.getElementById("addButton");
    addButton.onclick = addItem;

    var removeButton = document.getElementById("removeButton");
    removeButton.onclick = removeItem;

    var clearButton = document.getElementById("clearButton");
    clearButton.onclick = clearItem;

    for(var key in localStorage){
        attItemToDOM(key,localStorage[key]);
    }
    window.addEventListener("storage","storageChanged",false);
}

var addItem = function addItem(e){
    var key = document.getElementById("key").value;
    var value = document.getElementById("value").value;
    // 檢查是否重覆
    if (localStorage.getItem(key)){
        alert('key值不得重覆');
    }else{
        localStorage.setItem(key, value);
        attItemToDOM(key,value); // show在畫面上
    }
};


var attItemToDOM = function(key, value) {
    var items = document.getElementById("items");
    var item = document.createElement("li");
    item.setAttribute("id", key);
    var span = document.createElement("span");
    span.setAttribute("class", "note");
    span.innerHTML = key + ":" + value;
    item.appendChild(span);

    //var keyModify   = "<input type='text' id='keyModify_"+key+"' value='"+key+"'  />";
    //var valueModify = "<input type='text' id='valueModify_"+value+"' value='"+key+"'  />";

    //item.appendChild(addModifyElement(key, value));
    items.appendChild(item);
};



var removeItem = function(e){
    var key = document.getElementById("key").value;
    var value = document.getElementById("value").value;
    localStorage.removeItem(key); // localStorage內建，不用宣告
    removeItemFromDom(key);
};

var removeItemFromDom = function(key){
    var item = document.getElementById(key);
    item.parentNode.removeChild(item);
};

var clearItem = function(){
    localStorage.clear();
    clearItemFromDom();

};

var clearItemFromDom = function(key){
    var itemList = document.getElementById("items");
    var items = itemList.childNodes; // 一陣列
    for (var i=items.length-1;i>=0;i--){ // 反向(從最尾端開始刪!)
        itemList.removeChild(items[i]);
    }
};
