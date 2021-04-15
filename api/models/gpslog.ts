import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript';

@Table({
  modelName: 'gpslog',
  tableName: 'gpslog',
})
export class Gpslog extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @Column(DataType.STRING)
  filepath!: string;

  @Column(DataType.STRING)
  filename!: string;

  @Column(DataType.INTEGER)
  record_id!: number;

  @Column(DataType.INTEGER)
  area_id!: number;

  @Column(DataType.INTEGER)
  user_id!: number;

  @Column(DataType.DATE)
  date!: Date;
}
