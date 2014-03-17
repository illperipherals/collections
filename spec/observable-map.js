
var sinon = require("sinon");
var extendSpyExpectation = require("./spy-expectation");

module.exports = describeObservableMap;
function describeObservableMap(Map) {

    extendSpyExpectation();

    it("create, update, delete", function () {
        var map = new Map();
        var spy = sinon.spy();
        var observer = map.observeMapChange(function (plus, minus, key, type) {
            spy(plus, minus, key, type);
        });

        map.set("a", 10);
        expect(spy).toHaveBeenCalledWith(10, undefined, "a", "create");
        map.set("a", 20);
        expect(spy).toHaveBeenCalledWith(20, 10, "a", "update");
        map.delete("a");
        expect(spy).toHaveBeenCalledWith(undefined, 20, "a", "delete");

        spy = sinon.spy();
        map.set("a", 30);
        expect(spy).toHaveBeenCalledWith(30, undefined, "a", "create");
        map.set("a", undefined);
        expect(spy).toHaveBeenCalledWith(undefined, 30, "a", "update");

        spy = sinon.spy();
        observer.cancel();

        map.set("b", 20);
        expect(spy).not.toHaveBeenCalled();
    });

}
