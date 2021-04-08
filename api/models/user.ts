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
  modelName: 'user',
  tableName: 'user',
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @Column(DataType.STRING)
  name!: string;

  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  hash!: string;
}
