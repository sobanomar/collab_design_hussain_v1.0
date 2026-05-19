import { DeepPartial } from 'redux';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { UMLElementType } from '../../uml-element-type';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
export interface IUMLSequenceExit extends IUMLElement {
}
export declare class UMLSequenceExit extends UMLElement {
    type: UMLElementType;
    static features: UMLElementFeatures;
    constructor(values?: DeepPartial<IUMLSequenceExit>);
    render(canvas: ILayer): ILayoutable[];
}
