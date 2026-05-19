"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceActivationComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var SequenceActivationComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { x: 0, y: 0, width: "100%", height: "100%", fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor, fillOpacity: 0.3 })));
};
exports.SequenceActivationComponent = SequenceActivationComponent;
//# sourceMappingURL=uml-sequence-activation-component.js.map