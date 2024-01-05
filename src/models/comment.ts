import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../config/db'
export interface commentInstance extends Model {
    name: string;
    comment: string;
    book_id: number;
    stars?: number;
}
const comment = sequelize.define<commentInstance>('comments',
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stars: {
        type: DataTypes.INTEGER,
        validate: {
            isNumeric: true,
            max: {
              args: [5], 
              msg: 'Value must be less than or equal to 5',
            },
            min : 0
          },
    }
},{
    timestamps: false,
    tableName: 'comments'
}) 

export default comment