"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLSequenceExitComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var boundary_1 = require("../../../utils/geometry/boundary");
var UMLSequenceExitComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    var padding = 0.2; // 20% padding from edges
    var startX = (0, boundary_1.computeDimension)(1.0, element.bounds.width * padding);
    var startY = (0, boundary_1.computeDimension)(1.0, element.bounds.height * padding);
    var endX = (0, boundary_1.computeDimension)(1.0, element.bounds.width * (1 - padding));
    var endY = (0, boundary_1.computeDimension)(1.0, element.bounds.height * (1 - padding));
    return (react_1.default.createElement("g", null,
        react_1.default.createElement("rect", { width: "100%", height: "100%", fill: "none" }),
        react_1.default.createElement("g", { stroke: element.strokeColor || 'black', strokeWidth: 2 },
            react_1.default.createElement(themedComponents_1.ThemedLine, { x1: startX, y1: startY, x2: endX, y2: endY, strokeColor: element.fillColor }),
            react_1.default.createElement(themedComponents_1.ThemedLine, { x1: endX, y1: startY, x2: startX, y2: endY, strokeColor: element.fillColor }))));
};
exports.UMLSequenceExitComponent = UMLSequenceExitComponent;
//# sourceMappingURL=uml-sequence-exit-component.js.map