ALTER TABLE `user` ADD FULLTEXT (`user_name`, `kana`, `mail`, `goal`);

ALTER TABLE `department` ADD FULLTEXT (`department_name`);

ALTER TABLE `role` ADD FULLTEXT (`role_name`);

ALTER TABLE `office` ADD FULLTEXT (`office_name`);

ALTER TABLE `skill` ADD FULLTEXT (`skill_name`);
