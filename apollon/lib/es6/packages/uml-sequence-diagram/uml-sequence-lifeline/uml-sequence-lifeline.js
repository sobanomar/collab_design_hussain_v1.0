import { SequenceElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { assign } from '../../../utils/fx/assign';
export class SequenceLifeline extends UMLElement {
    constructor(values) {
        super(values);
        this.type = SequenceElementType.SequenceLifeline;
        this.bounds = { ...this.bounds, width: 160, height: 200 };
        this.bounds = { ...this.bounds, width: 160, height: 200 };
        assign(this, values);
    }
    render(canvas) {
        return [this];
    }
}
SequenceLifeline.features = {
    connectable: false,
    droppable: false,
    hoverable: true,
    movable: true,
    resizable: true,
    selectable: true,
    updatable: true,
    alternativePortVisualization: false,
};
//# sourceMappingURL=uml-sequence-lifeline.js.map