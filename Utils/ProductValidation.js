const Ajv = require('ajv');
const ajv = new Ajv();

const ProductSchema = {
    type: "object",
    properties: {
        name: { type: "string", pattern: "^[a-zA-Z]*$" },
        price: { type: "string" },
        description: { type: "string" },
        images: { type: "array", items: { type: "string" } },
        stock: { type: "number", minimum: 0 },
        category: { type: "string", enum: ['Indoor', 'Outdoor', 'Both'] },
        count: { type: "number" },
        rate: { type: "number", minimum: 1, maximum: 5 }
    },
    required: ["name", "price", "description", "images", "stock", "category", "count", "rate"],
    additionalProperties: false
};

module.exports = ajv.compile(ProductSchema);
