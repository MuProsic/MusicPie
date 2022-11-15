import sqlite3
from sqlite3 import Error
import names
import random
import string


def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str
    # print("Random string of length", length, "is:", result_str)



def dropTables(_conn):
    # sql = """DROP TABLE ReviewArtist"""

    # try:
    #     c = _conn.cursor()
    #     c.execute(sql)
    #     print("TABLE ReviewArtist DELETED!!!")
    # except Error as e:
    #     print(e)

    sql = """DROP TABLE ReviewSong"""

    try:
        c = _conn.cursor()
        c.execute(sql)
        print("TABLE ReviewSong DELETED!!!")
    except Error as e:
        print(e)

def createTables(_conn):
    # sql = """CREATE TABLE ReviewArtist (
    #         rev_name text,
    #         rev_art_name text,
    #         rev_art_score real
    #         );"""
    
    # try:
    #     c = _conn.cursor()
    #     c.execute(sql)
    #     print("TABLE ReviewArtist CREATED!!!")
    # except Error as e:
    #     print(e)


    sql = """CREATE TABLE ReviewSong (
            rev_name text,
            rev_art_name text,
            rev_art_score real
            );"""
    
    try:
        c = _conn.cursor()
        c.execute(sql)
        print("TABLE ReviewSong CREATED!!!")
    except Error as e:
        print(e)
    

def populateTables(_conn):
    errors = False
    # for i in range(1000):
    # Populating the ReviewArtist table
    rev_name = names.get_full_name()
    get_artists = """select distinct art_name, s_name 
                    from Artist, Songs
                    where 
                        art_name = s_artist;"""
    
    # sql = """INSERT INTO ReviewArtist
    #         VALUES(?, ?, ?)"""

    try:
        c = _conn.cursor()
        c.execute(get_artists)
        arts_songs = c.fetchall()
        # reviewArtist = (rev_name, arts_songs[random.randint(0,len(arts_songs)-1)][0], round(random.uniform(0.0, 10.0), 2))

        # c.execute(sql, reviewArtist)
        # _conn.commit()
        # print(reviewArtist)
    except Error as e:
        print(e)
        
    for i in range(1000):
        # Populating the ReviewSong table
        get_songs = """select rev_name, rev_art_name, s_name 
                    from ReviewArtist, Songs
                    where 
                        s_artist = rev_art_name AND
                        rev_art_name = ?"""

        sql = """INSERT INTO ReviewSong
                 VALUES(?, ?, ?, ?, ?)"""

        indx = random.randint(0,len(arts_songs)-1)
        art_name = arts_songs[indx][0]
        song_name = arts_songs[indx][1]
        review = get_random_string(500)

        try:
            c = _conn.cursor()
            c.execute(get_songs, [art_name])
            rows = c.fetchall()
            print(rows[random.randint(0,len(rows)-1)][0])
            rev_art_score = round(random.uniform(0,10),2)
            reviewSong = (rev_name, art_name, song_name, review, rev_art_score)
            
            c.execute(sql, reviewSong)
            _conn.commit()

            # print(reviewArtist)
        except Error as e:
            print(e)

    if errors:
        print("Some errors ocurred...try again")
    else:
        print("Tables populated Successfully!!!")

def main():
    database = r"FinalInfo.sqlite"

    # create a database connection
    conn = sqlite3.connect(database)
    dropTables(conn)
    createTables(conn)
    populateTables(conn)

if __name__ == "__main__":
    main()

