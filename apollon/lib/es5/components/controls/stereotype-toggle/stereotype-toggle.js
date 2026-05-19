"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StereotypeToggle = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var stereotype_on_1 = require("../icon/stereotype-on");
var stereotype_off_1 = require("../icon/stereotype-off");
var button_1 = require("../button/button");
var StereotypeToggle = /** @class */ (function (_super) {
    tslib_1.__extends(StereotypeToggle, _super);
    function StereotypeToggle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StereotypeToggle.prototype.render = function () {
        var _a = this.props, value = _a.value, onChange = _a.onChange;
        return (react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, onClick: onChange }, value ? react_1.default.createElement(stereotype_on_1.StereotypeOnIcon, null) : react_1.default.createElement(stereotype_off_1.StereotypeOffIcon, null)));
    };
    return StereotypeToggle;
}(react_1.Component));
exports.StereotypeToggle = StereotypeToggle;
//# sourceMappingURL=stereotype-toggle.js.map