--  ¯\_ (ツ)_/¯
/*
determining credit limit for customers is too care -> means credit limits are too low?
so we increase them and upsell.. bank... stuff i guess idk i'm not fintech
*/

/*
in prospects table, name formats vary:
"First-name Last-name"
"Last-name, First-name" <- note the comma
And all the cases are jumbled up too
Some have titles, like Dr. or Jr.
-- possible conditions:
-- has a XX. title at START
-- has a XX. title at END
-- the entries with XX. titles NEVER intersect with names split by ","
Endings:
-- Jr., Sr., I, II, III, IV, V, VI, VII, VIII, IX, PHD, DDS
Starts:
-- Ms., Mrs., Mr., Dr., Miss
*/

CREATE VIEW agency_names AS

-- names in "last_name, first_name" format (1200 rows)
SELECT 
      full_name,
      credit_limit,
      UPPER(split_part(full_name, ', ', 2)) first_name
      ,UPPER(split_part(full_name, ', ', 1)) last_name  FROM prospects
WHERE full_name LIKE '%,%'

-- XX. FIRST LAST format (108 rows) 
UNION
SELECT 
      full_name,
      credit_limit,
      -- split at ". ", item 2 = "FIRST LAST"
      -- then split that item at " ", item 1 = "FIRST", item 2 = "LAST"
      split_part(split_part(full_name, '. ', 2), ' ', 1) first_name 
      ,split_part(split_part(full_name, '. ', 2), ' ', 2) last_name
FROM prospects
WHERE full_name LIKE '%. %' -- MS., DR., MRS., MR., etc

-- MISS FIRST LAST format (23 rows)
UNION 
SELECT 
      full_name,
      credit_limit,
      -- split at " ", item 2 = "FIRST", item 3 = "LAST"
      -- then split that item at " " -> "FIRST" "LAST"
      split_part(full_name, ' ', 2) first_name 
      ,split_part(full_name, ' ', 3) last_name
FROM prospects
WHERE full_name LIKE 'MISS%'
OR full_name LIKE 'Miss%'
OR full_name LIKE 'miss%'


-- if format = FIRST LAST XX. or other third word ( rows)
UNION
SELECT 
      full_name,
      credit_limit,
      -- split string into 3 parts, just gets parts 1 and 2
      split_part(full_name, ' ', 1) first_name 
      ,split_part(full_name, ' ', 2) last_name
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
      full_name,
      credit_limit,
  split_part(full_name, ' ', 1) first_name
  ,split_part(full_name, ' ', 2) last_name
FROM prospects
WHERE full_name NOT LIKE '%.%' AND full_name NOT LIKE '%,%'
;

-- 
SELECT a.first_name, c.last_name, c.credit_limit old_limit, a.credit_limit as new_limit
FROM agency_names AS a -- call the view
JOIN customers AS c ON UPPER(c.first_name) = UPPER(a.first_name) -- join the tables
WHERE a.credit_limit > c.credit_limit -- where we found a higher credit limit est.
ORDER BY a.first_name ASC -- alphabetical
;

-- SELECT full_name 
-- FROM prospects
-- WHERE full_name NOT IN (
--   SELECT full_name
--   FROM agency_names
-- )
-- ;

-- select * 
-- from prospects as p
-- join customers as c on -- name stuff
-- where p.credit_limit > c.credit_limit