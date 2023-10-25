SELECT employees.id, first_name, last_name, title, salary, departments.name 
FROM employees
INNER JOIN roles
ON employees.roles_id = roles.id
INNER JOIN departments
ON roles.department_id = departments.id
