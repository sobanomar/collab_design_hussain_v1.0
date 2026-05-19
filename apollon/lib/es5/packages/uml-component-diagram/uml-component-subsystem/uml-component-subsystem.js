"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLSubsystem = void 0;
var tslib_1 = require("tslib");
var uml_package_1 = require("../../common/uml-package/uml-package");
var __1 = require("..");
var assign_1 = require("../../../utils/fx/assign");
var UMLSubsystem = /** @class */ (function (_super) {
    tslib_1.__extends(UMLSubsystem, _super);
    function UMLSubsystem(values) {
        var _this = _super.call(this) || this;
        _this.stereotype = 'subsystem';
        _this.displayStereotype = true;
        _this.type = __1.ComponentElementType.Subsystem;
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLSubsystem.prototype.serialize = function () {
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this)), { type: this.type, stereotype: this.stereotype, displayStereotype: this.displayStereotype });
    };
    UMLSubsystem.prototype.deserialize = function (values, children) {
        var assert = function (v) {
            return v.type === __1.ComponentElementType.Subsystem;
        };
        if (!assert(values)) {
            return;
        }
        _super.prototype.deserialize.call(this, values, children);
        this.stereotype = values.stereotype;
        this.displayStereotype = values.displayStereotype;
    };
    UMLSubsystem.supportedRelationships = [
        __1.ComponentRelationshipType.ComponentDependency,
        __1.ComponentRelationshipType.ComponentInterfaceProvided,
        __1.ComponentRelationshipType.ComponentInterfaceRequired,
    ];
    return UMLSubsystem;
}(uml_package_1.UMLPackage));
exports.UMLSubsystem = UMLSubsystem;
//# sourceMappingURL=uml-component-subsystem.js.map