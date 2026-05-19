import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementType } from '../../uml-element-type';
import { DeepPartial } from 'redux';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { IBoundary } from '../../../utils/geometry/boundary';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
export interface ISequenceLifeline extends IUMLElement {
}
export declare class SequenceLifeline extends UMLElement {
    type: UMLElementType;
    static features: UMLElementFeatures;
    bounds: IBoundary;
    constructor(values?: DeepPartial<ISequenceLifeline>);
    render(canvas: ILayer): ILayoutable[];
}
