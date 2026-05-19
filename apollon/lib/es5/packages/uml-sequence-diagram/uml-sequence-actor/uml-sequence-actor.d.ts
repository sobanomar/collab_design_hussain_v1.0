import { DeepPartial } from 'redux';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { UMLElementType } from '../../uml-element-type';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
export interface IUMLSequenceActor extends IUMLElement {
}
export declare class UMLSequenceActor extends UMLElement {
    type: UMLElementType;
    static features: UMLElementFeatures;
    constructor(values?: DeepPartial<IUMLSequenceActor>);
    render(canvas: ILayer): ILayoutable[];
}
