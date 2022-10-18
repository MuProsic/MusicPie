create table Top50 (
    ID text,
    TrackName text,
    ArtistName text,
    Genre text,
    BeatsPerMinute real,
    Energy real,
    Danceability real,
    Loudness real,
    Liveness real,
    Valence real
);

drop table Top50;

.mode "csv"

.separator ","

.import '| tail -n +2 top50.csv' Top50

select * from top50;


create table TopSpotify2010To2019 (
    ID text,
    title text,
    artist text,
    top_genre text,
    year real,
    bpm real,
    nrgy real,
    dnce real,
    dB real,
    live real
);

.mode "csv"

.separator ","

.import '| tail -n +2 top10s.csv' TopSpotify2010To2019



-- Show me the Songs, artist and its details for pop songs that you can dance to, but not likely to be live.

SELECT *
FROM TopSpotify2010To2019
WHERE top_genre LIKE '%pop%' AND
    dnce > 75 AND
    live < 40;



CREATE TABLE PredictMusicGenre (
    ID text,
    artist_name text,
    track_name text,
    popularity real,
    acousticness real,
    danceability real,
    duration_ms real,
    energy real,
    instrumentalness real, 
    musicKey real,
    liveness real,
    loudness real,
    mode text,
    speachiness real,
    music_temp real,
    obtained_date text,
    valence real,
    music_genre text
);

.mode "csv"

.separator ","

.import '| tail -n +2 music_genre.csv' PredictMusicGenre



CREATE TABLE SpotifyTopSongsByCountry2020 (
    country text,
    continent text,
    rank real,
    title text,
    artist text,
    album text,
    explicit real,
    duration datetime
);


.mode "csv"

.separator ","

.import '| tail -n +2 SpotifyTopSongsByCountry2020.csv' SpotifyTopSongsByCountry2020




CREATE TABLE musicArtistsBySales (
    groupName text,
    year_1970 real,
    year_1971 real,
    year_1972 real,
    year_1973 real,
    year_1974 real,
    year_1975 real,
    year_1976 real,
    year_1977 real,
    year_1978 real,
    year_1979 real,
    year_1980 real,
    year_1981 real,
    year_1982 real,
    year_1983 real,
    year_1984 real,
    year_1985 real,
    year_1986 real,
    year_1987 real,
    year_1988 real,
    year_1989 real,
    year_1990 real,
    year_1991 real,
    year_1992 real,
    year_1993 real,
    year_1994 real,
    year_1995 real,
    year_1996 real,
    year_1997 real,
    year_1998 real,
    year_1999 real,
    year_2000 real,
    year_2001 real,
    year_2002 real,
    year_2003 real,
    year_2004 real,
    year_2005 real,
    year_2006 real,
    year_2007 real,
    year_2008 real,
    year_2009 real,
    year_2010 real,
    year_2011 real,
    year_2012 real,
    year_2013 real
);

drop table musicArtistsBySales;

.mode "csv"

.separator ","

.import '| tail -n +2 musicartistsbysales.csv' musicArtistsBySales




SELECT Distinct title
FROM SpotifyTopSongsByCountry2020
WHERE artist LIKE "%Lady Gaga%";