import { Schema, model, Types } from "mongoose";

// Reaction schema (subdocument)
interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

interface IThought {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
}

const reactionSchema = new Schema<IReaction>(
  {
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
  },
  {
    _id: false,
    timestamps: true, // This will add createdAt and updatedAt
    toJSON: {
      getters: true,
    },
  }
);

const thoughtSchema = new Schema<IThought>(
  {
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
  },
  {
    timestamps: true, // This will add createdAt and updatedAt
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual to get reaction count
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model<IThought>("Thought", thoughtSchema);

export default Thought;
