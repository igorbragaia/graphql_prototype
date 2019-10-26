-- custom types
-- Type: state
CREATE TYPE state AS ENUM ('to do', 'done', 'doing');

-- tables
-- Table: goal
CREATE TABLE muskify.goal (
    id serial  NOT NULL,
    name text  NOT NULL,
    description int  NULL,
    user_id int  NOT NULL,
    CONSTRAINT goal_ak_1 UNIQUE (name) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT goal_pk PRIMARY KEY (id)
);

-- Table: goal_tags
CREATE TABLE muskify.goal_tags (
    id serial  NOT NULL,
    goal_id int  NOT NULL,
    tag_id int  NOT NULL,
    CONSTRAINT goal_tags_ak_1 UNIQUE (goal_id, tag_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT goal_tags_pk PRIMARY KEY (id)
);

-- Table: tag
CREATE TABLE muskify.tag (
    id serial  NOT NULL,
    name text  NOT NULL,
    user_id int  NOT NULL,
    CONSTRAINT tag_ak_1 UNIQUE (name, user_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT tag_pk PRIMARY KEY (id)
);

-- Table: task
CREATE TABLE muskify.task (
    id serial  NOT NULL,
    name text  NOT NULL,
    description int  NULL,
    date date  NOT NULL,
    state text  NOT NULL,
    user_id int  NOT NULL,
    CONSTRAINT task_ak_1 UNIQUE (name, date) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT task_pk PRIMARY KEY (id)
);

-- Table: task_tags
CREATE TABLE muskify.task_tags (
    id serial  NOT NULL,
    task_id int  NOT NULL,
    tag_id int  NOT NULL,
    CONSTRAINT task_tags_ak_1 UNIQUE (task_id, tag_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT task_tags_pk PRIMARY KEY (id)
);

-- Table: tasks_goals
CREATE TABLE muskify.tasks_goals (
    id serial  NOT NULL,
    goal_id int  NOT NULL,
    task_id int  NOT NULL,
    CONSTRAINT tasks_goals_ak_1 UNIQUE (goal_id, task_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT tasks_goals_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE muskify."user" (
    id serial  NOT NULL,
    username text  NOT NULL,
    password text  NOT NULL,
    email text  NOT NULL,
    CONSTRAINT user_ak_1 UNIQUE (username, password, email) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT id PRIMARY KEY (id)
);

-- foreign keys
-- Reference: goal_tags_goal (table: goal_tags)
ALTER TABLE muskify.goal_tags ADD CONSTRAINT goal_tags_goal
    FOREIGN KEY (goal_id)
    REFERENCES muskify.goal (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: goal_tags_tag (table: goal_tags)
ALTER TABLE muskify.goal_tags ADD CONSTRAINT goal_tags_tag
    FOREIGN KEY (tag_id)
    REFERENCES muskify.tag (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: goal_user (table: goal)
ALTER TABLE muskify.goal ADD CONSTRAINT goal_user
    FOREIGN KEY (user_id)
    REFERENCES muskify."user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: tag_user (table: tag)
ALTER TABLE muskify.tag ADD CONSTRAINT tag_user
    FOREIGN KEY (user_id)
    REFERENCES muskify."user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: task_tags_tag (table: task_tags)
ALTER TABLE muskify.task_tags ADD CONSTRAINT task_tags_tag
    FOREIGN KEY (tag_id)
    REFERENCES muskify.tag (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: task_tags_task (table: task_tags)
ALTER TABLE muskify.task_tags ADD CONSTRAINT task_tags_task
    FOREIGN KEY (task_id)
    REFERENCES muskify.task (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: task_user (table: task)
ALTER TABLE muskify.task ADD CONSTRAINT task_user
    FOREIGN KEY (user_id)
    REFERENCES muskify."user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: tasks_goals_goal (table: tasks_goals)
ALTER TABLE muskify.tasks_goals ADD CONSTRAINT tasks_goals_goal
    FOREIGN KEY (goal_id)
    REFERENCES muskify.goal (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: tasks_goals_task (table: tasks_goals)
ALTER TABLE muskify.tasks_goals ADD CONSTRAINT tasks_goals_task
    FOREIGN KEY (task_id)
    REFERENCES muskify.task (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.
