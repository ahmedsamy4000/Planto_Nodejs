const Ajv = require('ajv');
const ajv = new Ajv();


let UserSchema = {
    type: "object",
    properties: {
        name: { type: "string", pattern: "^[a-z A-Z]*$" },
        email: { type: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" },
        password: { type: "string", minLength: 8 },
        gender: { type: "string", maxLength: 1 },
        age: { type: "number" },
        address: { type: "object" },
        phone: { type: "string", pattern: "^(010|011|012|015)[0-9]{8}$"}
    },
    required: ["name", "email", "password", "gender", "age", "address", "phone"],
    additionalProperties: false
}

module.exports = ajv.compile(UserSchema);