SELECT employees.id, first_name, last_name, title, salary, department.name 
FROM employees
INNER JOIN roles
ON employees.role_id = role.id
INNER JOIN department
ON roles.department_id = department.id
