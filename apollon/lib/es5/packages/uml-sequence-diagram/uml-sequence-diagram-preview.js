"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeSequenceDiagramPreview = void 0;
var uml_sequence_lifeline_1 = require("./uml-sequence-lifeline/uml-sequence-lifeline");
var uml_sequence_activation_1 = require("./uml-sequence-activation/uml-sequence-activation");
var uml_sequence_fragment_1 = require("./uml-sequence-fragment/uml-sequence-fragment");
var uml_sequence_actor_1 = require("./uml-sequence-actor/uml-sequence-actor");
var uml_sequence_exit_1 = require("./uml-sequence-exit/uml-sequence-exit");
var boundary_1 = require("../../utils/geometry/boundary");
var composeSequenceDiagramPreview = function (layer, translate) {
    var elements = [];
    var sequenceLifeline = new uml_sequence_lifeline_1.SequenceLifeline({
        name: "Life Line",
        bounds: { x: 0, y: 0, width: 160, height: 200 },
    });
    elements.push(sequenceLifeline);
    var activation = new uml_sequence_activation_1.SequenceActivation({
        lifelineId: sequenceLifeline.id,
        bounds: { x: 70, y: 50, width: 20, height: 100 },
    });
    elements.push(activation);
    var altFragment = new uml_sequence_fragment_1.SequenceFragment({
        fragmentType: uml_sequence_fragment_1.FragmentType.Alt,
        condition: 'condition',
        bounds: { x: 100, y: 50, width: 150, height: 100 },
    });
    elements.push(altFragment);
    var optFragment = new uml_sequence_fragment_1.SequenceFragment({
        fragmentType: uml_sequence_fragment_1.FragmentType.Opt,
        condition: 'optional',
        bounds: { x: 320, y: 50, width: 150, height: 100 },
    });
    elements.push(optFragment);
    var loopFragment = new uml_sequence_fragment_1.SequenceFragment({
        fragmentType: uml_sequence_fragment_1.FragmentType.Loop,
        condition: 'while true',
        bounds: { x: 540, y: 50, width: 150, height: 100 },
    });
    elements.push(loopFragment);
    var actor = new uml_sequence_actor_1.UMLSequenceActor({
        name: 'Actor',
        bounds: { x: 0,
            y: 0,
            width: (0, boundary_1.computeDimension)(1.0, 80),
            height: (0, boundary_1.computeDimension)(1.0, 140) }
    });
    elements.push(actor);
    var exit = new uml_sequence_exit_1.UMLSequenceExit({
        bounds: { x: 700, y: 50, width: 40, height: 40 }
    });
    elements.push(exit);
    return elements;
};
exports.composeSequenceDiagramPreview = composeSequenceDiagramPreview;
//# sourceMappingURL=uml-sequence-diagram-preview.js.map