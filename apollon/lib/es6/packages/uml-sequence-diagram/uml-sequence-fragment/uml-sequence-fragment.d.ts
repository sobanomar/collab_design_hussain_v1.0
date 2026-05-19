import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementType } from '../../uml-element-type';
import { DeepPartial } from 'redux';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { IBoundary } from '../../../utils/geometry/boundary';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
export declare enum FragmentType {
    Alt = "alt",
    Opt = "opt",
    Loop = "loop",
    Par = "par",
    Break = "break",
    Critical = "critical",
    Neg = "neg",
    Ref = "ref",
    Seq = "seq",
    Strict = "strict"
}
export interface ISequenceFragment extends IUMLElement {
    fragmentType: FragmentType;
    condition?: string;
}
export declare class SequenceFragment extends UMLElement {
    type: UMLElementType;
    fragmentType: FragmentType;
    condition?: string;
    bounds: IBoundary;
    name: string;
    static features: UMLElementFeatures;
    constructor(values?: DeepPartial<ISequenceFragment>);
    render(canvas: ILayer): ILayoutable[];
}
