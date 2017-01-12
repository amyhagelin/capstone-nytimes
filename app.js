var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

function getDataFromApi(searchTerm, callback, sort) {
  var query = {
    //'api-key': '8eb469e30f4a480e8fbf277f47d3e99d',
    'api-key': 'd652729a81b34da49032608ce4b8cc0d',
    q: searchTerm
  }
  if (sort) {
  	query.sort = sort;
  }

  console.log(sort)
  console.log(query);
  
  $.getJSON(url, query, callback);
}

// TEST
console.log('capstone project');
getDataFromApi();


function displaySearchData(data) {
  var resultElement = '';
  console.log(data);
  console.log(data.response.docs[0].lead_paragraph);  
  if (data.response.docs) { 

  	// data.response.docs.sort(function(a, b) {})

    resultElement = data.response.docs.reduce(function(acc, item) {
      // console.log(acc)
      var currentDate = moment(item.pub_date).fromNow(); // .format('MMM Do YYYY')
  	  console.log(currentDate)

  	  if (item.headline.main === undefined) {
	 	return acc += '<div><a target="_blank" href="' + item.web_url + '"><h3>' + 
	    item.headline.name + '</h3></a><p>' + currentDate + '</p><p>' 
	    + item.snippet + '</p></div>'
  	  }
  	  else {
	    return acc += '<div><a target="_blank" href="' + item.web_url + '"><h3>' + 
	    item.headline.main + '</h3></a><p>' + currentDate + '</p><p>' 
	    + item.snippet + '</p></div>'
      }
      // what to do with undefined? another if statement?
      // add .lead_paragraph or .snippet
      // add .pub_date - how can I manipulate this when displayed in HTML? 
      // Can I calculate how long ago this was published?
    }, '')
  }
  else {
    resultElement += '<p>No results</p>';
  }

  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displaySearchData, 'newest');
  });
}

$(function(){watchSubmit();});
