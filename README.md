Interface JS
----

JavaScript interfaces implemented through Harmony proxies. Enforce contracts in JavaScript!


Usage:
----

    //Define an interface
    var Iface = Interface(function(){
	    this.foo =function(x){};
    });
     
    //Define an implementor
    function Impl(){
	    this.foo = function(x,y){}
	    this.y=10;
    }

    var a = new Impl(); //Instantiate the object

    var b = Iface(a); // Observe it like an interface implementor

    b.y;//undefined - access to unknown property

    b.foo;//returns b's foo, perfectly OK

In the above example, had we passed an object that does not implement a method `foo`, or implemeted
such a method with fewer parameters an execption would have been raised.
    

Todo 

 - Get it working!
 - Allow optional typing
 - Allow debug/production modes where production does not use actual proxies