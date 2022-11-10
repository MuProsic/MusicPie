-- Creation of Schema

CREATE TABLE Genre (
    g_name text,
    g_mood text
);

CREATE TABLE Songs (
    s_name text,
    s_artist text,
    s_energy real
);

CREATE TABLE Reviewer (
    r_name text,
    r_type text
);

CREATE TABLE Artist (
    art_name text,
    art_country text
);

CREATE TABLE Sales (
    sal_artistName text,
    sal_year real,
    sal_amount real
);

CREATE TABLE Country (
    c_name text,
    c_continent text
);

CREATE TABLE ReviewSong (
    rev_name text,
    rev_artist text,
    rev_song_Name text,
    rev_description text,
    rev_score real
);

CREATE TABLE ReviewArtist (
    rev_name text,
    rev_art_name text,
    rev_art_score real
);


-- Drop Tables

DROP TABLE Genre;

DROP TABLE Songs;

DROP TABLE Reviewer;

DROP TABLE Artist;

DROP TABLE Sales;

DROP TABLE Country;

DROP TABLE ReviewSong;

DROP TABLE ReviewArtist;


-- Bulk Loading
.mode "csv"

.separator ","

.import '| tail -n +2 Genre.csv' Genre

-- 

.mode "csv"

.separator ","

.import '| tail -n +2 Songs.csv' Songs

-- 

.mode "csv"

.separator ","

.import '| tail -n +2 Reviewer.csv' Reviewer

select * from Reviewer;

-- 

.mode "csv"

.separator ","

.import '| tail -n +2 Artist.csv' Artist

-- 

.mode "csv"

.separator ","

.import '| tail -n +2 Sales.csv' Sales

-- 

.mode "csv"

.separator ","

.import '| tail -n +2 Country.csv' Country

-- 

.mode "csv"

.separator ","

.import '| tail -n +2 ReviewSong.csv' ReviewSong

-- 

.mode "csv"

.separator ","

.import '| tail -n +2 ReviewArtist.csv' ReviewArtist

-- Bridge Tables



-- 20 Required SQL Statments


-- Insert


-- Update


-- Delete


-- Select