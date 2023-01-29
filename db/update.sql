UPDATE employees 
SET role_id = :new_role_id 
WHERE employee_id = :employee_id;
