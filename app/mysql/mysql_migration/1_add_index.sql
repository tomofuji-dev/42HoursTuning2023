-- userテーブル
ALTER TABLE `user` ADD INDEX `idx_mail` (`mail`);
ALTER TABLE `user` ADD INDEX `idx_user_name` (`user_name`);
ALTER TABLE `user` ADD INDEX `idx_goal` (`goal`(100));
ALTER TABLE `user` ADD INDEX `idx_entry_date` (`entry_date`);
ALTER TABLE `user` ADD INDEX `idx_kana` (`kana`);
ALTER TABLE `user` ADD INDEX `idx_office_id` (`office_id`);
ALTER TABLE `user` ADD INDEX `idx_user_icon_id` (`user_icon_id`);

-- sessionテーブル
ALTER TABLE `session` ADD INDEX `idx_linked_user_id` (`linked_user_id`);

-- departmentテーブル
ALTER TABLE `department` ADD INDEX `idx_department_name` (`department_name`);

-- roleテーブル
ALTER TABLE `role` ADD INDEX `idx_role_name` (`role_name`);

-- department_role_memberテーブル
ALTER TABLE `department_role_member` ADD INDEX `idx_department_id` (`department_id`);
ALTER TABLE `department_role_member` ADD INDEX `idx_role_id` (`role_id`);
ALTER TABLE `department_role_member` ADD INDEX `idx_user_id` (`user_id`);

-- officeテーブル
ALTER TABLE `office` ADD INDEX `idx_office_name` (`office_name`);

-- fileテーブル
ALTER TABLE `file` ADD INDEX `idx_file_name` (`file_name`);

-- skillテーブル
ALTER TABLE `skill` ADD INDEX `idx_skill_name` (`skill_name`);

-- skill_memberテーブル
ALTER TABLE `skill_member` ADD INDEX `idx_skill_id` (`skill_id`);
ALTER TABLE `skill_member` ADD INDEX `idx_user_id` (`user_id`);

-- match_groupテーブル
ALTER TABLE `match_group` ADD INDEX `idx_match_group_name` (`match_group_name`);

-- match_group_memberテーブル
ALTER TABLE `match_group_member` ADD INDEX `idx_user_id` (`user_id`);
