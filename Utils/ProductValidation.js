const Ajv = require('ajv');
const ajv = new Ajv();

const ProductSchema = {
    type: "object",
    properties: {
        name: { type: "string", pattern: "^[a-zA-Z]*$" },
        price: { type: "string" },
        description: { type: "string" },
        images: { type: "array"},
        stock: { type: "number", minimum: 0 },
        category: { type: "string", enum: ['Indoor', 'Outdoor', 'Both'] },
        count: { type: "number" },
        rate: { type: "number", minimum: 0, maximum: 5 },
        numberOfRates: { type: "number", minimum: 0}
    },
    required: ["name", "price", "description", "images", "stock", "category", "count", "rate","numberOfRates"],
    additionalProperties: true
};

module.exports = ajv.compile(ProductSchema);
