// Run with mocha

var Interface = require("./interface.js")
var assert = require("assert");
describe("The interface contract",function(){
	it("Enforces implementors to implement members",function(){
		function Impl(){
			this.x=5;
			this.y=10;
		}
		var Iface = Interface(function(){
			this.x =5;
		});
		var a = new Impl();
		var b = Iface(a);

		assert.equal(b.x, a.x,"Relays properties");
		assert.equal(b.y, undefined,"Does not relay unrelated properties");
	});
	it("Throws errors when a non-implementor pretends to implement",function(){
		function Impl(){
			this.y=10;
		}
		var Iface = Interface(function(){
			this.x =5;
		});
		var a = new Impl();
		
		assert.throws(function(){
			var b = Interface(a);
		});
	});
	it("Checks functions exist in implementors",function(){
		function Impl(){
			this.y=10;
		}
		function Impl2(){
			this.y = function(){}
		}
		var Iface = Interface(function(){
			this.y =function(){};
		});
		assert.throws(function(){
			var b = Iface(new Impl());
		});
		var b = Iface(new Impl2());
		assert.equal(typeof b.y,"function")
	});

	it("Checks parameter counts in implementors",function(){
		function Impl(){
			this.y = function(xxx){}
		}
		function Impl2(){
			this.y = function(x,y,z){}
		}
		var Iface = Interface(function(){
			this.y =function(x,y){};
		});
		assert.throws(function(){
			var b = Iface(new Impl());
		});
		var b = Iface(new Impl2());
		assert.equal(b.y.length,3)
	});
	it("Checks for optional typing", function () {
	    var Iface = Interface(function () {
	        this.y = "number";
	    },{typecheck:true});
	    function Impl() {
	        this.y = 5;
	    }
	    function Impl2() {
	        this.y = " Goat ";
	    }

	    var c = Iface(new Impl());
	    assert.equal(c.y, 5);
	    assert.throws(function () {
	        var b = Iface(new Impl2());
	    });
	});
});