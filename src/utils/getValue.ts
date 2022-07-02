import * as ts from "typescript";

export default function getValue(node, visitor) {
  if (node.kind === ts.SyntaxKind.StringLiteral) {
    return ts.factory.createStringLiteral(node.text);
  }
  if (node.kind === ts.SyntaxKind.JsxExpression) {
    return visitor(node.expression);
  }
}
