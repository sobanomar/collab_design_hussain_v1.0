"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceLifelineComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var text_1 = require("../../../components/controls/text/text");
var SequenceLifelineComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    var boxHeight = 30;
    // Use 50% for horizontal centering instead of fixed calculation
    var centerX = "50%";
    return (react_1.default.createElement("g", null,
        react_1.default.createElement("rect", { width: "100%", height: "100%", fill: "none" }),
        react_1.default.createElement(themedComponents_1.ThemedRect, { x: 0, y: 0, width: "100%", height: boxHeight, fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor }),
        react_1.default.createElement(text_1.Text, { fill: element.textColor, x: centerX, y: boxHeight / 2, textAnchor: "middle", dominantBaseline: "middle" }, element.name),
        react_1.default.createElement(themedComponents_1.ThemedLine, { x1: centerX, y1: boxHeight, x2: centerX, y2: "100%", strokeColor: element.strokeColor, strokeWidth: 2, strokeDasharray: "4 4" })));
};
exports.SequenceLifelineComponent = SequenceLifelineComponent;
//# sourceMappingURL=uml-sequence-lifeline-component.js.map