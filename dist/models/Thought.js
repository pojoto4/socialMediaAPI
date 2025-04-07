import { Schema, model, Types } from "mongoose";
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    // Remove createdAt field definition
}, {
    _id: false,
    timestamps: true, // This will add createdAt and updatedAt
    toJSON: {
        getters: true,
    },
});
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
    // Remove createdAt field definition
}, {
    timestamps: true, // This will add createdAt and updatedAt
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
// Virtual to get reaction count
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});
const Thought = model("Thought", thoughtSchema);
export default Thought;
