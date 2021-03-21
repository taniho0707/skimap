import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript'

@Table({
  modelName: 'skimap',
  tableName: 'skimap',
})
export class Skimap extends Model<Skimap> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  readonly id!: number

  @Column(DataType.STRING)
  name!: string

  @Column(DataType.STRING)
  description!: string
}
