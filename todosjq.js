var n = 0;
	var x = 0;
	var a = 0;
	var newData = "";
	var activities = {};
	
var butChk = createButton ("butChk", "buttonCheck", "buttonChk", "\u02C5", 
    butChkEvent);
	$("#inputinitial").append(butChk);
	$(butChk).css("display", "none");

var butAll = createButton("butAll", "buttonAll", "controlbut", "All", 
    butAllEvent);
	
var butAct = createButton("butAct", "buttonActive", "controlbut", "Active", 
    butActEvent);
	
var butComp = createButton("butComp", "buttonCompleted", "controlbut", 
    "Completed", butCompEvent);
	
var butClr = createButton("butClr", "buttonClear", "controlbut", 
    "Clear completed", butClrEvent);
	$(butClr).css("display", "none");
	
    $("#numbact").css("display", "none");

function createButton (name, id, className, innerHTML, funct) {
	name = document.createElement("button");
	name.id = id;
	name.className = className;
	name.innerHTML = innerHTML;
	name.addEventListener("click", funct);
	return name;
};

function butChkEvent () {
	var chkchk = false;
	for (i=0; i<n; i++) {
	    if ($(".checkbx")[i].checked === false) {
	        chkchk = true;
		};
	};	
	if (chkchk) {
	    x=0;
	    for (j=0; j<n; j++) {
			$(".checkbx")[j].checked = true;
			$(".divinput2")[j].style.textDecoration = "line-through";
	    };			
	}
	else {
		x=n;
	    for (j=0; j<n; j++) {
			$(".checkbx")[j].checked = false;
			$(".divinput2")[j].style.textDecoration ="none";
		};
	};
    numbActChange ();
	showButClr ();
	activeBut ();
};	
	
function showButChk () {
    if (n === 0) {
	    $(butChk).css("display", "none");
	}
	else {
	    $(butChk).css("display", "inline");
	};
};

function butAllEvent () {
	for (i=0; i<n; i++) {
		$(".divinput").eq(i).css("display", "block");
	};
	a = 1;
	activeButStyle ();
};

function butActEvent () {
	for (i=0; i<n; i++) {
		if ($(".checkbx").eq(i).prop("checked")) {
		    $(".divinput").eq(i).css("display", "none");       
		}
		else {
			$(".divinput").eq(i).css("display", "block");
		};
	};
	a = 2;
	activeButStyle ();
};

function butCompEvent () {
	for (i=0; i<n; i++) {
		if ($(".checkbx").eq(i).prop("checked")) {
		    $(".divinput").eq(i).css("display", "block");
		}
		else {
			$(".divinput").eq(i).css("display", "none");
		};
	};
	a = 3;
	activeButStyle ();
};
	
function butClrEvent () {
	for (i=0; i<n; i++) {
		if ($(".checkbx").eq(i).prop("checked")) {
    		$(".divinput").eq(i).remove();
			i--;
			n--;
		};
	};
	showButClr ();
	showButChk ();
	numbActChange ();
};

function showButClr () {
    for (i=0; i<n; i++) {
	    if ($(".checkbx").eq(i).prop("checked")) {
            $(butClr).css("display", "inline");
	        break;
		}
		else {
		    $(butClr).css("display", "none");
		}
	};
};

function addDataEvent(valoare) {
	newDiv1 ();
	newBut1 ();
	newData = valoare;
	newDiv2 (newData);
	newBut ();
	n++;
	showButChk ();
	numbActChange ();
	$("#txt").val("");
};



function newDiv1 () {
	div1 = document.createElement("div");
	    div1.id = "divinp"+n;
		div1.className = "divinput";
		$("#numbact").before(div1);
	x++;
};

function newBut1 () {
	but1 = document.createElement("input");
	    but1.id = "chbx"+n;
		but1.type = "checkbox";
	    but1.className = "checkbx";
		$("#divinp"+n).append(but1);
		but1.addEventListener("change", but1Event);
};

function but1Event () {
    var m = this.id.replace("chbx","");
	if (this.checked) {
	    $("#divinpt"+m).css("textDecoration", "line-through");
		x--;
	}
	else {
	    $("#divinpt"+m).css("textDecoration", "none");
		x++;
	};
    showButClr ();
	numbActChange ();
	activeBut ();	
};

function newDiv2 (valoare) {
	div2 = document.createElement("div");
		div2.id = "divinpt"+n;
		div2.className = "divinput2";
	    div2.innerHTML = valoare;
		$("#divinp"+n).append(div2);
		div2.addEventListener("dblclick", div2Event);
};

function div2Event () {
	this.contentEditable = true;
	this.focus();
	this.addEventListener("keypress", function (e) {
	    if (e.keyCode === 13) {
	        this.contentEditable = false;
		};
	});
};

function newBut () {
	var but = createButton ("but", "delbut"+n, "btn", "\u2716", butEvent);
	$("#divinp"+n).append(but);
};

function butEvent () {
	if ($("#chbx"+this.id.replace("delbut","")).prop("checked", false)){
		x--;
	};
	$(this).parent().remove();
    n--;
    showButChk ();
    numbActChange ();
};

function numbActChange () {
	if (n===0) {
		$("#numbact").css("display", "none");
	}
	else {
		$("#numbact").css("display", "block");
	};
	$("#numbact").text(x + " items left");
	$("#numbact").append(butAll);
    $("#numbact").append(butAct);
	$("#numbact").append(butComp);
	$("#numbact").append(butClr);
};

function activeButStyle () {
	switch (a) {
		case 1:
		    butAll.style.border = "1px solid grey";
			butAct.style.border = "none";
			butComp.style.border = "none";
			break;
		case 2:
		    butAll.style.border = "none";
			butAct.style.border = "1px solid grey";
			butComp.style.border = "none";
			break;		
		case 3:
		    butAll.style.border = "none";
			butAct.style.border = "none";
			butComp.style.border = "1px solid grey";
			break;			
	};
};

function activeBut () {
	switch (a) {
		case 1:
			butAllEvent ();
			break;
		case 2:
			butActEvent ();
			break;		
		case 3:
			butCompEvent ();
			break;
	};
};