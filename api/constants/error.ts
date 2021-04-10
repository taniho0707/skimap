export type ErrorCode = {
  status: number
  type: string
  message: string
};

/**
 * パラメーターが誤っている場合のエラー
 */
export const PARAMETER_INVALID: ErrorCode = {
  status: 400,
  type: 'PARAMETER_INVALID',
  message: 'The parameter is invalid.',
};

/**
 * データが存在しない場合のエラー
 */
export const NO_DATA_EXISTS: ErrorCode = {
  status: 400,
  type: 'NO_DATA_EXISTS',
  message: 'No data exists.',
};

/**
 * 重複データを追加しようとした場合のエラー
 */
 export const USER_EXISTS: ErrorCode = {
  status: 400,
  type: 'USER_EXISTS',
  message: 'The username is already exists',
};

/**
 * 重複データを追加しようとした場合のエラー
 */
 export const AREA_EXISTS: ErrorCode = {
  status: 400,
  type: 'AREA_EXISTS',
  message: 'The area is already exists',
};
