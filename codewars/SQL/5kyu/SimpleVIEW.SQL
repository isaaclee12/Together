CREATE VIEW members_approved_for_voucher AS

-- get cols
SELECT m.id, m.name, m.email, SUM(p.price) AS total_spending

-- join tables
FROM members m
INNER JOIN sales s ON s.member_id = m.id
INNER JOIN products p ON p.id = s.product_id

-- where sales department is in departments with sum > 10000
-- NOTE: This is the Relational Division part
WHERE s.department_id IN (
  SELECT s2.department_id
  FROM sales s2
  INNER JOIN products p2 ON p2.id = s2.product_id
  GROUP BY s2.department_id
  HAVING SUM(p2.price) > 10000
)

-- group by the other fields
GROUP BY m.id, m.name, m.email

-- only get members who spent 1000 +
HAVING SUM(p.price) > 1000

-- order them
ORDER BY m.id;

-- call the members.
SELECT * FROM members_approved_for_voucher;