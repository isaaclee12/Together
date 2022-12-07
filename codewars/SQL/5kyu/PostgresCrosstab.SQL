CREATE EXTENSION tablefunc; -- this imports the tablefunc module

-- Create your CROSSTAB statement here
SELECT * 
FROM crosstab(
  'select p.name, d.detail, count(d.detail)
  from products as p 
  inner join details as d on p.id = d.product_id
  group by d.detail, p.name
  order by p.name
  ')
AS products(name text, bad bigint, good bigint, ok bigint)