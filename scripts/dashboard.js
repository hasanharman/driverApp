var app = angular.module('myApp', ['ngRoute']);

const {
    remote
} = require('electron');

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            // Normalde bu templateUrl: 'pages/login.html',
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
// Login Controller
app.controller('loginCtrl', function ($scope, $location) {
    $scope.signup = function () {
        auth.createUserWithEmailAndPassword($scope.mail, $scope.parola).then(sonuc => {
            console.log(sonuc.user);
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
    $scope.selectImg = function () {
        var {
            dialog
        } = remote;

        selectedImg = null;

        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{
                name: 'image',
                extensions: ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG']
            }]
        }, function (file) {
            console.log(file);
        });
    }

    //Save Button
    $scope.add = function () {
        db.collection('drivers').add({
            ad: $scope.ad,
            soyad: $scope.soyad,
            adres: $scope.adres,
            telefon: $scope.telefon,
            email: $scope.email,
            image: $scope.image,
            // aracdurumu: $scope.aracdurumu
        }).then(() => {
            console.log('ekleme basarili');
            alert('Sürücü Ekleme Başarılı');
        }).catch(err => {
            console.log(err.message);
        })
    }

    // Listing
    // var ul = document.getElementById('ul');

    // db.collection('makaleler').onSnapshot(snap => {
    //     //console.log(snap.docs);
    //     var belgeler = snap.docs;
    //     if (belgeler.length) {
    //         let html = ''
    //         belgeler.forEach(belge => {
    //             //console.log(belge); 
    //             var data = belge.data();
    //             var li = `<li class="list-group-item">${data.baslik}---${data.icerik}</li>`;
    //             html += li;
    //         })
    //         ul.innerHTML = html;

    //     }
    // })
});
// Total Drivers Controller
app.controller('totalDriversCtrl', function ($scope, $location) {

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