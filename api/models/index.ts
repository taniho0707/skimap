import log4js from 'log4js';
import { Sequelize } from 'sequelize-typescript';
import { dbSetting } from './settings/db_settings';
import { Prefecture } from './prefecture';
import { User } from './user';
import { Area } from './area';

const logger = log4js.getLogger('mysql');

export default new Sequelize({
  dialect: 'mysql',
  timezone: '+09:00',
  port: 3306,
  host: process.env.NODE_TEST==='1' ? 'db_test' : 'db',
  username: dbSetting['user'],
  password: dbSetting['password'],
  database: dbSetting['database'],
  logging: (sql: string) => {
    logger.info(sql)
  },
  define: { timestamps: false, underscored: true },
  pool: { max: 5, min: 0, idle: 10000, acquire: 30000 },
  models: [Prefecture, User, Area],
})

export { Prefecture, User, Area };
