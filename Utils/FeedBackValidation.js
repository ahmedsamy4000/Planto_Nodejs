const Ajv=require('ajv');
const ajv=new Ajv();




let FeedBackSchema={
    type:"object",
    properties:{
        userID:{type:"number"},
        body:{type:"string"},
        date:{type: "string"},
    },
    required:["userID","body","date"],
    additionalProperties:false
}

module.exports=ajv.compile(FeedBackSchema);