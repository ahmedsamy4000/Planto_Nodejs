const Ajv=require('ajv');
const ajv=new Ajv();

ajv.addFormat('date-time', {
    validate: (dateTimeString) => dateTimeRegex.test(dateTimeString)
  })

let ReceiptSchema={
    type:"object",
    properties:{
        user: {type: "string"},
        product: {type: "array", minItems: 1},
        date: {type: "string", format: "date-time"},
        totalPrice: {type:"number", minimum: 1}
    },
    required:["product", "totalPrice", "user"],
    additionalProperties:false
}

module.exports=ajv.compile(ReceiptSchema);