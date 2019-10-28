-- custom types
-- Type: state
CREATE TYPE state AS ENUM ('to do', 'done', 'doing');

-- tables
-- Table: goal
CREATE TABLE muskify.goal (
    id serial  NOT NULL,
    name text  NOT NULL,
    description text  NULL,
    user_id int  NOT NULL,
    CONSTRAINT goal_ak_1 UNIQUE (name, user_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT goal_pk PRIMARY KEY (id)
);

-- Table: goal_tag
CREATE TABLE muskify.goal_tag (
    id serial  NOT NULL,
    goal_id int  NOT NULL,
    tag_id int  NOT NULL,
    CONSTRAINT goal_tags_ak_1 UNIQUE (goal_id, tag_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT goal_tag_pk PRIMARY KEY (id)
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
    description text  NULL,
    date date  NOT NULL,
    state state  NOT NULL,
    user_id int  NOT NULL,
    CONSTRAINT task_ak_1 UNIQUE (name, date, user_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT task_pk PRIMARY KEY (id)
);

-- Table: task_goal
CREATE TABLE muskify.task_goal (
    id serial  NOT NULL,
    goal_id int  NOT NULL,
    task_id int  NOT NULL,
    CONSTRAINT tasks_goals_ak_1 UNIQUE (goal_id, task_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT task_goal_pk PRIMARY KEY (id)
);

-- Table: task_tag
CREATE TABLE muskify.task_tag (
    id serial  NOT NULL,
    task_id int  NOT NULL,
    tag_id int  NOT NULL,
    CONSTRAINT task_tags_ak_1 UNIQUE (task_id, tag_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT task_tag_pk PRIMARY KEY (id)
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
-- Reference: goal_tags_goal (table: goal_tag)
ALTER TABLE muskify.goal_tag ADD CONSTRAINT goal_tags_goal
    FOREIGN KEY (goal_id)
    REFERENCES muskify.goal (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: goal_tags_tag (table: goal_tag)
ALTER TABLE muskify.goal_tag ADD CONSTRAINT goal_tags_tag
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

-- Reference: task_tags_tag (table: task_tag)
ALTER TABLE muskify.task_tag ADD CONSTRAINT task_tags_tag
    FOREIGN KEY (tag_id)
    REFERENCES muskify.tag (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: task_tags_task (table: task_tag)
ALTER TABLE muskify.task_tag ADD CONSTRAINT task_tags_task
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

-- Reference: tasks_goals_goal (table: task_goal)
ALTER TABLE muskify.task_goal ADD CONSTRAINT tasks_goals_goal
    FOREIGN KEY (goal_id)
    REFERENCES muskify.goal (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: tasks_goals_task (table: task_goal)
ALTER TABLE muskify.task_goal ADD CONSTRAINT tasks_goals_task
    FOREIGN KEY (task_id)
    REFERENCES muskify.task (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.
