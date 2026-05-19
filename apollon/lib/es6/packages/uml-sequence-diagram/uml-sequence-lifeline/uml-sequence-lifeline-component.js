import React from 'react';
import { ThemedRect, ThemedLine } from '../../../components/theme/themedComponents';
import { Text } from '../../../components/controls/text/text';
export const SequenceLifelineComponent = ({ element, fillColor }) => {
    const boxHeight = 30;
    // Use 50% for horizontal centering instead of fixed calculation
    const centerX = "50%";
    return (React.createElement("g", null,
        React.createElement("rect", { width: "100%", height: "100%", fill: "none" }),
        React.createElement(ThemedRect, { x: 0, y: 0, width: "100%", height: boxHeight, fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor }),
        React.createElement(Text, { fill: element.textColor, x: centerX, y: boxHeight / 2, textAnchor: "middle", dominantBaseline: "middle" }, element.name),
        React.createElement(ThemedLine, { x1: centerX, y1: boxHeight, x2: centerX, y2: "100%", strokeColor: element.strokeColor, strokeWidth: 2, strokeDasharray: "4 4" })));
};
//# sourceMappingURL=uml-sequence-lifeline-component.js.map