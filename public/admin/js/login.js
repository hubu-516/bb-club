
const loginForm = document.querySelector('#login-container form');
const registerForm = document.querySelector('#register-container form');
const loginLink= document.querySelector('#login-link'); 
const registerLink = document.querySelector('#register-link'); 
const registerContainer = document.querySelector('#register-container'); 
const loginContainer = document.querySelector('#login-container');



$('#login-link').click(function(){
    $('#register-container').hide();
    $('#login-container').show();

});


$('#password_again').blur(function(){
    if($('#new-password').val() == $('#password_again').val())
    {
        $('#password_again').removeAttr("pattern");                                                                                                                                                                                                                                    
    }
    else
    {
        
        $('#password_again').attr("pattern","true"); 
        
       
    }
 
});

