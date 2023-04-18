import { Document, Types } from 'mongoose'

export type MongoDocument<T> = (Document<unknown, {}, T> & Omit<T & {
  _id: Types.ObjectId;
}, never>)