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
		var p = Proxy.create(handler);
		return p;
	};
}

function Impl(){
	this.x=5;
	this.y=10;
}

var Iface = Interface(function(){
	this.x =5;
});

var a = new Impl();
var b = Iface(a);

console.log(b.x);
console.log(b.y);