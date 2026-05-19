import React from 'react';
import { ThemedRect } from '../../../components/theme/themedComponents';
export const SequenceActivationComponent = ({ element, fillColor }) => {
    return (React.createElement("g", null,
        React.createElement(ThemedRect, { x: 0, y: 0, width: "100%", height: "100%", fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor, fillOpacity: 0.3 })));
};
//# sourceMappingURL=uml-sequence-activation-component.js.map