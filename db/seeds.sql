INSERT INTO departments (name, id)
VALUES ("Sales", 001),
        ("Finance", 002),
        ("IT", 003),
        ("Legal", 004),
        ("Engineering", 005);

INSERT INTO roles (id, title, salary, departments_id) 
VALUES
        (001, "Lead Salesperson", 85000, 2),
        (002, "Salesperson", 60000, 1),
        (003, "Legal Team Lead", 95000, 4),
        (004, "Legal Team Member", 80000, 4),
        (005, "Engineering Lead", 95000, 5),
        (006, "Engineer", 80000, 5),
        (007, "IT Technician", 65000, 4),
        (008, "Finance Team Lead", 90000, 2),
        (009, "Finance Team Member", 80000, 2);

INSERT INTO employees (id, first_name, last_name, roles_id)
VALUES  (001, "Meredith", "Grey", 001),
        (002, "George", "O'Malley", 002),
        (003, "Christina", "Yang", 003),
        (004, "Derek", "Shepherd", 004),
        (005, "Izzy", "Stevens", 004),
        (006, "Miranda", "Bailey", 005),
        (007, "Callie", "Torres", 006),
        (008, "Lexie", "Grey", 006),
        (009, "Alex", "Karev", 009),
