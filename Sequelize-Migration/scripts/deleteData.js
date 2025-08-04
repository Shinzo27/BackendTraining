import User from "../Models/User.js"

export const deleteUser = async(id) => {
    const user = await User.destroy({
        where: {
            id: Number(id)
        }
    })

    return user ? {
        message: "User Deleted!"
    } : {
        message: "Not found!"
    }
}