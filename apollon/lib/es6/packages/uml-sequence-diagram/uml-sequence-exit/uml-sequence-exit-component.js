import React from 'react';
import { ThemedLine } from '../../../components/theme/themedComponents';
import { computeDimension } from '../../../utils/geometry/boundary';
export const UMLSequenceExitComponent = ({ element, fillColor }) => {
    const padding = 0.2; // 20% padding from edges
    const startX = computeDimension(1.0, element.bounds.width * padding);
    const startY = computeDimension(1.0, element.bounds.height * padding);
    const endX = computeDimension(1.0, element.bounds.width * (1 - padding));
    const endY = computeDimension(1.0, element.bounds.height * (1 - padding));
    return (React.createElement("g", null,
        React.createElement("rect", { width: "100%", height: "100%", fill: "none" }),
        React.createElement("g", { stroke: element.strokeColor || 'black', strokeWidth: 2 },
            React.createElement(ThemedLine, { x1: startX, y1: startY, x2: endX, y2: endY, strokeColor: element.fillColor }),
            React.createElement(ThemedLine, { x1: endX, y1: startY, x2: startX, y2: endY, strokeColor: element.fillColor }))));
};
//# sourceMappingURL=uml-sequence-exit-component.js.map