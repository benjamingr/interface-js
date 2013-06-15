function Interface(fn){
	//get object, or construct if doesn't return object
	var iface = new fn();

	return function(impl){
		var handler = {
    		get: function(target, name){
        		if(name in iface){
		            return impl[name];
    			}
    			return undefined;
    		}
		};
		for(elem in iface){
			if(!(elem in impl)){
				throw new Error("Breach in interface contract!")
			}
		}
		var p = Proxy.create(handler);
		return p;
	};
}

module.exports = Interface;