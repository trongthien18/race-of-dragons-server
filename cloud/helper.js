/**
 * mergeData helper
 * 
 */
exports.meregeData = function(serverData, data2) {
	console.log(data2);
	
	var result = serverData;
	
	if (data2.level != null)
		result.set("level",  Math.max(serverData.get("level"), data2.level));
	if (data2.gold != null)
		result.set("gold", Math.max(serverData.get("gold"), data2.gold));
	if (data2.gem != null)
		result.set("gem", Math.max(serverData.get("gem"), data2.gem));
	if (data2.exp != null)
		result.set("exp", Math.max(serverData.get("exp"), data2.exp));
	if (data2.elo != null)
		result.set("elo", Math.max(serverData.get("elo"), data2.elo));
	if (data2.played != null)
		result.set("played", Math.max(serverData.get("played"), data2.played));
	if (data2.win != null)
		result.set("win", Math.max(serverData.get("win"), data2.win));
	
	if (data2.name != null) {
		result.set("name", data2.name);
	}
			
	
	// merge friends
	if (data2.friends == null) {
		
	} else {
		var friends = serverData.get("friends");
		if (friends == null)
			friends = [];
		for (var i = 0; i < data2.friends.length; i++) {
			var element = data2.friends[i];
			if (friends.indexOf(element) == -1) {
				friends.push(element);
			}				
		}
		
		result.set("friends", friends);
	}
	
	// merge dragons
	if (data2.dragons == null) {
		
	} else {
		var dragons = serverData.get("dragons");
		if (dragons == null)
			dragons = {};
		for (var key in data2.dragons) {
			if (data2.dragons.hasOwnProperty(key)) {
				var element = data2.dragons[key];
				if (dragons.hasOwnProperty(key)) {
					if (dragons[key].level <= element.level) {
						dragons[key] = element;
					}
				} else {
					dragons[key] = element;
				}
			}
		}
		
		result.set("dragons", dragons);
	}
	
	
	// merge items
	if (data2.items == null) {
		
	} else {
		var items = serverData.get("items");
		if (items == null)
			items = {};
		for (var key in data2.items) {
			if (data2.items.hasOwnProperty(key)) {
				var element = data2.items[key];
				if (items.hasOwnProperty(key)) {
					if (items[key].level <= element.level) {
						items[key] = element;
					}
				} else {
					items[key] = element;
				}
			}
		}
		
		result.set("items", items);
	}
	
	// not merge emoji , using server data
	if (data2.emojis == null) {
		
	} else {
		var emojis = serverData.get("emojis");
		if (emojis == null) {
			emojis = {};			
		}
		for	(var key in data2.emojis) {
			if (data2.emojis.hasOwnProperty(key)) {
				var element = data2.emojis[key];
				if (emojis.hasOwnProperty(key)) {
					// not merge
				} else {
					emojis[key] = element;
				}
			}
		}
		
		result.set("emojis", emojis);
	}
			
	return result;
};

/**
 * saveData helper
 * 
 */
exports.saveData = function(serverData, data2) {
	var result = serverData;
	
	if (data2.level != null)
		result.set("level",  data2.level);
	if (data2.gold != null)
		result.set("gold", data2.gold);
	if (data2.gem != null)
		result.set("gem", data2.gem);
	if (data2.exp != null)
		result.set("exp", data2.exp);
	if (data2.elo != null)
		result.set("elo", data2.elo);
	if (data2.played != null)
		result.set("played", data2.played);
	if (data2.win != null)
		result.set("win", data2.win);
	
	if (data2.name != null) {
		result.set("name", data2.name);
	}			
		
	if (data2.friends != null) {
		result.set("friends", data2.friends);
	}
	
	if (data2.dragons != null) {
		result.set("dragons", data2.dragons);
	}

	if (data2.items != null) {
		result.set("items", data2.items);
	}
		
	if (data2.emojis != null) {
		result.set("emojis", data2.emojis);
	}
			
	return result;
};

exports.shuffle = function(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
