-- Creating tables
DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

-- DEPARTMENT TABLE --
CREATE TABLE department (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);

-- ROLE TABLE ----
CREATE TABLE role (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id)
);


-- EMPLOYEE ----
CREATE TABLE employee (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT DEFAULT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);


