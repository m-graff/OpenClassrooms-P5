fetch ("https://oc-p5-api.herokuapp.com/api/cameras").then(function(response){
    return response.json();
}).then(function(data) {
    console.log(data);
}) ;

