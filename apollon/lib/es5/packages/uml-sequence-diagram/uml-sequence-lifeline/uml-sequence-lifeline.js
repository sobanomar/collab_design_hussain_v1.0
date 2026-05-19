"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceLifeline = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var assign_1 = require("../../../utils/fx/assign");
var SequenceLifeline = /** @class */ (function (_super) {
    tslib_1.__extends(SequenceLifeline, _super);
    function SequenceLifeline(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.SequenceElementType.SequenceLifeline;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 160, height: 200 });
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 160, height: 200 });
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    SequenceLifeline.prototype.render = function (canvas) {
        return [this];
    };
    SequenceLifeline.features = {
        connectable: false,
        droppable: false,
        hoverable: true,
        movable: true,
        resizable: true,
        selectable: true,
        updatable: true,
        alternativePortVisualization: false,
    };
    return SequenceLifeline;
}(uml_element_1.UMLElement));
exports.SequenceLifeline = SequenceLifeline;
//# sourceMappingURL=uml-sequence-lifeline.js.map