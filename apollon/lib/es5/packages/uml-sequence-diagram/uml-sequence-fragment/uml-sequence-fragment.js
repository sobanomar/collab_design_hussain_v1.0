"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceFragment = exports.FragmentType = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var assign_1 = require("../../../utils/fx/assign");
var FragmentType;
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
})(FragmentType || (exports.FragmentType = FragmentType = {}));
var SequenceFragment = /** @class */ (function (_super) {
    tslib_1.__extends(SequenceFragment, _super);
    function SequenceFragment(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.SequenceElementType.SequenceFragment;
        _this.fragmentType = FragmentType.Alt;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 150, height: 100 });
        _this.name = '';
        if (values === null || values === void 0 ? void 0 : values.condition) {
            _this.name = values.condition;
        }
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    SequenceFragment.prototype.render = function (canvas) {
        return [this];
    };
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
    return SequenceFragment;
}(uml_element_1.UMLElement));
exports.SequenceFragment = SequenceFragment;
//# sourceMappingURL=uml-sequence-fragment.js.map