CREATE INDEX idx_user_id ON `user` (`user_id`);
CREATE INDEX idx_mail ON `user` (`mail`);
CREATE INDEX idx_linked_user_id ON `session` (`linked_user_id`);
CREATE INDEX idx_department_id ON `department_role_member` (`department_id`);
CREATE INDEX idx_role_id ON `department_role_member` (`role_id`);
CREATE INDEX idx_user_id ON `department_role_member` (`user_id`);
CREATE INDEX idx_created_by ON `match_group` (`created_by`);
CREATE INDEX idx_user_id ON `match_group_member` (`user_id`);

max_connections = 200

query_cache_type = 1
query_cache_size = 256M

innodb_buffer_pool_size = 1G
key_buffer_size = 256M

import redis
import json

r = redis.Redis(host='localhost', port=6379, db=0)

def get_data_from_cache(key):
    cached_data = r.get(key)
    if cached_data:
        return json.loads(cached_data)
    else:
        return None

def save_data_to_cache(key, data):
    r.set(key, json.dumps(data))

def get_user_data(user_id):
    cached_data = get_data_from_cache(f'user:{user_id}')
    if cached_data:
        return cached_data

    db_data = execute_sql_query(f'SELECT * FROM user WHERE user_id = {user_id}')
    save_data_to_cache(f'user:{user_id}', db_data)

    return db_data