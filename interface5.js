function breach(message) {
    return new Error("Breach in interface contract: " + message);
}
var fastMode
function Interface(fn, options) {
    //get object, or construct if doesn't return object
    var iface = new fn();
    var options = options || {};

    // Since proxies are still slow, if a "production" option is passed
    // all the interface does is relay the object
    if (options.production) {
        return function (impl) {
            return impl;
        }
    }

    return function (impl) {

        // Proxy handler
        var propertiesObject = {};

        // Enforce implementation
        for (var elem in iface) {

            if (!(elem in impl)) {
                throw breach("Nonexisting member " + elem)
            }
            var contract = iface[elem];
            var tested = impl[elem]
            if (typeof contract === "function") {
                if (typeof tested !== "function") {
                    throw breach("Interface function " + elem +
                                 " not a function in implementor")
                }
                if (contract.length > tested.length) {
                    throw breach("Interface required function " + elem + " to run with " +
                                    contract.length + " params however implementor's runs" +
                                    " with " + tested.length + " params")
                }
            }

            // Optional typing
            if (options.typecheck && (typeof contract === "string") && (contract.length > 0)) {
                ttype = typeof tested;
                if (ttype !== contract) {
                    throw breach("Type Mismatch, expected property" + elem +
                                 "To be of type" + contract + "Instead got"+
                                 ttype)
                }
            }

            // define the property
            propertiesObject[elem] = {enumerable: true, configurable:false, get: getFunc.bind(null,iface,impl,elem)}
        }

        var obj = Object.create(null,propertiesObject);
        return obj;
    };

    function getFunc(iface,impl,name){
        if (name in iface) {
            return impl[name];
        }
        return undefined;
    }
            
}

module.exports = Interface;
