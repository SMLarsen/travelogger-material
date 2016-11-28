CREATE TABLE employees (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	job_title VARCHAR(120),
	employee_id_number VARCHAR(12),
	annual_salary NUMERIC(12,2) NOT NULL,
	active BOOLEAN DEFAULT true
);
