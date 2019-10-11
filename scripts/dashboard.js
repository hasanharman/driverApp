var app = angular.module('myApp', ['ngRoute']);

const {
    remote
} = require('electron');

let driverPhoto;

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/login.html',
            controller: 'loginCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'pages/dashboard.html',
            controller: 'dashboardCtrl'
        })
        .when('/adddriver', {
            templateUrl: 'pages/adddriver.html',
            controller: 'addDriverCtrl'
        })
        .when('/totaldrivers', {
            templateUrl: 'pages/totaldrivers.html',
            controller: 'totalDriversCtrl'
        })
        .when('/notifications', {
            templateUrl: 'pages/notifications.html',
            controller: 'notificationsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
})

//LeftDays Service Main1
// app.service("myService", function() {
//     this.days = '';
// })

// Login Controller
app.controller('loginCtrl', function ($scope, $location) {
    $scope.signup = function () {
        auth.createUserWithEmailAndPassword($scope.mail, $scope.parola).then(sonuc => {
            console.log(sonuc.user);
            alert('Başarıyla üye oldunuz, şimdi giriş yapınız.')
        })
    }

    $scope.login = function () {
        auth.signInWithEmailAndPassword($scope.mail, $scope.parola).then(sonuc => {
            console.log('Giriş Başarılı');
            $location.path('/dashboard')
        })
    }
});

// Dashboard Controller
app.controller('dashboardCtrl', function ($scope, $location) {

    // AlertButton
    // $scope.closeBtn = function () {
    //     document.querySelector('#closeBtn').addEventListener('click', () => {
    //         alert('deneme')
    //     })
    // }
    
    $scope.home = function () {
        console.log('Anasayfaya gidildi');
        $location.path('/dashboard')
    }
    $scope.adddriver = function () {
        console.log('addDriver sayfasına gidildi');
        $location.path('/adddriver')
    }
    $scope.totaldrivers = function () {
        console.log('totalDrivers sayfasına gidildi');
        $location.path('/totaldrivers')
    }
    $scope.notifications = function () {
        console.log('notifications sayfasına gidildi');
        $location.path('/notifications')
    }
    $scope.exit = function () {
        // auth.signOut().then(sonuc => {
        //     console.log('Çıkış Başarılı');
        //     $location.path('/login')
        // })
        let w = remote.getCurrentWindow()
        w.close()
    }
});


// Add Driver Controller
app.controller('addDriverCtrl', function ($scope, $location) {

    // $scope.days = myService.days;

    $scope.showval = true;
    $scope.hideval = true;
    $scope.hideval2 = true;
    $scope.isShowHide = function (param) {
        if (param == "first") {
            $scope.showval = true;
            $scope.hideval = true;
            $scope.hideval2 = true;
        } else if (param == "middle") {
            $scope.showval = false;
            $scope.hideval = false;
            $scope.hideval2 = true;
        } else if (param == "last") {
            $scope.showval = false;
            $scope.hideval = true;
            $scope.hideval2 = false;
        }
    }

    $scope.home = function () {
        console.log('Anasayfaya gidildi');
        $location.path('/dashboard')
    }
    $scope.adddriver = function () {
        console.log('addDriver sayfasına gidildi');
        $location.path('/adddriver')
    }
    $scope.totaldrivers = function () {
        console.log('totalDrivers sayfasına gidildi');
        $location.path('/totaldrivers')
    }
    $scope.notifications = function () {
        console.log('notifications sayfasına gidildi');
        $location.path('/notifications')
    }
    $scope.exit = function () {
        // auth.signOut().then(sonuc => {
        //     console.log('Çıkış Başarılı');
        //     $location.path('/login')
        // })
        let w = remote.getCurrentWindow()
        w.close()
    }

    // Image Selection
    $scope.selectImg = function (e) {

        driverPhoto = document.getElementById('image').files[0];
        // var {
        //     dialog
        // } = remote;
        // selectedImg = null;
        // dialog.showOpenDialog({
        //     properties: ['openFile'],
        //     filters: [{
        //         name: 'image',
        //         extensions: ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG']
        //     }]
        // }, function (file) {
        //     console.log(file);
        // });
    }

    //Save Button
    $scope.add = function () {

        var aracdurumu;
        document.getElementsByName("aracdurumu").forEach(function (elm) {
            if (elm.checked) {
                aracdurumu = elm.value;
            }
        })

        var src;
        document.getElementsByName("src").forEach(function (elm) {
            if (elm.checked) {
                src = elm.value;
            }
        })

        // var psico;
        // document.getElementsByName("psico").forEach(function (elm) {
        //     if (elm.checked) {
        //         psico = elm.value;
        //     }
        // })

        const imagePath = '/driversPhoto/' + $scope.ad + $scope.soyad + $scope.telefon;
        const imageRef = storage.ref(imagePath);
        driverPhoto = document.getElementById('image').files[0];
        //console.log(driverPhoto);
        const uploadImage = imageRef.put(driverPhoto);
        let downloadURL;
        uploadImage.then(e => {
            imageRef.getDownloadURL().then(url => {
                downloadURL = url
                db.collection('drivers').add({
                    ad: $scope.ad,
                    soyad: $scope.soyad,
                    adres: $scope.adres,
                    telefon: $scope.telefon,
                    email: $scope.email,
                    photoURL: downloadURL,
                    aracdurumu: aracdurumu,
                    src: src,
                    srcDate: $scope.srcDate,
                    carModel: $scope.carModel,
                    carYear: $scope.carYear,
                    carColor: $scope.carColor,
                    carKm: $scope.carKm,
                    carControl: $scope.carControl
                    // psico: psico,
                    // psicoDate: $scope.psicoDate
                }).then((sub)=> {
                    const key = sub.key;
                    if(src === 'srcVar') {
                        db.collection('srcState').add({
                            [key]: key
                        })
                    }
                    if(aracdurumu === 'sozlesmeli'){
                        db.collection('carState').add({
                            [key]: key
                        })
                    }
                }).then(() => {
                    console.log('ekleme basarili');
                    alert('Sürücü Ekleme Başarılı');
                }).catch(err => {
                    console.log(err.message);
                })
            });
        });
    }
    // Date Calculation
    $scope.days = function () {
        var date = $scope.srcDate;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = dd + '/' + mm + '/' + yyyy;
        $scope.today = today;
        var date2 = new Date(today);
        var date1 = new Date(date);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        $scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return $scope.dayDifference;
    }

});

// Total Drivers Controller
app.controller('totalDriversCtrl', function ($scope, $location, $rootScope) {

    

    //Main Routing Part
    $scope.home = function () {
        console.log('Anasayfaya gidildi');
        $location.path('/dashboard')
    }
    $scope.adddriver = function () {
        console.log('addDriver sayfasına gidildi');
        $location.path('/adddriver')
    }
    $scope.totaldrivers = function () {
        console.log('totalDrivers sayfasına gidildi');
        $location.path('/totaldrivers')
    }
    $scope.notifications = function () {
        console.log('notifications sayfasına gidildi');
        $location.path('/notifications')
    }
    $scope.exit = function () {
        let w = remote.getCurrentWindow()
        w.close()
    }

    //Driver Listing to HTML
    const driverList = document.querySelector('#driver-list');

    // Create element and render drivers
    const renderDrivers = doc => {
        const li = driverTemplate(doc);
        driverList.insertAdjacentHTML("beforeend", li);
    }
    const driverTemplate = doc => `
    <div class="accordion" id="qua">
        ${doc.data().ad} ${doc.data().soyad}
        <div id="${doc.id}" class="panel">
            <p>${doc.data().adres}</p><br>
            <p id="email">${doc.data().email}</p><br>
            <p>${doc.data().aracdurumu}</p><br>
            <p>${doc.data().carModel}</p><br>
        </div>
    </div>
    `
    // function renderDrivers(doc) {
    //     let li = document.createElement('li');
    //     let ad = document.createElement('span');
    //     let soyad = document.createElement('span');
    //     li.setAttribute('data-id', doc.id);
    //     ad.textContent = doc.data().ad;
    //     soyad.textContent = doc.data().soyad;
    //     li.appendChild(ad);
    //     li.appendChild(soyad);
    //     driverList.appendChild(li);
    // }

    //Driver Listing
    db.collection('drivers').get().then((snapshot) => {
        //console.log(snapshot.docs);
        snapshot.docs.forEach(doc => {
            renderDrivers(doc);
        }) //Toggle Func
        const objects = document.querySelectorAll('.accordion');
        for (var object of objects) {
            object.addEventListener('click', function (e) {
                const childId = e.path[0].children[0].id;
                const element = document.getElementById(childId);
                let state = element.style.display;
                if (state == 'block') {
                    element.style.display = 'none';
                } else {
                    element.style.display = 'block';
                }
            })
        }
    }).then(() => {
    childNum = document.querySelector('#driver-list').children;
    numGen = childNum.length;
    mailDef = document.querySelectorAll('#email').length;
    console.log(mailDef)
    console.log('settimeout deneme:',numGen);
    //document.querySelector("body > div > div.container.totalDrivers.ng-scope > span:nth-child(2)").textContent = numGen;
    document.querySelector("body > div > div.container.totalDrivers.ng-scope > p > span").textContent = numGen;
    })

    //Counting total numbers of drivers
    // let size = db.collection('drivers').get().then(snap => {
    //     size = snap.size // will return the collection size
    //     //console.log(size);
    //     return size;
    // });
    // console.log(size);

    //Func deneme
    // var size = new Promise((res, rej) => {
    //     db.collection("drivers").get().then((snap) => {
    //         res(size = snap.size)
    //     })
    // })
    // size.then(val => {
    //     $scope.size = val;
    //     document.querySelector("body > div > div.container.totalDrivers.ng-scope > h2:nth-child(3)").textContent = val;
    // })    
});

// Notifications Controller
app.controller('notificationsCtrl', function ($scope, $location) {

    $scope.home = function () {
        console.log('Anasayfaya gidildi');
        $location.path('/dashboard')
    }
    $scope.adddriver = function () {
        console.log('addDriver sayfasına gidildi');
        $location.path('/adddriver')
    }
    $scope.totaldrivers = function () {
        console.log('totalDrivers sayfasına gidildi');
        $location.path('/totaldrivers')
    }
    $scope.notifications = function () {
        console.log('notifications sayfasına gidildi');
        $location.path('/notifications')
    }
    $scope.exit = function () {
        let w = remote.getCurrentWindow()
        w.close()
    }
});

//Listing
//     var ul = document.getElementById('ul');
//     db.collection('drivers').onSnapshot(snap => {
//         //console.log(snap.docs);
//         var drivers = snap.docs;
//         if (drivers.length) {
//             let html = ''
//             drivers.forEach(belge => {
//                 //console.log(drivers);
//                 var data = belge.data();
//                 var li = `<li class="list-group-item">${data.ad}<br>${data.photoURL}</li>`;
//                 html += li;
//             })
//             ul.innerHTML = html;
//         }
//         var driverNumber = drivers.length;
//         console.log(driverNumber);
//     })
// });