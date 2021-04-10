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
  modelName: 'area',
  tableName: 'area',
})
export class Area extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.INTEGER)
  prefecture!: number;

  @Column(DataType.INTEGER)
  area_id!: number;

  @Unique
  @Column(DataType.STRING)
  name!: string;

  @Unique
  @Column(DataType.STRING)
  fullname!: string;

  @Unique
  @Column(DataType.STRING)
  official_url!: string;
}
