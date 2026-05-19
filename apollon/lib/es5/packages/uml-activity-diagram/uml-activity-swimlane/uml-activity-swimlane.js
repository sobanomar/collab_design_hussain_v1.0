"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivitySwimlane = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var assign_1 = require("../../../utils/fx/assign");
var UMLActivitySwimlane = /** @class */ (function (_super) {
    tslib_1.__extends(UMLActivitySwimlane, _super);
    function UMLActivitySwimlane(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.ActivityElementType.ActivitySwimlane;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 200, height: 600 });
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLActivitySwimlane.prototype.render = function (canvas) {
        return [this];
    };
    UMLActivitySwimlane.features = {
        connectable: false,
        droppable: true,
        hoverable: true,
        movable: true,
        resizable: true,
        selectable: true,
        updatable: true,
        alternativePortVisualization: false,
    };
    return UMLActivitySwimlane;
}(uml_element_1.UMLElement));
exports.UMLActivitySwimlane = UMLActivitySwimlane;
//# sourceMappingURL=uml-activity-swimlane.js.map