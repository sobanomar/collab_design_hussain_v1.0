import { SequenceElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { assign } from '../../../utils/fx/assign';
export class UMLSequenceExit extends UMLElement {
    constructor(values) {
        super(values);
        this.type = SequenceElementType.SequenceExit;
        this.bounds = { ...this.bounds, width: 40, height: 40 };
        assign(this, values);
    }
    render(canvas) {
        return [this];
    }
}
UMLSequenceExit.features = {
    connectable: false,
    droppable: false,
    hoverable: true,
    movable: true,
    resizable: true,
    selectable: true,
    updatable: true,
    alternativePortVisualization: false,
};
//# sourceMappingURL=uml-sequence-exit.js.map