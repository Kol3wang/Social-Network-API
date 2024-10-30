import { Schema, model, Document, Types } from 'mongoose';
import { dateFormat } from '../utils/dateFormat';

interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

// Define the Reaction schema as a subdocument for the Thought model
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Schema.Types.Date, default: Date.now },
  },
  { id: false }
);

// Define the Thought schema
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  { id: false }
);

// Virtual to retrieve the length of the reactions array
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions ? this.reactions.length : 0;
});

// Override toJSON to apply date formatting
thoughtSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.createdAt = dateFormat(ret.createdAt);
    ret.reactions = ret.reactions.map((reaction: IReaction) => ({
      ...reaction,
      createdAt: dateFormat(reaction.createdAt),
    }));
    return ret;
  },
});

// Export the Thought model
const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;