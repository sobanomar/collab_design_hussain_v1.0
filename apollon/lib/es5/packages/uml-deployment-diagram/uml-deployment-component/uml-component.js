"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLDeploymentComponent = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var assign_1 = require("../../../utils/fx/assign");
var uml_component_1 = require("../../common/uml-component/uml-component");
var UMLDeploymentComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UMLDeploymentComponent, _super);
    function UMLDeploymentComponent(values) {
        var _this = _super.call(this) || this;
        _this.type = __1.DeploymentElementType.DeploymentComponent;
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLDeploymentComponent.prototype.serialize = function () {
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this)), { type: this.type, displayStereotype: this.displayStereotype });
    };
    UMLDeploymentComponent.prototype.deserialize = function (values, children) {
        var assert = function (v) {
            return v.type === __1.DeploymentElementType.DeploymentComponent;
        };
        if (!assert(values)) {
            return;
        }
        _super.prototype.deserialize.call(this, values, children);
        this.displayStereotype = values.displayStereotype;
    };
    UMLDeploymentComponent.supportedRelationships = [
        __1.DeploymentRelationshipType.DeploymentAssociation,
        __1.DeploymentRelationshipType.DeploymentDependency,
        __1.DeploymentRelationshipType.DeploymentInterfaceProvided,
        __1.DeploymentRelationshipType.DeploymentInterfaceRequired,
    ];
    return UMLDeploymentComponent;
}(uml_component_1.UMLComponent));
exports.UMLDeploymentComponent = UMLDeploymentComponent;
//# sourceMappingURL=uml-component.js.map