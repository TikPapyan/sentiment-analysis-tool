$( document ).ready(function() {

    $("#buttonClassify").click(function (e) {
        e.preventDefault()
        checkProfile()
        $('#new-content-data').empty()
        const message = $("#send_message")
        const settings = {
            "url": "https://api.monkeylearn.com/v3/classifiers/cl_pi3C7JiL/classify/",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Token b72ad468823f8175cb4d5eef4f3cd846445cdde3",
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "data": [message.val()]
            }),
        };

        $.ajax(settings).done(function (response) {
            $('#new-content-data').append(`
                <span>${response[0].classifications[0].tag_name}</span><span class="embed-model-module-green>${(response[0].classifications[0].confidence * 100).toFixed(1)}%</span></div>
            `)
        });
    })
    
    $("#model_logout").click(function () {
        localStorage.clear();
        location.reload();
    })

    function checkProfile(){
        let token = localStorage.getItem("token");
        if(!token) window.location.href = 'login.html'
        var settings = {
            "url": "http://127.0.0.1:3000/api/user/profile",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": `Bearer ${token}`
            },
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        }).catch(function (data) {
            let result = data.responseJSON
            localStorage.clear();
            window.location.href = 'login.html'
        });
    }
    checkProfile()
});