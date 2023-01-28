INSERT INTO department (name)
VALUES  ('Finance'),
        ('IT'),
        ('Human Resource');

INSERT INTO role (title, salary, department_id)
VALUES ('Marketing Department', 83100, 1), 
    ('Operations', 73200, 1), 
    ('Sales Department', 74300, 2), 
    ('Purchase Department', 73400, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Jen', 'Patino', 1, NULL),
    ('Mateo', 'Scherschligt', 2, 1), 
    ('Lucas', 'Smith', 3, 1), 
    ('Pam', 'Tamayo', 3, 1), 
    ('Moana', 'White', 3, 1), 
    ('Zach', 'Nicholls', 3, 1), 
    ('Jason', 'Williams', 3, 1),
    ('Jessica', 'Davis', 4, 2),
    ('Aaron', 'Brown', 4, 2),
    ('Heidi', 'Johnson', 4, 2);

