"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLComponentComponent = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_component_1 = require("../../common/uml-component/uml-component");
var assign_1 = require("../../../utils/fx/assign");
var UMLComponentComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UMLComponentComponent, _super);
    function UMLComponentComponent(values) {
        var _this = _super.call(this) || this;
        _this.type = __1.ComponentElementType.Component;
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLComponentComponent.prototype.serialize = function () {
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this)), { type: this.type, displayStereotype: this.displayStereotype });
    };
    UMLComponentComponent.prototype.deserialize = function (values, children) {
        var assert = function (v) {
            return v.type === __1.ComponentElementType.Component;
        };
        if (!assert(values)) {
            return;
        }
        _super.prototype.deserialize.call(this, values, children);
        this.displayStereotype = values.displayStereotype;
    };
    UMLComponentComponent.supportedRelationships = [
        __1.ComponentRelationshipType.ComponentDependency,
        __1.ComponentRelationshipType.ComponentInterfaceProvided,
        __1.ComponentRelationshipType.ComponentInterfaceRequired,
    ];
    return UMLComponentComponent;
}(uml_component_1.UMLComponent));
exports.UMLComponentComponent = UMLComponentComponent;
//# sourceMappingURL=uml-component-component.js.map