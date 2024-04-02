const Ajv=require('ajv');
const ajv=new Ajv();


ajv.addFormat('date-time', {
    validate: (dateTimeString) => dateTimeRegex.test(dateTimeString)
  })



let FeedBackSchema={
    type:"object",
    properties:{
        userID:{type:"number"},
        body:{type:"string"},
        date:{type: "string", format: "date-time"},
    },
    required:["userID","body"],
    additionalProperties:false
}

module.exports=ajv.compile(FeedBackSchema);