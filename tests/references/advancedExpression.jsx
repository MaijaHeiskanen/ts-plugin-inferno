var Inferno = require("inferno");
var createVNode = Inferno.createVNode;
function MyComponent(props) {
    return (createVNode(2, "div", null, [createVNode(2, "span", null, props.name), createVNode(16, MyComponent), createVNode(2, "div", null, props.children.map(function (child) { return createVNode(2, "div", null, child); }))]));
}
