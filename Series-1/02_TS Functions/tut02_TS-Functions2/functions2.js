"use strict";
exports.__esModule = true;
exports.getName = void 0;
;
//
var getName = function (user) {
    var _a, _b;
    //return `${user?.first} ${user?.last}`;
    return "".concat((_a = user === null || user === void 0 ? void 0 : user.first) !== null && _a !== void 0 ? _a : 'first', " ").concat((_b = user === null || user === void 0 ? void 0 : user.last) !== null && _b !== void 0 ? _b : 'last');
};
exports.getName = getName;
