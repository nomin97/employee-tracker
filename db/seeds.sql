INSERT INTO departments (name) VALUES
    ("Sales"),
    ("Finance"),
    ("IT"),
    ("Legal"),
    ("Engineering");

INSERT INTO roles (title, salary, department_id) VALUES
    ("Lead Salesperson", 85000, 1),
    ("Salesperson", 60000, 1),
    ("Legal Team Lead", 95000, 4),
    ("Legal Team Member", 80000, 4),
    ("Engineering Lead", 95000, 5),
    ("Engineer", 80000, 5),
    ("IT Technician", 65000, 3),
    ("Finance Team Lead", 90000, 2),
    ("Finance Team Member", 80000, 2);

INSERT INTO employees (first_name, last_name, role_id) VALUES
    ("Meredith", "Grey", 1),
    ("George", "O'Malley", 2),
    ("Christina", "Yang", 3),
    ("Derek", "Shepherd", 4),
    ("Izzy", "Stevens", 4),
    ("Miranda", "Bailey", 5),
    ("Callie", "Torres", 6),
    ("Lexie", "Grey", 6),
    ("Alex", "Karev", 9);