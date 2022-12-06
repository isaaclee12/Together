-- customer table: customer_id, email
-- payment table: count(payment_id), sum amount
-- inner join w/ payment table on customer_id:
-- group by customer_id
-- order by amount spent desc

SELECT 
  customer.customer_id, 
  customer.email, 
  COUNT(payment.payment_id) AS payments_count, 
  CAST(SUM(payment.amount) AS FLOAT) AS total_amount
FROM customer
INNER JOIN payment ON customer.customer_id = payment.customer_id
GROUP BY customer.customer_id
ORDER BY total_amount DESC
LIMIT 10
;