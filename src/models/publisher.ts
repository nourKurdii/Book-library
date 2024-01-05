import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../config/db'

export interface publisherInstance extends Model {
    name: string
    country: string
}
const publisher = sequelize.define<publisherInstance>('publishers',
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
          },
    },
    country: {
        type: DataTypes.STRING
    }
},{
    timestamps: false,
    tableName: 'publishers'
})
export default publisher