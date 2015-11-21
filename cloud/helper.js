/**
 * mergeData helper
 * 
 */
exports.meregeData = function(serverData, data2) {
	var result = serverData;
	
	if (data2.level != null)
		result.set("level",  Math.max(serverData.get("level"), data2.level));
	if (data2.gold != null)
		result.set("gold", Math.max(serverData.get("gold"), data2.gold));
	if (data2.exp != null)
		result.set("exp", Math.max(serverData.get("exp"), data2.exp));
	if (data2.elo != null)
		result.set("elo", Math.max(serverData.get("elo"), data2.elo));
	
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
					if (items[key].quantity <= element.quantity) {
						items[key] = element;
					}
				} else {
					items[key] = element;
				}
			}
		}
		
		result.set("items", items);
	}
			
	return result;
};