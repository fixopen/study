window.addEventListener('load', function (evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.pathname;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }

    var catalogs = { renjiao: '人教版', sujiao: '苏教版', beijing: '北京版'};

    var allResources = {
        renjiao: [
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
        ],
        sujiao: [
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
        ],
        beijing: [
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
        ],

    }

    var tabContainer = document.getElementById('tab-container')
    var tabtemplate = getTemplate('tab-tpl');
    var index = 0;
    for (var key in allResources) {
        var ele = dataToElement({ catalogName: key, catalogTitle: catalogs[key] }, tabtemplate);
        if (index++ == 0) {
            ele.className = ele.className + ' active';
        }

        tabContainer.appendChild(ele);
    }

    var bookContainer = document.getElementById('catalog-container')
    var template = getTemplate('catalog-tpl')
    index = 0;
    for (var key in allResources) {
        var books = allResources[key];
        var ele = dataToElement({ catalogName: key, catalogTitle: catalogs[key] }, template);
        ele.id = key + "-panel";
        bookContainer.appendChild(ele)
        var itemContainer = document.getElementById(key + '-container');
        var itemTpl = getTemplate('catalogItem-tpl');
        var count = books.length;
        for (var i = 0; i < count; i++) {
            itemContainer.appendChild(dataToElement(books[i], itemTpl))
        }
        if (index++ == 0) {
            ele.className = ele.className + ' active';
        }
    }
}, false)
	
	
		
		
	