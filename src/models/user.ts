import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/db'
import bcrypt from 'bcrypt'
import {findUser} from '../controllers/authenticationController'
export interface UserInstance extends Model {
    id: number
    email: string
    password: string
    // comparePassword: (enteredPass: string, callback: (err: Error | null, match?: boolean) => void) => void;
}

const user = sequelize.define<UserInstance>('users',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    timestamps: false,
    tableName: 'users'
})


user.beforeSave(async (thisUser: any) => {
    if (thisUser.changed('password') || thisUser.isNewRecord) {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(thisUser.password, salt)
        thisUser.password = hashedPass
    }
})

user.beforeValidate(async (thisUser: any) => {
    console.log(thisUser.password)
    if (thisUser.isNewRecord || thisUser.changed('password')) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!thisUser.password.match(passwordPattern)) {
            throw new Error('Password does not meet requirements: It must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and special characters');
        }
    } else if (thisUser.changed('email')) {
        const foundUser = await findUser(thisUser.email)
        if (foundUser) {
            throw new Error('Email already exists')
        }
    }
})

// user.prototype.comparePassword = async function(enteredPasss: string, callBack: (err: Error | null, passMatch?: boolean) => void) {
//     {
//     bcrypt.compare(enteredPasss, this.password, (err, passMatch) => {
//         if(err) {
//             return callBack(err)
//         }
//         else {
//             callBack(null, passMatch )
//         }

//     })
//     }
// }
export default user