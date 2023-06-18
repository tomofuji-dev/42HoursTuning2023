import { RowDataPacket } from 'mysql2';
import pool from '../../util/mysql';
import { User } from '../../model/types';
import { convertToUsers } from '../../model/utils';

class UserCache {
  private static instance: UserCache | null = null;
  private cache: User[] = [];

  private constructor() {
    (async () => {
      await this.refreshCache();
    })();
  }

  private async refreshCache(): Promise<void> {
    const query = `
      SELECT 
        user.user_id, 
        user.user_name, 
        user.office_id, 
        user.user_icon_id, 
        office.office_name, 
        file.file_name
      FROM 
        user 
      LEFT JOIN 
        office ON user.office_id = office.office_id
      LEFT JOIN 
        file ON user.user_icon_id = file.file_id
      ORDER BY 
        user.entry_date ASC, 
        user.kana ASC
    `;

    const [rows] = await pool.query<RowDataPacket[]>(query);
    this.cache = convertToUsers(rows);
  }

  public static async getInstance(): Promise<UserCache> {
    if (!UserCache.instance) {
      UserCache.instance = new UserCache();
      await UserCache.instance.refreshCache();
    }

    return UserCache.instance;
  }

  public getUsers(limit: number, offset: number): User[] {
    return this.cache.slice(offset, offset + limit);
  }
}

export default (async () => {
  return await UserCache.getInstance();
})();
