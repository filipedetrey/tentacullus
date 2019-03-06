"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remakeString = (string) => {
    var length = string.length;
    var remake = "";
    for (let i = 0; i < length; i++) {
        if (string.charAt(i) === string.charAt(i).toUpperCase()) {
            remake += " " + string.charAt(i);
        }
        else
            remake += string.charAt(i);
    }
    return remake.charAt(0).toUpperCase() + remake.slice(1);
};
//# sourceMappingURL=functions.js.map