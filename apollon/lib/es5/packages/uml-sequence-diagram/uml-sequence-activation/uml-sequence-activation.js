"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceActivation = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var assign_1 = require("../../../utils/fx/assign");
var SequenceActivation = /** @class */ (function (_super) {
    tslib_1.__extends(SequenceActivation, _super);
    function SequenceActivation(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.SequenceElementType.SequenceActivation;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 20, height: 100 });
        _this.lifelineId = '';
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    SequenceActivation.prototype.render = function (canvas) {
        return [this];
    };
    return SequenceActivation;
}(uml_element_1.UMLElement));
exports.SequenceActivation = SequenceActivation;
//# sourceMappingURL=uml-sequence-activation.js.map