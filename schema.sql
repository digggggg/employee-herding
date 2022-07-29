DROP database herd_db;
CREATE database herd_db;

USE herd_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) UNIQUE NOT NULL,
    role_salary DECIMAL(6,2),
    department_id INT,
    FOREIGN KEY(department_id) REFERENCES department.id,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name  VARCHAR(30) UNIQUE NOT NULL,
    last_name VARCHAR(30) UNIQUE NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY(role_id) REFERENCES role.id,
    FOREIGN KEY(manager_id) REFERENCES employee.id,
    PRIMARY KEY (id)
);