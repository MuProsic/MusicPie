-- SELECTS
--Q1 -> Get the quality score for all artist
select avg(rev_art_score)
from ReviewArtist
group by artist_name

--Q2 -> Get the quality score of all songs of an artist
select avg(rev_score)
from ReviewSong
where rev_artist = ''
group by rev_song_Name;

--Q3 -> Get the top 10 artists based on genre
select distinct s_artist, s_genre
from Songs, Genre
WHERE
    s_genre = g_name
-- limit 10

--Q4 -> Get top 5 songs of an artist
select rev_name, rev_art_name, s_name
from ReviewArtist, Songs
where 
    s_artist = rev_art_name 
    AND rev_art_name = 'Bad Bunny'
order by rev_art_score desc
limit 5

--Q5 -> get the most energetic songs of an artist
select rev_art_name, rev_art_score
from ReviewSong
where rev_art_name = 'Bad Bunny'
order by DESC
limit 10;

--Q6 -> Get the number of reviewers for every artist
select rev_art_name, count(rev_name)
from ReviewArtist
order by rev_art_name


--Q7 -> Sales of artists per country
select c_name, art_name, sum(sal_amount)
from
    Artist, Sales, Country
where 
    art_name = sal_artistName
    AND art_country = c_name
group by c_name;

--Q8 -> Get the top 5 selling artists in a specific country based on genre
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







-- INSERTS


-- UPDATE
--Q9 -> Update sales for a specific artist in a specific year (ORIGINAL: 3365195.0)
UPDATE Sales
SET sal_amount = 3365200.0
WHERE sal_artistName = 'TheBeatles' AND sal_year like '%1970%'


-- DELETE
--Q10 -> delete a song that has a low review score
delete from ReviewArtist
where
    rev_art_score < 30;