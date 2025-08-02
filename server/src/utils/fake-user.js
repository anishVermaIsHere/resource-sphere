import UserModel from "../database/models/user.model.js";
import encrypt from "./encrypt.js";

const fakeUser = {
    firstName: "Robin",
    lastName: "K",
    fullName: "Robin K",
    userName: "thisisrobin",
    email: "robin@dc.com",
    password: "dcrobin#2025",
    avatar: ""
};


async function createFakeUser(){
    const user = {
        ...fakeUser,
        password: encrypt.hashPassword(fakeUser.password)
    };

  await UserModel.create(user);
};

export default createFakeUser;