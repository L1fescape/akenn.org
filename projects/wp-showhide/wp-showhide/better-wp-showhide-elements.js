var wp_showhide = {
	getIndex : function(element) {
		for (var k=0; k < wp_showhide.list.length; k++) {
			if (wp_showhide.list[k].dom == element)
			  return k;
		}
		return null;
	},
	list : [],
	main : function(element, theName) {
		theName = document.getElementById(theName);
		
		var index = wp_showhide.getIndex(element);
		
		if (wp_showhide.list[index].state == "visible") {
			wp_showhide.list[index].state = "hidden";
			theName.style.display = "none";
			element.innerHTML = wp_showhide.list[index].values[0];
		}
		else {
			wp_showhide.list[index].state = "visible";
			theName.style.display = "block";
			element.innerHTML = wp_showhide.list[index].values[1];
		}
	},
	init : function() {
		var links = document.getElementsByTagName('a');
		
		for (var i = 0; i < links.length; i++) {
			if (links[i].hasAttribute("onclick") && links[i].getAttribute("onclick") != null) {
				var onclick = links[i].getAttribute("onclick");
				onclick = onclick.split("wp_showhide.main(this, '");
				onclick[0] = onclick[1].split("')");
				var name = onclick[0].join("");
				var values = [];
				var toParse = links[i].innerHTML.substring(links[i].innerHTML.indexOf('["'), links[i].innerHTML.indexOf('"]')+2);
				var innerHTML = JSON.parse(toParse);
				for (var j = 0; j < innerHTML.length-1; j++) {
					values.push(innerHTML[j]);
				}
				var state = innerHTML[innerHTML.length-1];
				var dom = links[i];
				wp_showhide.list.push({name:name, values:values, state:state, dom:dom});
			}
		}
		
		for (var i = 0; i < wp_showhide.list.length; i++) {
			if (wp_showhide.list[i].state == "visible") {
				var div = document.getElementById(wp_showhide.list[i].name);
				div.style.display = "block";
				wp_showhide.list[i].dom.innerHTML = wp_showhide.list[i].values[1];
			}
			else {
				var div = document.getElementById(wp_showhide.list[i].name);
				div.style.display = "none";
				wp_showhide.list[i].dom.innerHTML = wp_showhide.list[i].values[0];
			}
		}
	}
	
};

wp_showhide.init();
