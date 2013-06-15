function breach(message){
	return new Error("Breach in interface contract: "+message);
}

function Interface(fn){
	//get object, or construct if doesn't return object
	var iface = new fn();

	return function(impl){
		
		// Proxy handler
		var handler = {
    		get: function(target, name){
        		if(name in iface){
		            return impl[name];
    			}
    			return undefined;
    		}
		};

		// Enforce implementation
		for(elem in iface){
			
			if(!(elem in impl)){
				throw breach(" Nonexisting member "+elem)
			}
			var contract = iface[elem];
			var tested = impl[elem]
			if(typeof contract === "function"){
				if(typeof tested !== "function"){
					throw breach(" Interface function "+elem+" not a function in implementor")
				}
				if(contract.length > tested.length){
					throw breach(" Interface required function "+elem+" to run with "+contract.length+" params"+
								 " however implementor's runs with "+tested.length+" params")
				}
			}
		}


		var p = Proxy.create(handler);
		return p;
	};
}

module.exports = Interface;