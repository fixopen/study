window.addEventListener('load', function (evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.pathname;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }
    // GET /<type>/<id>
    // POST /<type>
    // {"id":...}
    // PUT /<type>/<id>
    // DELETE /<type>/<id>
    // PATCH /<type>/<id>
    //patchData('/resources?filter=<xyz>', {"mark":"1"});
    /*
     getData('/resources?offset=0&count=6', function(data) {
     var container = document.getElementById('book_content')
     var count = data.length
     for (var i = 0; i < count; ++i) {
     container.appendChild(dataToElement(data[i], type))
     }
     })
     */
    var books = [
        {
            "name": "心理学",
            "photo": "images/res1.jpg",
            "author": "斯迪格利兹"
        },
        {
            "name": "心理学",
            "photo": "images/res1.jpg",
            "author": "斯迪格利兹"
        },
        {
            "name": "心理学",
            "photo": "images/res1.jpg",
            "author": "斯迪格利兹"
        },
        {
            "name": "心理学",
            "photo": "images/res1.jpg",
            "author": "斯迪格利兹"
        },
        {
            "name": "心理学",
            "photo": "images/res1.jpg",
            "author": "斯迪格利兹"
        },
        {
            "name": "心理学",
            "photo": "images/res1.jpg",
            "author": "斯迪格利兹"
        }
    ]

    var bookContainer = document.getElementById('books')
    var count = books.length
    var template = getTemplate('resource')
    for (var i = 0; i < count; ++i) {
        bookContainer.appendChild(dataToElement(books[i], template))
    }
}, false)