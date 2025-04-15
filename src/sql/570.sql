-- Write your PostgreSQL query statement below
SELECT name 
FROM Employee 
WHERE id IN (
    SELECT managerId FROM (
        SELECT COUNT(id) AS reports, managerId
        FROM Employee
        GROUP by managerId
    )
    WHERE reports >= 5
)

-- Opcion 2
SELECT name 
FROM Employee 
WHERE id IN (
    SELECT managerId 
    FROM Employee 
    GROUP BY managerId 
    HAVING COUNT(*) >= 5)

-- Opcion 3
SELECT E1.name
FROM Employee E1
JOIN (
    SELECT managerId, COUNT(*) AS directReports
    FROM Employee
    GROUP BY managerId
    HAVING COUNT(*) >= 5
) E2 ON E1.id = E2.managerId;

-- Opcion 4
SELECT e.name
FROM Employee AS e 
INNER JOIN Employee AS m ON e.id=m.managerId 
GROUP BY m.managerId 
HAVING COUNT(m.managerId) >= 5