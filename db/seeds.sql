INSERT INTO department (department_name)
VALUES ("Sales"),
        ("Finance"),
        ("IT"),
        ("Legal"),
        ("Engineering");

INSERT INTO role (id, title, salary, department_id) 
VALUES
        (001, "Lead Salesperson", 85000.00, 1),
        (002, "Salesperson", 60000.00, 1),
        (003, "Legal Team Lead", 95000.00, 2),
        (004, "Legal Team Member", 80000.00, 2),
        (005, "Engineering Lead", 95000.00, 3),
        (006, "Engineer", 80000.00, 3),
        (007, "IT Technician", 65000.00, 4),
        (008, "Finance Team Lead", 90000.00, 5),
        (009, "Finance Team Member", 80000.00, 5);

INSERT INTO employeeList (first_name, last_name, role_id, manager_id)
VALUES  ("Meredith", "Grey", 001, NULL),
        ("George", "O'Malley", 002, 1),
        ("Christina", "Yang", 003, NULL),
        ("Derek", "Shepherd", 004, 3),
        ("Izzy", "Stevens", 004, 3),
        ("Miranda", "Bailey", 005, NULL),
        ("Callie", "Torres", 006, 6),
        ("Lexie", "Grey", 006, 6),
        ("Richard", "Webber", 007, NULL),
        ("Jackson", "Avery", 008, NULL),
        ("Alex", "Karev", 009, 10);