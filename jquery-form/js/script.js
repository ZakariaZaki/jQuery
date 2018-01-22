/*
* TODO:
* - Security check of the password
* - Tooltip when we're focus on the input to help the user
*/

let checkMinLength = function(data,minLength) {
  // function to check if a string has a minimal length
  // return boolean
  if (data.length < minLength) {
    return false;
  } else {
    return true;
  }
}
let checkMaxLength = function(data,maxLength) {
  // function to check if a string has a maximal length
  // return boolean
  if (data.length > maxLength) {
    return false;
  } else {
    return true;
  }
}
let checkIfTwoValuesAreEqual = function(a,b) {
  // function to check if two value are strictly equal
  // return boolean
  if (a === b) {
    return true
  } else {
    return false;
  }
}
let changeClass = function(element, noError = true) {
  // Switch the class between error and good on an element
  if (noError) {
    element.removeClass('errorInput');
    element.addClass('correctInput');
  } else {
    element.removeClass('correctInput');
    element.addClass('errorInput');
  }
}
let validateEmail = function(mail) { // function to check if an email is valid
  // filter for the regex
  let filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (filter.test(mail)) { // if it's a valid email address
    return true;
  } else { // if not
    return false;
  }
}

$('#send').on('click', function(e){ // when we click on "Send" button

  let send = true; // we give a default value to "send" var
  $('#erreur').hide(); // we hide the error message

  $('.container .form-group').each(function() { // we select all .form-group and we test it one by one

      if ( checkMinLength ($(this).find('.form-control').val(),5) ) { // we check in the length of the value has the minimal required length

        changeClass( $(this).find('.form-control'), true) // if true we apply the class for good answer
        $(this).attr('data-message',''); // we delete the "data-message" attribute in case of one is present

        if ( checkMaxLength ( $('#pseudo').val(), 25 ) ) {
          changeClass( $('#pseudo'), false); // we change the color with the error class
          $('#pseudo').parent().attr('data-message','Maximum 25 characters for the alias'); // we attribute the error message
          send = false; // we block the sending of the form
        }

        if (!validateEmail( $('#email').val() ) ) { // we check if the email address is valid
          changeClass( $('#email'), false); // we change the color with the error class
          $('#email').parent().attr('data-message','Please enter a valid email address.'); // we attribute the error message
          send = false; // we block the sending of the form
        }

        if ( !checkIfTwoValuesAreEqual( $('#mdp').val() , $('#mdp-confirm').val() ) ) { // we check if the two passwords a equal
          send = false; // if not, we block the sending of the form
          changeClass( $('#mdp'), false) // we apply the class for error
          changeClass( $('#mdp-confirm'), false) // we apply the class for error
          $('#mdp-confirm').parent().attr('data-message','Please use twice the same password'); // we add a message to data-message attribute
          // data-message is used in CSS to display the message with the pseudo element "::after"
        }

      } else { // if the minimal length has not the minimal length

        changeClass($(this).find('.form-control'), false); // we apply the class for error
        $(this).attr('data-message','Please insert at least 5 characters'); // we add a messµ for the data-message attribute use in the CSS
        send = false; // we block the sending of the form
      }
  });

  if (!send) { // if there is an error somewhere
    e.preventDefault(); // we block the sending
    $('#erreur').show();
  }

});

$('#reset').on('click', function(e){ // when we click on the reset button

  $('.container .form-group').each(function() { // we select all the .form-group elements
      $(this).attr('data-message',''); // we display the error message for each of them
      $(this).find('.form-control').removeClass('correctInput'); // we remove the class for good data
      $(this).find('.form-control').removeClass('errorInput'); // we remove the class for error
      $('#erreur').hide(); // we remove the error message
  });

});
