import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementType } from '../../uml-element-type';
import { DeepPartial } from 'redux';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { IBoundary } from '../../../utils/geometry/boundary';
export declare class SequenceActivation extends UMLElement {
    type: UMLElementType;
    bounds: IBoundary;
    lifelineId: string;
    constructor(values?: DeepPartial<IUMLElement & {
        lifelineId: string;
    }>);
    render(canvas: ILayer): ILayoutable[];
}
