var inferno = require("inferno");
var createComponentVNode = inferno.createComponentVNode;
var createVNode = inferno.createVNode;
function MyComponent(props) {
    return (createVNode(1, "div", null, [createVNode(1, "span", null, props.name, 0), createComponentVNode(2, MyComponent), createVNode(1, "div", null, props.children.map(function (child) { return createVNode(1, "div", null, child, 0); }), 0)], 4));
}
