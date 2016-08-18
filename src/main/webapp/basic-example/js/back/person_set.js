window.addEventListener('load', function (evt) {
    /*var loginButton = document.getElementById('login')
     loginButton.addEventListener('click', function (evt) {
     $('#self_img').modal()
     //$('#loginModal').modal()
     }, false)*/

    var self_info = {
        "photo": "images/1234567.png",
        "name": "笑笑",
        "score": 473,
        "starLevel": generateStarLevel(3.5)
    }
    var selfinfoContainer = document.getElementById('self_info')
    selfinfoContainer.appendChild(dataToElement(self_info, getTemplate('update_self_info')))

    /*var changeImage = document.getElementById('changeImage')
     changeImage.addEventListener('click', function(evt) {
     $('#self_img').modal()
     }, false)*/
}, false)