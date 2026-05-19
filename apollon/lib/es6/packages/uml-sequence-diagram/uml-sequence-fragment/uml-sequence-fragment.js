import { SequenceElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { assign } from '../../../utils/fx/assign';
export var FragmentType;
(function (FragmentType) {
    FragmentType["Alt"] = "alt";
    FragmentType["Opt"] = "opt";
    FragmentType["Loop"] = "loop";
    FragmentType["Par"] = "par";
    FragmentType["Break"] = "break";
    FragmentType["Critical"] = "critical";
    FragmentType["Neg"] = "neg";
    FragmentType["Ref"] = "ref";
    FragmentType["Seq"] = "seq";
    FragmentType["Strict"] = "strict";
})(FragmentType || (FragmentType = {}));
export class SequenceFragment extends UMLElement {
    constructor(values) {
        super(values);
        this.type = SequenceElementType.SequenceFragment;
        this.fragmentType = FragmentType.Alt;
        this.bounds = { ...this.bounds, width: 150, height: 100 };
        this.name = '';
        if (values?.condition) {
            this.name = values.condition;
        }
        assign(this, values);
    }
    render(canvas) {
        return [this];
    }
}
SequenceFragment.features = {
    connectable: false,
    droppable: false,
    hoverable: true,
    movable: true,
    resizable: true,
    selectable: true,
    updatable: true,
    alternativePortVisualization: false,
};
//# sourceMappingURL=uml-sequence-fragment.js.map