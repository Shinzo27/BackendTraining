import {Company, User} from "../Models/index.js"

export const getEmployeeFromCompany = (req, res) => {
    const users = User.findAll({
        include: Company
    })

    return res.json({
        users
    })
}