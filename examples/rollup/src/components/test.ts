import {InfernoKeyboardEvent, InfernoNode, render} from "inferno"; // Here is no problem, because the transformer is not touching this

export const a: InfernoKeyboardEvent<any> | InfernoNode | number = 3 + render.toString();