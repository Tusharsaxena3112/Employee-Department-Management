CREATE TABLE IF NOT EXISTS employee
(
    emp_age integer NOT NULL,
    emp_dept text NOT NULL,
    emp_id integer NOT NULL,
    emp_name text NOT NULL,
    emp_salary numeric NOT NULL,
    emp_experience integer,
    CONSTRAINT "Employee_pkey" PRIMARY KEY (emp_id)
)
