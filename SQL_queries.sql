-- SELECTS
--Get the quality score for all artist
select rev_art_name,avg(rev_art_score)
from ReviewArtist
group by rev_art_name;

--Get the quality score of all songs of an artist
select rev_artist, rev_song_Name, avg(rev_score) as avg_score
from ReviewSong
where rev_artist = 'babyshambles'
group by rev_artist, rev_song_Name
order by avg_score desc;

--Get the top 10 artists based on review score
select distinct art_name, rev_art_score
from Artist, ReviewArtist
WHERE
    art_name = rev_art_name
order by rev_art_score DESC
limit 10

--Get top 5 songs of an artist : FIX
select rev_artist, rev_song_Name
from ReviewSong
where 
    rev_artist = 'babyshambles'
order by rev_score desc
limit 5


select rev_art_name from ReviewArtist

--get the top 5 energetic songs of an artist
select s_artist, s_name, s_energy
from Songs
where s_artist = 'Natalia Lafourcade'
order by s_energy DESC
limit 5;

--Get the number of reviewers for every artist
select rev_art_name, count(rev_name) as count_rev
from ReviewArtist
group by rev_art_name
order by count_rev desc;

--Sales of artists per country
select c_name, art_name, sum(sal_amount) as tot_sales
from
    Artist, Sales, Country
where 
    art_name = sal_artistName
    AND art_country = c_name
group by c_name;

--Get the top 5 selling artists in a specific country based on genre
select distinct CountrySales.art_name, g_name, tot_sales
from(
    select c_name, art_name, sum(sal_amount) as tot_sales 
    from
        Artist, Sales, Country
    where 
        art_name = sal_artistName
        AND art_country = c_name
    group by art_name
    order by tot_sales desc
    ) CountrySales,
    Genre,
    Songs,
    Artist
where
    CountrySales.art_name = Artist.art_name
    AND s_genre = g_name
    AND s_artist = Artist.art_name
    AND c_name like '%Argentina%'
    AND g_name like '%pop%'
    limit 5

-- Show a list of songs that is visible to see the where the song’s cultural background influenced the song based on the artist’s origin

SELECT s_name, c_continent
FROM Songs, Artist, Country
WHERE s_name = art_name AND
   art_country = c_continent;

-- Show me songs that are happy or suprise with the ability to dance to.

SELECT s_artist, s_name, g_mood, s_energy
FROM Songs, Genre
WHERE s_genre = g_name AND
   g_mood = "Happy";

select distinct s_artist
from(
    SELECT s_artist, s_name, g_mood, s_energy
    FROM Songs, Genre
    WHERE s_genre = g_name AND
        g_mood = "Happy";
);

--    How many artists were reviewed poorly by critics

SELECT count(*) as PoorlyReviewedArtistCount
FROM ReviewArtist
WHERE rev_art_score < 30.0;

-- What is the average score of artists per continent
SELECT c_continent, avg(rev_art_score) as continent_score
FROM Country, Artist, ReviewArtist
WHERE rev_art_name = art_name AND
   art_country = c_name
GROUP BY c_continent;

-- Songs w/ certain artist with review score at least 7/10 and why it got that score

SELECT s_name as SongName, rev_score as ReviewScore, rev_description as ScoreReason
FROM Songs, ReviewSong
WHERE s_name = rev_song_Name AND
   rev_score > 7.0;


-- Show the top artist in every continent by sales throughout their years
SELECT S1.s_country as countryName, S1.artName as Artist, max(S1.totalSales) as Grossed_Amount
FROM (
   SELECT sal_artistName as artName, art_country as s_country, sum(sal_amount) as totalSales
   FROM Sales, Artist
   WHERE sal_artistName = art_name
   GROUP BY sal_artistName
) S1
GROUP BY countryName;




-- INSERTS

INSERT INTO Songs VALUES('Money Made Me Do It', 'Post Malone', 0.429, 'Rap')
INSERT INTO Songs VALUES('Motion', 'Khalid', 0.429, 'Indie')

-- UPDATE


--Update sales for a specific artist in a specific year (ORIGINAL: 3365195.0)
UPDATE Sales
SET sal_amount = 3365200.0
WHERE sal_artistName = 'TheBeatles' AND sal_year like '%1970%'

-- Update artist country of origin

UPDATE Artist
SET art_country = "Argentina"
WHERE art_name = "Bad Bunny";
 
UPDATE Artist
SET art_country = "Puerto Rico"
WHERE art_name = "Bad Bunny";

-- DELETE

--Qdelete a song that has a low review score
delete from ReviewArtist
where
    rev_art_score < 30;

-- Delete song from table

DELETE FROM Songs
WHERE (s_artist = "Post Malone" AND
   s_name = "Money Made Me Do It");
 
DELETE FROM Songs
WHERE (s_artist = "Khalid" AND
   s_name = "Motion");