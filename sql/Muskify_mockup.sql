INSERT INTO muskify.user (username, password, email )VALUES 
    ('igorbragaia', '1234', 'igor.bragaia@gmail.com'),
    ('jairobastos', '1234', 'ritterbastos@gmail.com'),
    ('carlosmatheus', '1234', 'carlos.matheus.b.s@gmail.com');

INSERT INTO muskify.goal (name, user_id ) VALUES 
    ('Estudar CES-27: fazer lista 1,2,3', 1),
    ('Malhar 3x na semana 40 minutos', 1);

INSERT INTO muskify.task (name, date, state, user_id) VALUES
    ('Ir na academia', to_date('2019-10-22', 'YYYY-MM-DD'), 'to do', 1),
    ('Fazer lista 1 até exercício 8', to_date('2019-10-22', 'YYYY-MM-DD'), 'doing', 1),
    ('Fazer lista 2 física', to_date('2019-10-22', 'YYYY-MM-DD'), 'done', 1),
    ('Fazer lista 3 física', to_date('2019-10-23', 'YYYY-MM-DD'), 'to do', 1);

INSERT INTO muskify.tasks_goals (goal_id, task_id) VALUES 
    (1, 2),
    (2, 1);

INSERT INTO muskify.tag (name, user_id) VALUES 
    ('academia', 1),
    ('ITA', 1),
    ('sugação', 1),
    ('comp', 1);

INSERT INTO muskify.task_tags (task_id, tag_id) VALUES 
    (1, 1),
    (2, 2),
    (2, 3),
    (2, 4),
    (3, 2),
    (3, 3);

INSERT INTO muskify.goal_tags (goal_id, tag_id) VALUES 
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 1),
    (2, 3);