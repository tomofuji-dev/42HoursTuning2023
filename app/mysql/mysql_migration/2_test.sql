CREATE INDEX idx_user_id ON `user` (`user_id`);
CREATE INDEX idx_mail ON `user` (`mail`);
CREATE INDEX idx_linked_user_id ON `session` (`linked_user_id`);
CREATE INDEX idx_department_id ON `department_role_member` (`department_id`);
CREATE INDEX idx_role_id ON `department_role_member` (`role_id`);
CREATE INDEX idx_user_id ON `department_role_member` (`user_id`);
CREATE INDEX idx_created_by ON `match_group` (`created_by`);
CREATE INDEX idx_user_id ON `match_group_member` (`user_id`);

CREATE TABLE `department_role_member` (
    `department_role_member_id` INT NOT NULL AUTO_INCREMENT,
    `department_id` VARCHAR(36) NOT NULL,
    `role_id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `entry_date` DATE NOT NULL,
    `belong` TINYINT(1) NOT NULL DEFAULT '1',
    PRIMARY KEY (`department_role_member_id`),
    FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
    FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);