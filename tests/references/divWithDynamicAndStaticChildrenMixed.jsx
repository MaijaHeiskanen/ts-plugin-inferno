var inferno = require("inferno");
var createVNode = inferno.createVNode;
createVNode(1, "div", null, [a, createVNode(1, "div", null, "1", 16)], 0);
