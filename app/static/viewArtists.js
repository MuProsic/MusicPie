var artists_songs = document.getElementById('artists-songs')
var reviews_sales = document.getElementById('reviews-sales')
var reviews_options = document.getElementById('reviews-options')
var review_score_options = document.getElementById('review-score-options')
var avg_score_options = document.getElementById('avg-score-options')
var url = 'http://127.0.0.1:5000/viewArtists'

function artistsOrSongs(){
    let art_songs_dropdown = document.getElementById('artists-songs-dropdown')
    let opt = art_songs_dropdown.options[art_songs_dropdown.selectedIndex].text

    if(opt === "Artists"){
        // display options for artists
        reviews_sales.style.display = 'block'

    }

    else if(opt === "Songs"){
        // display options for songs
    }    
}

function reviewsOrSales(){
    let rev_sales_dropdown = document.getElementById('reviews-sales-dropdown')
    let opt = rev_sales_dropdown.options[rev_sales_dropdown.selectedIndex].text
    // console.log(opt)
    if(opt === "Reviews"){
        // display options for artists -> reviews
        reviews_options.style.display = 'block'

    }

    else if(opt === "Sales"){
        // display options for artists -> songs
    }    
}

function reviewsOptions(){
    let rev_opt_dropdown = document.getElementById('reviews-options-dropdown')
    let opt = rev_opt_dropdown.options[rev_opt_dropdown.selectedIndex]

    if(opt.value == 1){
        // display options for artists -> reviews
        review_score_options.style.display = 'block'
        avg_score_options.style.display = 'none'
        

    }

    else if(opt.value == 2){
        // EXECUTE QUERY: get poorly reviewed artists
        getPoorlyReviewedArtists()
        review_score_options.style.display = 'none'
        avg_score_options.style.display = 'none'
    }
    // NEED TO WORK ON THIS ONE!!!
    else if(opt.value == 3){
        // display options for artist -> reviews -> avg_score of an artist
        avg_score_options.style.display = 'block'
        review_score_options.style.display = 'none'
        review_score_options.style.display = 'none'
    }

    else if(opt.value == 4){
        // EXECUTE QUERY: get the number of reviewers for every artist
        getArtistReviewerCount()
        avg_score_options.style.display = 'none'
        review_score_options.style.display = 'none'
    }

}



function reviewScoreOptions(){
    let rev_score_opts = document.getElementById('review-score-options-dropdown')
    let opt = rev_score_opts.options[rev_score_opts.selectedIndex]
    let user_input = document.getElementById('user-input')
    let submit_threshold = document.getElementById('submit-threshold')
    let submit_top_artists = document.getElementById('submit-top-artists')
    let table = document.getElementById('result');
    table.innerHTML = '';

    if(opt.value == 1){
        // EXECUTE QUERY: Get review scores for all artists
        getRevScoreForAllArtists()
        user_input.style.display = 'none'
        submit_threshold.style.display = 'none'
        submit_top_artists.style.display = 'none'
    }
    else if(opt.value == 2){
        // EXECUTE QUERY: Display a textbox that will 
        // set threshold (rev_score >= X) or (top X artists)
        console.log("OPTION 2!!!")
        submit_top_artists.style.display = 'none'
        user_input.style.display = 'block'
        submit_threshold.style.display = 'block'
        
        
    }
    else if(opt.value == 3){
        console.log("OPTION 3!!!")
        submit_threshold.style.display = 'none'
        user_input.style.display = 'block'
        submit_top_artists.style.display = 'block'
    }

    
}


function avgScoreOptions(){
    let avg_score_options_dropdown = document.getElementById('avg-score-options-dropdown')
    console.log(avg_score_options_dropdown)
    let opt = avg_score_options_dropdown.options[avg_score_options_dropdown.selectedIndex]
    console.log(opt)

    if(opt.value == 1){
        getAvgScoreByCountry()
    }
    else if(opt.value == 2){
        getAvgScoreByContinent()
    }

}


///////////////////// QUERY FUNCTIONS /////////////////////////////
function getAvgScoreByCountry(){
    let request = new XMLHttpRequest()
    request.open('POST', url+'/getAvgScore/Country', true)
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let table = document.getElementById('result');
            table.innerHTML = '';
            data = request.response
            console.log(data[0][0])
            
            // inserting table headers
            let header = table.createTHead();
            let header_row = header.insertRow();
            let country = header_row.insertCell(0)
            let artist = header_row.insertCell(1);
            let rev_score = header_row.insertCell(2);
            
            
            country.innerHTML = 'Country'
            artist.innerHTML = 'Artist';
            rev_score.innerHTML = 'Review Score';

            for(let i = 0; i < data.length; i++){
                let row = table.insertRow()
    
                for(let j = 0; j < data[i].length; j++){
                    let col = row.insertCell(j);
                    col.innerHTML = data[i][j]
                }
            }
            
        }
    }
    request.send(JSON.stringify())
}


function getAvgScoreByContinent(){
    let request = new XMLHttpRequest()
    request.open('POST', url+'/getAvgScore/Continent', true)
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json');
    // console.log("HERE!!!")
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let table = document.getElementById('result');
            table.innerHTML = '';
            data = request.response
            console.log(data[0][0])
            
            // inserting table headers
            let header = table.createTHead();
            let header_row = header.insertRow();
            let continent = header_row.insertCell(0);
            let artist = header_row.insertCell(1);
            let rev_score = header_row.insertCell(2);
            
            
            continent.innerHTML = 'Continent';
            artist.innerHTML = 'Artist';
            rev_score.innerHTML = 'Review Score';

            for(let i = 0; i < data.length; i++){
                let row = table.insertRow()
    
                for(let j = 0; j < data[i].length; j++){
                    let col = row.insertCell(j);
                    col.innerHTML = data[i][j]
                }
            }
            
        }
    }
    request.send(JSON.stringify())
}



function getPoorlyReviewedArtists(){
    let request = new XMLHttpRequest()
    request.open('POST', url+'/poorlyReviewedArtists', true)
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let table = document.getElementById('result');
            table.innerHTML = '';
            data = request.response
            console.log(data[0][0])
            
            // inserting table headers
            let header = table.createTHead();
            let header_row = header.insertRow();
            let artist = header_row.insertCell(0);
            let rev_score = header_row.insertCell(1);
            
            
            artist.innerHTML = 'Artist';
            rev_score.innerHTML = 'Review Score';

            for(let i = 0; i < data.length; i++){
                let row = table.insertRow()
    
                for(let j = 0; j < data[i].length; j++){
                    let col = row.insertCell(j);
                    col.innerHTML = data[i][j]
                }
            }
            
        }
    }
    request.send(JSON.stringify())

}

function getArtistReviewerCount(){
    let request = new XMLHttpRequest()
    request.open('POST', url+'/getArtistReviewerCount', true)
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let table = document.getElementById('result');
            table.innerHTML = '';
            data = request.response
            console.log(data[0][0])
            
            // inserting table headers
            let header = table.createTHead();
            let header_row = header.insertRow();
            let artist = header_row.insertCell(0);
            let rev_score = header_row.insertCell(1);
            
            
            artist.innerHTML = 'Artist';
            rev_score.innerHTML = 'Reviewer Count';

            for(let i = 0; i < data.length; i++){
                let row = table.insertRow()
    
                for(let j = 0; j < data[i].length; j++){
                    let col = row.insertCell(j);
                    col.innerHTML = data[i][j]
                }
            }
            
        }
    }
    request.send(JSON.stringify())
}

function getRevScoreForAllArtists(){
    let request = new XMLHttpRequest()
    request.open('POST', url+'/getRevScoreForAllArtists', true)
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let table = document.getElementById('result');
            table.innerHTML = '';
            data = request.response
            console.log(data[0][0])
            
            // inserting table headers
            let header = table.createTHead();
            let header_row = header.insertRow();
            let artist = header_row.insertCell(0);
            let rev_score = header_row.insertCell(1);
            
            
            artist.innerHTML = 'Artist';
            rev_score.innerHTML = 'Review Score';

            for(let i = 0; i < data.length; i++){
                let row = table.insertRow()
    
                for(let j = 0; j < data[i].length; j++){
                    let col = row.insertCell(j);
                    col.innerHTML = data[i][j]
                }
            }
            
        }
    }
    request.send(JSON.stringify())
}

function getRevScoreThreshold(){
    // FIX ME: Get threshold from the textbox in html file
    let threshold = document.getElementById('user-input').value
    console.log(threshold)
    let queryData = {'threshold': threshold}
    let request = new XMLHttpRequest()
    request.open('POST', url+'/getRevScoreThreshold', true)
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let table = document.getElementById('result');
            table.innerHTML = '';
            data = request.response
            console.log(data[0][0])
            
            // inserting table headers
            let header = table.createTHead();
            let header_row = header.insertRow();
            let artist = header_row.insertCell(0);
            let rev_score = header_row.insertCell(1);
            
            
            artist.innerHTML = 'Artist';
            rev_score.innerHTML = 'Review Score';

            for(let i = 0; i < data.length; i++){
                let row = table.insertRow()
    
                for(let j = 0; j < data[i].length; j++){
                    let col = row.insertCell(j);
                    col.innerHTML = data[i][j]
                }
            }
            
        }
    }
    request.send(JSON.stringify(queryData))
}

function getTopArtists(){
    let limit = document.getElementById('user-input').value
    let queryData = {'limit': limit}
    let request = new XMLHttpRequest()
    request.open('POST', url+'/getTopArtists', true)
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let table = document.getElementById('result');
            table.innerHTML = '';
            data = request.response
            console.log(data[0][0])
            
            // inserting table headers
            let header = table.createTHead();
            let header_row = header.insertRow();
            let artist = header_row.insertCell(0);
            let rev_score = header_row.insertCell(1);
            
            
            artist.innerHTML = 'Artist';
            rev_score.innerHTML = 'Review Score';

            for(let i = 0; i < data.length; i++){
                let row = table.insertRow()
    
                for(let j = 0; j < data[i].length; j++){
                    let col = row.insertCell(j);
                    col.innerHTML = data[i][j]
                }
            }
            
        }
    }
    request.send(JSON.stringify(queryData))
}