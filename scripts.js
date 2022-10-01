
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it

        $.ajax({
          // points to the function defined in express.js
          url: '/tweets',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $('#namebody');

            tbodyEl.html('');

            // interate through tweetinfo and add the html to display user id, screen name, name
            response.tweetinfo.forEach(function(product) {
              tbodyEl.append('<tr>\
                <td class="id">' + product.user.id + '</td>\
                <td><input type="text" class="screen_name" value="' + product.user.screen_name + '"></td>\
                <td><input type="text" class="name" value="' + product.user.name + '"></td>\
            </tr>');
            });


          }
        });
      });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it 
        
        $.ajax({
          // points to the function defined in express.js
          url: '/tweetinfo',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $('#tweetbody');

            tbodyEl.html('');

            // interate through tweetinfo and add the html to display id, txt, time created at
            response.tweetinfo.forEach(function(product) {
              tbodyEl.append('<tr>\
                <td class="id">' + product.id + '</td>\
                <td><input type="text" class="text" value="' + product.text + '"></td>\
                <td><input type="text" class="created_at" value="' + product.created_at + '"></td>\
            </tr>');
            });


          }
        });

        

    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
        $.ajax({
          // points to the function defined in express.js
          url: '/searchinfo',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $('#searchbody');

            tbodyEl.html('');

            // interate through tweetsearch and add the html to display id, txt, time created at
            response.tweetsearch.forEach(function(product) {
              tbodyEl.append('<tr>\
                <td class="id">' + product.id + '</td>\
                <td><input type="text" class="text" value="' + product.text + '"></td>\
                <td><input type="text" class="created_at" value="' + product.created_at + '"></td>\
            </tr>');
            });


          }
        });
        
        
        
      });


  //CREATE
  $('#create-form').on('submit', function(event){
    event.preventDefault();

    var createInput = $('#create-input');
    // split the input along the ;
    var input = createInput.val().split(";");

    var time = new Date();

        //TODO: creat a tweet
        $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          // use the first part of the input as id and second part as the text
          data: JSON.stringify({ id: input[0], text: input[1], created_at: time }),
          success: function(response) {
            console.log(response);
            createInput.val('');
            $('#get-tweets-button').click();
          }
        });

      });

    //Create searched tweets
    $('#search-form').on('submit', function(event){
      event.preventDefault();
      var userID = $('#search-input');

    //TODO: search a tweet and display it.

    // points to the function defined in express.js
    $.ajax({
            url: '/searchinfo',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: userID.val() }),
            success: function(response) {
                console.log(response);
                userID.val('');
                $('#get-searched-tweets').click();
            }
        });

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
    event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet

    $.ajax({
      url: '/tweets/' + name,
      method: 'PUT',
      contentType: 'application/json',
      // sending down both the name and the new name to use in express.js
      data: JSON.stringify({ newName: newName, name: name }),
      success: function(response) {
        console.log(response);
        $('#get-button').click();
      }
    });

  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input');
    event.preventDefault();
    id = id.val();

    //TODO: delete a tweet
    
    $.ajax({
            url: '/tweetinfo/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-tweets-button').click();
            }
        });
    
  });


});



