import { RowDataPacket } from "mysql2";
import pool from "../../util/mysql";

class UserCounter {
  private static instance: UserCounter;
  public count: number;
  private initializedPromise: Promise<void>;

  private constructor() {
    this.count = 0;
    this.initializedPromise = this.initialize();
  }

  public static getInstance(): UserCounter {
    if (!UserCounter.instance) {
      UserCounter.instance = new UserCounter();
    }
    return UserCounter.instance;
  }

  private async initialize() {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM user");
    this.count = rows[0].count;
  }

  public async getCount(): Promise<number> {
    await this.initializedPromise;
    return this.count;
  }
}

const userCounter = UserCounter.getInstance();
export default userCounter;
