/* 
in prospects table, name formats vary:
"First-name Last-name"
"Last-name, First-name" <- note the comma
Some have titles, like Dr. or Jr.

-- possible conditions:
-- has a ',' in the middle
-- has a XX. title at START
-- has a XX. title at END
-- the entries with XX. titles NEVER intersect with names split by ","
Endings:
-- Jr., Sr., I, II, III, IV, V, VI, VII, VIII, IX, PHD, DDS
Starts:
-- Ms., Mrs., Mr., Dr., Miss
*/

-- let's make a view with a union of filtered queries from "prospects"
CREATE VIEW agency_names AS

-- names in "last_name, first_name" format (1200 rows)
SELECT 
      DISTINCT full_name,
      credit_limit,
      UPPER(split_part(full_name, ', ', 2)) first_name
      ,UPPER(split_part(full_name, ', ', 1)) last_name  FROM prospects
WHERE full_name LIKE '%,%'

-- XX. FIRST LAST format (108 rows) 
UNION
SELECT 
      DISTINCT full_name,
      credit_limit,
      -- split at ". ", item 2 = "FIRST LAST"
      -- then split that item at " ", item 1 = "FIRST", item 2 = "LAST"
      UPPER(split_part(split_part(full_name, '. ', 2), ' ', 1)) first_name 
      ,UPPER(split_part(split_part(full_name, '. ', 2), ' ', 2)) last_name
FROM prospects
WHERE full_name LIKE '%. %' -- MS., DR., MRS., MR., etc

-- MISS FIRST LAST format (23 rows)
UNION 
SELECT 
      DISTINCT full_name,
      credit_limit,
      -- split at " ", item 2 = "FIRST", item 3 = "LAST"
      -- then split that item at " " -> "FIRST" "LAST"
      UPPER(split_part(full_name, ' ', 2)) first_name 
      ,UPPER(split_part(full_name, ' ', 3)) last_name
FROM prospects
WHERE full_name LIKE 'MISS%'
OR full_name LIKE 'Miss%'
OR full_name LIKE 'miss%'

-- if format = FIRST LAST XX. or other third word ( rows)
UNION
SELECT 
      DISTINCT full_name,
      credit_limit,
      -- split string into 3 parts, just gets parts 1 and 2
      UPPER(split_part(full_name, ' ', 1)) first_name 
      ,UPPER(split_part(full_name, ' ', 2)) last_name
FROM prospects
WHERE full_name LIKE '%.' -- Jr. or Sr.
OR full_name LIKE '% I'
OR full_name LIKE '% II'
OR full_name LIKE '% III'
OR full_name LIKE '% IV'
OR full_name LIKE '% V'
OR full_name LIKE '% VI'
OR full_name LIKE '% VII'
OR full_name LIKE '% VIII'
OR full_name LIKE '% IX'
OR full_name LIKE '% X'
OR full_name LIKE '% PHD'
OR full_name LIKE '% DDS'

-- also grab the names that don't have a ',' or '.'
UNION
SELECT 
      DISTINCT full_name,
      credit_limit,
  UPPER(split_part(full_name, ' ', 1)) first_name
  ,UPPER(split_part(full_name, ' ', 2)) last_name
FROM prospects
WHERE full_name NOT LIKE '%.%' AND full_name NOT LIKE '%,%'
;

-- Set first and last names to only have first char as uppercase
SELECT INITCAP(a.first_name) as first_name, INITCAP(a.last_name) as last_name, MAX(c.credit_limit) as old_limit, MAX(a.credit_limit) as new_limit
FROM agency_names AS a -- call the view
JOIN customers AS c ON UPPER(c.first_name) = UPPER(a.first_name) -- join the tables
GROUP BY a.first_name, a.last_name -- group by the names to get max credit limit
HAVING MAX(a.credit_limit) > MAX(c.credit_limit) -- where we found a higher credit limit est.
ORDER BY a.first_name ASC -- alphabetical
;