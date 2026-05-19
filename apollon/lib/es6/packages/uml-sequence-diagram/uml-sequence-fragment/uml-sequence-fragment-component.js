import React from 'react';
import { FragmentType } from './uml-sequence-fragment';
import { ThemedRect, ThemedLine } from '../../../components/theme/themedComponents';
import { Text } from '../../../components/controls/text/text';
export const SequenceFragmentComponent = ({ element, fillColor }) => {
    const getFragmentLabel = () => {
        switch (element.fragmentType) {
            case FragmentType.Alt:
                return 'alt';
            case FragmentType.Opt:
                return 'opt';
            case FragmentType.Loop:
                return 'loop';
            default:
                return '';
        }
    };
    return (React.createElement("g", null,
        React.createElement("rect", { width: "100%", height: "100%", fill: "none" }),
        React.createElement(ThemedRect, { x: 0, y: 0, width: "100%", height: "100%", fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor, fillOpacity: 0.1 }),
        React.createElement(ThemedLine, { x1: 0, y1: 0, x2: 0, y2: "100%", strokeColor: element.strokeColor }),
        React.createElement(ThemedLine, { x1: "100%", y1: 0, x2: "100%", y2: "100%", strokeColor: element.strokeColor }),
        React.createElement(Text, { fill: element.textColor, x: 10, y: 20, fontSize: 12, textAnchor: "left" }, getFragmentLabel()),
        React.createElement(Text, { fill: element.textColor, x: 10, y: 40, fontSize: 12, textAnchor: "left", opacity: element.name ? 1 : 0.5 },
            "[",
            element.name || 'condition not set',
            "]")));
};
//# sourceMappingURL=uml-sequence-fragment-component.js.map