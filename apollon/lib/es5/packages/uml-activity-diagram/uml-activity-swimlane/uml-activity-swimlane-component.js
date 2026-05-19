"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivitySwimlaneComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var text_1 = require("../../../components/controls/text/text");
var UMLActivitySwimlaneComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    var headerHeight = 40;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { x: 0, y: 0, width: element.bounds.width, height: element.bounds.height, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement("g", { stroke: element.strokeColor || 'black', strokeWidth: 1 },
            react_1.default.createElement("rect", { x: 0, y: 0, width: element.bounds.width, height: headerHeight, fill: fillColor || element.fillColor }),
            react_1.default.createElement(text_1.Text, { fill: element.textColor, x: element.bounds.width / 2, y: headerHeight / 2, textAnchor: "middle", style: { fontWeight: 'normal' } }, element.name),
            react_1.default.createElement(themedComponents_1.ThemedLine, { x1: 0, y1: 0, x2: 0, y2: element.bounds.height, strokeColor: element.strokeColor }),
            react_1.default.createElement(themedComponents_1.ThemedLine, { x1: element.bounds.width, y1: 0, x2: element.bounds.width, y2: element.bounds.height, strokeColor: element.strokeColor }),
            react_1.default.createElement(themedComponents_1.ThemedLine, { x1: 0, y1: 0, x2: element.bounds.width, y2: 0, strokeColor: element.strokeColor }),
            react_1.default.createElement(themedComponents_1.ThemedLine, { x1: 0, y1: element.bounds.height, x2: element.bounds.width, y2: element.bounds.height, strokeColor: element.strokeColor }))));
};
exports.UMLActivitySwimlaneComponent = UMLActivitySwimlaneComponent;
//# sourceMappingURL=uml-activity-swimlane-component.js.map