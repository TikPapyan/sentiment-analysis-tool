function IsEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

$('#sign-in-button').click(function (e) {
    e.preventDefault()
    localStorage.clear();
    const signInEmail = $('#sign-in-email')
    const signInPassword = $('#sign-in-password')
    let password_validate = true;
    let email_validate = true;
    signInPassword.removeClass('danger')
    signInEmail.removeClass('danger')

    if (signInEmail.val() !== '') {
        email_validate = IsEmail(signInEmail.val());
        if (!email_validate) {
            signInEmail.addClass('danger');
            alert("Incorrect email format")
        } else {
            signInEmail.removeClass('danger')
        }

    } else {
        signInEmail.addClass('danger')
        email_validate = false
    }
    (signInPassword.val() == '' || signInPassword.length < 4) ? signInPassword.addClass('danger') : signInPassword.removeClass('danger')

    if (password_validate && email_validate) {
        let settings = {
            "url": "http://127.0.0.1:3000/api/auth/login",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "email": signInEmail.val().trim(),
                "password": signInPassword.val().trim()
            }),
        };

        $.ajax(settings).done(function (response) {
            localStorage.setItem("token", response.data.token);
            window.location.href = 'index.html'
        }).catch(function (data) {
            let result = data.responseJSON
            if (typeof result.message === 'string') {
                alert(result.message)
            } else {
                if (result.message && result.message.password) signInPassword.addClass('danger')
                if (result.message && result.message.email) signInEmail.addClass('danger')
            }

        });
    }
})

$('#register-button').click(function (e) {
    e.preventDefault()
    localStorage.clear();
    const signUpEmail = $('#email')
    const signUpPassword = $('#pass')
    const signUpName = $('#name')
    let password_validate = true;
    let email_validate = true;
    let name_validate = true;
    signUpPassword.removeClass('danger')
    signUpEmail.removeClass('danger')
    signUpName.removeClass('danger')

    if (signUpEmail.val() !== '') {
        email_validate = IsEmail(signUpEmail.val());
        if (!email_validate) {
            signUpEmail.addClass('danger');
            alert("Incorrect email format")
        } else {
            signUpEmail.removeClass('danger')
        }
    } else {
        signUpEmail.addClass('danger')
        email_validate = false
    }
    (signUpPassword.val() == '' || signUpPassword.length < 4) ? signUpPassword.addClass('danger') : signUpPassword.removeClass('danger')
    (signUpName.val() == '' || signUpName.length < 4) ? signUpName.addClass('danger') : signUpName.removeClass('danger')

    if (password_validate && email_validate) {
        let settings = {
            "url": "http://127.0.0.1:3000/api/auth/register",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "email": signUpEmail.val().trim(),
                "password": signUpPassword.val().trim(),
                "name": signUpPassword.val().trim()
            }),
        };

        $.ajax(settings).done(function (response) {
            alert(response.message)
            location.reload();
        }).catch(function (data) {
            let result = data.responseJSON
            if (typeof result.message === 'string') {
                alert(result.message)
            } else {
                if (result.message && result.message.password) signUpPassword.addClass('danger')
                if (result.message && result.message.email) signUpEmail.addClass('danger')
                if (result.message && result.message.name) signUpName.addClass('danger')
            }
        });
    }
})