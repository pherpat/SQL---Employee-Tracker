-- Add your code below and execute file in MySQL Shell --
CREATE TABLE employee_info (
);

INSERT INTO employee_info
SELECT
  e.id,
  e.first_name,
  e.last_name,
  r.title,
  d.name AS department,
  r.salary,
  CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;


