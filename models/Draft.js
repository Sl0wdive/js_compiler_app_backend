import mongoose from "mongoose";

const DraftSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { 
        timestamps: true 
    }
);
  
 
export default mongoose.model('Draft', DraftSchema);