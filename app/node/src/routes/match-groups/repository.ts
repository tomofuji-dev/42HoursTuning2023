import { RowDataPacket } from "mysql2";
import pool from "../../util/mysql";
import { MatchGroup, MatchGroupDetail } from "../../model/types";
import { getUsersByUserIds } from "../users/repository";
import { convertToMatchGroupDetail } from "../../model/utils";

export const hasSkillNameRecord = async (
  skillName: string
): Promise<boolean> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM skill WHERE skill_name = ? LIMIT 1",
    [skillName]
  );
  return rows.length > 0;
};

export const getUserIdsBeforeMatched = async (
  userId: string
): Promise<string[]> => {
  const [userIdRows] = await pool.query<RowDataPacket[]>(
    `
    SELECT m2.user_id
    FROM match_group_member m1
    JOIN match_group_member m2 ON m1.match_group_id = m2.match_group_id
    WHERE m1.user_id = ?
    AND m2.user_id != ?
    `,
    [userId, userId]
  );

  return userIdRows.map((row) => row.user_id);
};

export const insertMatchGroup = async (matchGroupDetail: MatchGroupDetail) => {
  await pool.query<RowDataPacket[]>(
    "INSERT INTO match_group (match_group_id, match_group_name, description, status, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [
      matchGroupDetail.matchGroupId,
      matchGroupDetail.matchGroupName,
      matchGroupDetail.description,
      matchGroupDetail.status,
      matchGroupDetail.createdBy,
      matchGroupDetail.createdAt,
    ]
  );

  const memberInsertValues = matchGroupDetail.members.map((member) => {
    return `(${pool.escape(matchGroupDetail.matchGroupId)}, ${pool.escape(member.userId)})`;
  }).join(', ');

  await pool.query<RowDataPacket[]>(
    `INSERT INTO match_group_member (match_group_id, user_id) VALUES ${memberInsertValues}`
  );
};

export const getMatchGroupDetailByMatchGroupId = async (
  matchGroupId: string,
  status?: string
): Promise<MatchGroupDetail | undefined> => {
  let query =
    "SELECT match_group_id, match_group_name, description, status, created_by, created_at FROM match_group WHERE match_group_id = ?";
  if (status === "open") {
    query += " AND status = 'open'";
  }
  const [matchGroup] = await pool.query<RowDataPacket[]>(query, [matchGroupId]);
  if (matchGroup.length === 0) {
    return;
  }

  const [matchGroupMemberIdRows] = await pool.query<RowDataPacket[]>(
    "SELECT user_id FROM match_group_member WHERE match_group_id = ?",
    [matchGroupId]
  );
  const matchGroupMemberIds: string[] = matchGroupMemberIdRows.map(
    (row) => row.user_id
  );

  const members = await getUsersByUserIds(matchGroupMemberIds);
  matchGroup[0].members = members;

  return convertToMatchGroupDetail(matchGroup[0]);
};

export const getMatchGroupIdsByUserId = async (
  userId: string
): Promise<string[]> => {
  const [matchGroupIds] = await pool.query<RowDataPacket[]>(
    "SELECT match_group_id FROM match_group_member WHERE user_id = ?",
    [userId]
  );
  return matchGroupIds.map((row) => row.match_group_id);
};

export const getMatchGroupsByMatchGroupIds = async (
  matchGroupIds: string[],
  status: string
): Promise<MatchGroup[]> => {
  const matchGroupDetails = await Promise.all(matchGroupIds.map(matchGroupId => getMatchGroupDetailByMatchGroupId(matchGroupId, status)));
  
  let matchGroups: MatchGroup[] = matchGroupDetails.filter(Boolean).map(detail => {
    const { description: _description, ...matchGroup } = detail!;
    return matchGroup;
  });

  return matchGroups;
};
