CREATE INDEX idx_user_id ON user (user_id);

CREATE INDEX idx_office_id ON user (office_id);

SELECT user_id, user_name, office_id, user_icon_id
FROM user
WHERE user_id IN (
    SELECT user_id
    FROM user
    ORDER BY RAND()
    LIMIT N
);