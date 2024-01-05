import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../config/db'

interface sessionInstance extends Model {
    sessionId: string;
    userId: number;
} 

const session = sequelize.define<sessionInstance>('sessions', {
    sessionId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'sessions'
})
export {
    session,
    sessionInstance
} 