import db from "../Lib/db.js"
import User from "../Models/User.js"

export const updateUser = async(id, name, email, password) => {
    const user = await User.update({
        name,
        email,
        password
    }, { where: { id }})

    console.log(user);
    return user === 1  ? {
        message: "User updated!"
    } : {
        message: "Not found!"
    }
}