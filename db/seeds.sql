INSERT INTO department (id, name)
VALUES (001, 'Finance'),
        (002, 'IT'),
        (003, 'Human Resource');

INSERT INTO role (id, title, salary, department_id)
VALUES ('Marketing Department', 3100, 1), ('Operations', 3200, 1), ('Sales Department', 4300, 2), ('Purchase Department', 3400, 2);

INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES 
    ('Jen', 'Patino', 1, null),
    ('Mateo', 'Scherschligt', 2, 1), 
    ('Lucas', 'Smith', 3, 1), 
    ('Pam', 'Tamayo', 3, 1), 
    ('Moana', 'White', 3, 1), 
    ('Zach', 'Nicholls', 3, 1), 
    ('Jason', 'Williams', 3, 1),
    ('Jessica', 'Davis', 4, 2),
    ('Aaron', 'Brown', 4, 2),
    ('Heidi', 'Johnson', 4, 2);
