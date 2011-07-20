// Defining default jumpers
// Override for your own site
// e.g. Wordpress: jumpersQuery = ".post";
var jumpersQuery = "h1,h2,h3,h4";

document.addEventListener('DOMContentLoaded', onDOMReady, false);

function onDOMReady() {
	// Define which elements are relevant for jumping
	// var host = window.location.hostname;
	// 	
	// 	if(host.match(/facebook/)) {
	// 		jumpersQuery = "li.pvm";
	// 	}
	// 	
	// 	if(host.match(/tumblr/)) {
	// 		jumpersQuery = ".post";
	// 	}
	// 	
	// 	// Some sites already do have JK navigation
	// 	if(host.match(/google/)) {
	// 		jumpersQuery = ".post";
	// 	}
	
	window.addEventListener('keydown', function(e) {
		if(e.keyCode === 74) {
			onJDown();
		}
		if(e.keyCode === 75) {
			onKDown();
		}
	}, false);
	
	// Future Chrome/Safari/Firefox plugins check whether this attribute is set and disable themselves accordingly
	document.body.setAttribute('data-jkenabled', 'yes');
}

function onJDown() {
	// Do not navigate when the user wants to use J and K for writing
	if(document.activeElement !== document.body) {
		return false;
	}
	
	var elems = document.querySelectorAll(jumpersQuery),
			posTable = generatePosTable(elems),
			scrollPos = window.pageYOffset,	
			next = getNext(scrollPos, posTable);
	
	if(next) {
		window.scrollTo(0, next.yPos);
	} else {
		// scroll to the bottom when there are no more regular destinations
		window.scrollTo(0, document.body.offsetHeight);
	}
}

function onKDown() {
	// Do not navigate when the user wants to use J and K for writing
	if(document.activeElement !== document.body) {
		return false;
	}
	
	var elems = document.querySelectorAll(jumpersQuery),
			posTable = generatePosTable(elems),
			scrollPos = window.pageYOffset,	
			prev = getPrevious(scrollPos, posTable);

	if(prev) {
		window.scrollTo(0, prev.yPos);
	} else {
		// scroll to the top when there are no more regular destinations
		window.scrollTo(0, 0);
	}
}

//----------

// get the absolute Y-offset of obj
function getYPos(obj) {
	var curtop = 0;
	if(obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return curtop;
}

// takes an array of objects and returns a table with the corresponding positions
function generatePosTable(elems) {
	var table = [];	
	for(var i = 0, l = elems.length; i < l; i++) {
		table[i] = {yPos: getYPos(elems[i]), elem: elems[i]};
	}
	return table;
}

// get next element (from posTable) after scrollPos
function getNext(scrollPos, posTable) {
	for(var i = 0, l = posTable.length; i < l; i++) {
		// get next element (FIX: cannot assume that Elements are physically placed on the document like they appear in the DOM)
		if(posTable[i].yPos > scrollPos) {
			return posTable[i];
		}
	}
}

// get previous element (from posTable) after scrollPos
function getPrevious(scrollPos, posTable) {
	for(var i = posTable.length - 1; i >= 0; i--) {
		// get previous element (FIX: cannot assume that Elements are physically placed on the document like they appear in the DOM)
		if(posTable[i].yPos < scrollPos) {
			return posTable[i];
		}
	}
}