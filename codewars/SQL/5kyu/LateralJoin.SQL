SELECT c.id category_id, c.category, p.title, p.views, p.id post_id

FROM categories c

-- so combining with all entries in categories
LEFT JOIN LATERAL( 
    -- get just these items from posts
    SELECT title, views, id
    FROM posts

    -- where we pass in the id to match entries
    WHERE category_id = c.id

    -- get 2 entries per item, with top view counts
    ORDER BY views DESC
    LIMIT 2) p ON true -- true here triggers when we got the items

-- order by given conditions
ORDER BY 2, 4 DESC, 5;