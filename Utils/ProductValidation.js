const Ajv=require('ajv');
const ajv=new Ajv();




let ProductSchema={
    type:"object",
    properties:{
        name:{type:"string",pattern:"^[a-zA-Z]*$"},
    },
    required:["name"],
    additionalProperties:false
}

module.exports=ajv.compile(ProductSchema);