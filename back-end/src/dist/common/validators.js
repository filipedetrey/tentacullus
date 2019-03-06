"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regex = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    telefone: /\(\d{2}\)\s\d{4,5}-?\d{4}/g,
    cep: /^\d{2}\.\d{3}\-\d{3}$/
};
//# sourceMappingURL=validators.js.map