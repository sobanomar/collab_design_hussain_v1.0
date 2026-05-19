import { ActivityElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { assign } from '../../../utils/fx/assign';
export class UMLActivitySwimlane extends UMLElement {
    constructor(values) {
        super(values);
        this.type = ActivityElementType.ActivitySwimlane;
        this.bounds = { ...this.bounds, width: 200, height: 600 };
        assign(this, values);
    }
    render(canvas) {
        return [this];
    }
}
UMLActivitySwimlane.features = {
    connectable: false,
    droppable: true,
    hoverable: true,
    movable: true,
    resizable: true,
    selectable: true,
    updatable: true,
    alternativePortVisualization: false,
};
//# sourceMappingURL=uml-activity-swimlane.js.map