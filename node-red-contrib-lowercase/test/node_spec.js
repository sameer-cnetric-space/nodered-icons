var should = require("should");
var helper = require("node-red-node-test-helper");
var node = require("../node.js");

helper.init(require.resolve('node-red'));

describe('lowercase node', function () {

    before(function (done) {
        helper.startServer(done);
    });

    after(function (done) {
        helper.stopServer(done);
    });

    afterEach(function () {
        helper.unload();
    });

    it('should be loaded', function (done) {
        var flow = [{ id: "n1", type: "lowercase", name: "lowercase" }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode("n1");
            n1.should.have.property('name', 'lowercase');
            done();
        });
    });

    it('should have payload', function (done) {
        var flow = [
            { id: "n1", type: "lowercase", name: "lowercase", wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];
        helper.load(node, flow, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");
            n2.on("input", function (msg) {
                msg.should.have.property('payload', '<output message>'); // (2) define output message
                done();
            });
            n1.receive({ payload: "<input message>" }); // (1) define input message
        });
    });
});

