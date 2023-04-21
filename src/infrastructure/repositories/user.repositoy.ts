import { Model } from "mongoose";
import { IUser } from "../database/schemas";
import { UserRepository } from "@/domain/services";
import { db } from '@/infrastructure/database';
import { ErrorWidthCode, User } from "@/domain/models";
import { MongoDocument } from "../database/common";

type DTOUser = MongoDocument<IUser>

const mapToDomain = (user: DTOUser): User => ({
  email: user.email,
  _id: user._id,
  name: user.name,
  role: user.role
})

export const userServerRepository = (userModel: Model<IUser>): UserRepository => ({
  register: async (email: string, name: string) => {
    await db.connect();

    const user = await userModel.findOne({ email }).lean();
    if (user) return mapToDomain(user);

    const newUser = new userModel({ email, name, password: '@', role: 'client' });
    await newUser.save();

    await db.disconnect();

    return mapToDomain(newUser);;
  }
})