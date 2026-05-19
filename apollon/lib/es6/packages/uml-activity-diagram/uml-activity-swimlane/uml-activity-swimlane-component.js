import React from 'react';
import { ThemedLine, ThemedRect } from '../../../components/theme/themedComponents';
import { Text } from '../../../components/controls/text/text';
export const UMLActivitySwimlaneComponent = ({ element, fillColor }) => {
    const headerHeight = 40;
    return (React.createElement("g", null,
        React.createElement(ThemedRect, { x: 0, y: 0, width: element.bounds.width, height: element.bounds.height, fillColor: fillColor || element.fillColor }),
        React.createElement("g", { stroke: element.strokeColor || 'black', strokeWidth: 1 },
            React.createElement("rect", { x: 0, y: 0, width: element.bounds.width, height: headerHeight, fill: fillColor || element.fillColor }),
            React.createElement(Text, { fill: element.textColor, x: element.bounds.width / 2, y: headerHeight / 2, textAnchor: "middle", style: { fontWeight: 'normal' } }, element.name),
            React.createElement(ThemedLine, { x1: 0, y1: 0, x2: 0, y2: element.bounds.height, strokeColor: element.strokeColor }),
            React.createElement(ThemedLine, { x1: element.bounds.width, y1: 0, x2: element.bounds.width, y2: element.bounds.height, strokeColor: element.strokeColor }),
            React.createElement(ThemedLine, { x1: 0, y1: 0, x2: element.bounds.width, y2: 0, strokeColor: element.strokeColor }),
            React.createElement(ThemedLine, { x1: 0, y1: element.bounds.height, x2: element.bounds.width, y2: element.bounds.height, strokeColor: element.strokeColor }))));
};
//# sourceMappingURL=uml-activity-swimlane-component.js.map