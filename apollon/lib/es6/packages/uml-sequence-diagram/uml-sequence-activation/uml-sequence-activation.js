import { SequenceElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { assign } from '../../../utils/fx/assign';
export class SequenceActivation extends UMLElement {
    constructor(values) {
        super(values);
        this.type = SequenceElementType.SequenceActivation;
        this.bounds = { ...this.bounds, width: 20, height: 100 };
        this.lifelineId = '';
        assign(this, values);
    }
    render(canvas) {
        return [this];
    }
}
//# sourceMappingURL=uml-sequence-activation.js.map