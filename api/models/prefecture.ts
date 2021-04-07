import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  modelName: 'prefecture',
  tableName: 'prefecture',
})
export class Prefecture extends Model<Prefecture> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  readonly id!: number;

  @Column(DataType.STRING)
  readonly name!: string;
}
