"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLSequenceExit = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var assign_1 = require("../../../utils/fx/assign");
var UMLSequenceExit = /** @class */ (function (_super) {
    tslib_1.__extends(UMLSequenceExit, _super);
    function UMLSequenceExit(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.SequenceElementType.SequenceExit;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 40, height: 40 });
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLSequenceExit.prototype.render = function (canvas) {
        return [this];
    };
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
    return UMLSequenceExit;
}(uml_element_1.UMLElement));
exports.UMLSequenceExit = UMLSequenceExit;
//# sourceMappingURL=uml-sequence-exit.js.map