import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';

export interface ICommentModel extends mongoose.Document {
    content: string,
    user: any,
    post: any,
    child: [any],
    createdAt: Date,
    updatedAt: Date,
}

export const CommentSchema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    child: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    createdAt: {type: Date},
    updatedAt: {type: Date}
});

CommentSchema.pre('save', function (next) {
    let now = new Date();

    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }

    next();
});

export const CommentModel = mongoose.model<ICommentModel>("Comment", CommentSchema);