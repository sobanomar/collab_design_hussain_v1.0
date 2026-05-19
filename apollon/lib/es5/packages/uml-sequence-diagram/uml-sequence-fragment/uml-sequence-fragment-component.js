"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceFragmentComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var uml_sequence_fragment_1 = require("./uml-sequence-fragment");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var text_1 = require("../../../components/controls/text/text");
var SequenceFragmentComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    var getFragmentLabel = function () {
        switch (element.fragmentType) {
            case uml_sequence_fragment_1.FragmentType.Alt:
                return 'alt';
            case uml_sequence_fragment_1.FragmentType.Opt:
                return 'opt';
            case uml_sequence_fragment_1.FragmentType.Loop:
                return 'loop';
            default:
                return '';
        }
    };
    return (react_1.default.createElement("g", null,
        react_1.default.createElement("rect", { width: "100%", height: "100%", fill: "none" }),
        react_1.default.createElement(themedComponents_1.ThemedRect, { x: 0, y: 0, width: "100%", height: "100%", fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor, fillOpacity: 0.1 }),
        react_1.default.createElement(themedComponents_1.ThemedLine, { x1: 0, y1: 0, x2: 0, y2: "100%", strokeColor: element.strokeColor }),
        react_1.default.createElement(themedComponents_1.ThemedLine, { x1: "100%", y1: 0, x2: "100%", y2: "100%", strokeColor: element.strokeColor }),
        react_1.default.createElement(text_1.Text, { fill: element.textColor, x: 10, y: 20, fontSize: 12, textAnchor: "left" }, getFragmentLabel()),
        react_1.default.createElement(text_1.Text, { fill: element.textColor, x: 10, y: 40, fontSize: 12, textAnchor: "left", opacity: element.name ? 1 : 0.5 },
            "[",
            element.name || 'condition not set',
            "]")));
};
exports.SequenceFragmentComponent = SequenceFragmentComponent;
//# sourceMappingURL=uml-sequence-fragment-component.js.map