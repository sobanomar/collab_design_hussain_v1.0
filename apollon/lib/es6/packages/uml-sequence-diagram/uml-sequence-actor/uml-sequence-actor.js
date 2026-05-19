import { SequenceElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { assign } from '../../../utils/fx/assign';
export class UMLSequenceActor extends UMLElement {
    constructor(values) {
        super(values);
        this.type = SequenceElementType.SequenceActor;
        this.bounds = { ...this.bounds, width: 80, height: 140 };
        assign(this, values);
    }
    render(canvas) {
        return [this];
    }
}
UMLSequenceActor.features = {
    connectable: false,
    droppable: false,
    hoverable: true,
    movable: true,
    resizable: true,
    selectable: true,
    updatable: true,
    alternativePortVisualization: false,
};
//# sourceMappingURL=uml-sequence-actor.js.map