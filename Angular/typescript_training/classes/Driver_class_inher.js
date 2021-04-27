"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = require("./Circle");
var Shape_1 = require("./Shape");
var myShape = new Shape_1.Shape(1, 2);
console.log(myShape.toString());
var myCircle = new Circle_1.Circle(1, 2, 3);
console.log(myCircle.toString());
