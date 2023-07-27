const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const posterSchema = new Schema(
    {
        script: {
            type: String
        },

        AWSKey: {
            type: String, 
            required: true
        },
        email: {
            type: String
        }
    }

)



module.exports = mongoose.model("Image", posterSchema);