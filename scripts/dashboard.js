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
        .when('/editdriver', {
            templateUrl: 'pages/editdriver.html',
            controller: 'editdriverCtrl'
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
            alert('Başarıyla üye oldunuz, şimdi giriş yapınız.')
        })
    }
    $scope.login = function () {
        auth.signInWithEmailAndPassword($scope.mail, $scope.parola).then(sonuc => {
            $location.path('/dashboard')
        }).then(() => {
            $location.path('/dashboard')
        })
    }

    $scope.resetPsw = function () {
        auth.sendPasswordResetEmail($scope.mail).then(function () {
            alert('Sıfırlama maili gönderildi. Lütfen mailinizi kontrol edin.');
            console.log('Email was sent')
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode == 'auth/user-not-found') {
                alert(errorMessage);
            }
            console.log(error);
        });
    }

    $scope.showval = true;
    $scope.hideval = true;
    $scope.hideval2 = true;
    $scope.isShowHide = function (param) {
        if (param == "login") {
            $scope.showval = true;
            $scope.hideval = true;
            $scope.hideval2 = true;
        } else if (param == "signup") {
            $scope.showval = false;
            $scope.hideval = false;
            $scope.hideval2 = true;
        } else if (param == "reset") {
            $scope.showval = false;
            $scope.hideval = true;
            $scope.hideval2 = false;
        }
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
    $scope.editdriver = function () {
        console.log('edit driver sayfasına gidildi');
        $location.path('/editdriver')
    }
    $scope.notifications = function () {
        console.log('notifications sayfasına gidildi');
        $location.path('/notifications')
    }
    $scope.exit = function () {

        console.log('Çıkış Başarılı');
        $location.path('/login')

        // let w = remote.getCurrentWindow()
        // w.close()
    }

    driverNumber = db.collection('drivers').get().then(snap => {
        size = snap.size // will return the collection size
        console.log(size);
        document.querySelector("body > div > div.container.dashboard.ng-scope > div:nth-child(1) > div:nth-child(1) > div > p").textContent = size;
    });

    srcNumber = db.collection('srcState').get().then(snap => {
        size2 = snap.size // will return the collection size
        console.log(size2);
        document.querySelector("body > div > div.container.dashboard.ng-scope > div:nth-child(1) > div:nth-child(2) > div > p").textContent = size2;
    });

    contractualCarNumber = db.collection('carState').get().then(snap => {
        contCar = snap.size // will return the collection size
        companyCar = size - contCar;
        console.log(companyCar);
        document.querySelector("body > div > div.container.dashboard.ng-scope > div:nth-child(1) > div:nth-child(3) > div > p").textContent = contCar;
        document.querySelector("body > div > div.container.dashboard.ng-scope > div:nth-child(2) > div > div > p").textContent = companyCar;
    });
});


// Add Driver Controller
app.controller('addDriverCtrl', function ($scope, $location, $rootScope) {

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
    $scope.editdriver = function () {
        console.log('edit driver sayfasına gidildi');
        $location.path('/editdriver')
    }
    $scope.notifications = function () {
        console.log('notifications sayfasına gidildi');
        $location.path('/notifications')
    }
    $scope.exit = function () {

        console.log('Çıkış Başarılı');
        $location.path('/login')

        // let w = remote.getCurrentWindow()
        // w.close()
    }

    // Image Selection
    $scope.selectImg = function (e) {
        driverPhoto = document.getElementById('image').files[0];
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
                }).then((sub) => {
                    const key = sub.id;
                    console.log(key);
                    if (src === 'srcVar') {
                        db.collection('srcState').add({
                            [key]: key
                        })
                    }
                    if (aracdurumu === 'sozlesmeli') {
                        db.collection('carState').add({
                            [key]: key
                        })
                    }
                }).then(() => {
                    console.log('ekleme basarili');
                    alert('Sürücü Ekleme Başarılı');
                    window.location.reload();
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
        // var dd = today.getDate();
        // var mm = today.getMonth() + 1; //January is 0!
        // var yyyy = today.getFullYear();
        // if (dd < 10) {
        //     dd = '0' + dd
        // }
        // if (mm < 10) {
        //     mm = '0' + mm
        // }
        // today = dd + '/' + mm + '/' + yyyy;
        var timeDiff = Math.abs(date - today.getTime());
        $scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
        //console.log(today);       
    }

    //Document date show/hide depends on the document existance
    $(function () {
        $("input[name='src']").click(function () {
            if ($("#var").is(":checked")) {
                $(".srcDateShow").show();
            } else {
                $(".srcDateShow").hide();
            }
        });
    });
});

// Total Drivers Controller
app.controller('totalDriversCtrl', function ($scope, $location) {

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
    $scope.editdriver = function (e) {
        console.log('edit driver sayfasına gidildi');
        $location.path('/editdriver')
    }
    $scope.notifications = function () {
        console.log('notifications sayfasına gidildi');
        $location.path('/notifications')
    }
    $scope.exit = function () {

        console.log('Çıkış Başarılı');
        $location.path('/login')

        // let w = remote.getCurrentWindow()
        // w.close()
    }

    //Driver Listing to HTML
    const driverList = document.querySelector('#driver-list');

    // Create element and render drivers
    const renderDrivers = doc => {
        const li = driverTemplate(doc);
        driverList.insertAdjacentHTML("beforeend", li);
    }
    const driverTemplate = doc => `
    <div class="accordion">
        ${doc.data().ad} ${doc.data().soyad}
        <div id="${doc.id}" class="panel">
            <p>${doc.data().adres}</p><br>
            <p>${doc.data().email}</p><br>
            <p>${doc.data().aracdurumu}</p><br>
            <p>${doc.data().carModel}</p><br>
            <button class='driverEdit'>Düzenle</button> <button class='deleteDriver'>Sil</button>
        </div>
    </div>
    `

    //Delete Driver Func
    deleteDriver = function (id) {
        if (confirm("Sürücüyü silmek istediğinize emin misiniz?")) {
            db.collection('drivers').doc(id).delete().then(() => {
                alert('Kullanıcı silindi!');
                window.location.reload();
            })
        }
    }

    //Driver Listing
    db.collection('drivers').get().then((snapshot) => {
        //console.log(snapshot.docs);
        snapshot.docs.forEach(doc => {
            renderDrivers(doc);
        }) //Toggle Func
        const objects = document.querySelectorAll('.accordion');
        for (var object of objects) {
            object.addEventListener('click', function (e) {
                console.log(e.path[0].className);
                if (e.path[0].className == 'driverEdit') {
                    var id = e.path[1].id;
                    window.location.href = "file:///Users/harman/Desktop/driverApp/index.html#!/editdriver/?param=" + id;
                } else if (e.path[0].className == 'deleteDriver') {
                    var id = e.path[1].id;
                    deleteDriver(id);
                } else {
                    const childId = e.path[0].children[0].id;
                    const element = document.getElementById(childId);
                    let state = element.style.display;
                    if (state == 'block') {
                        element.style.display = 'none';
                    } else {
                        element.style.display = 'block';
                    }
                }


            })
        }
    }).then(() => {
        childNum = document.querySelector('#driver-list').children;
        numGen = childNum.length;
        console.log('settimeout deneme:', numGen);
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
// Edit Driver Controller
app.controller('editdriverCtrl', function ($scope, $location) {

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
    //Getting Driver datas from db
    var id = $location.path('/editdriver').$$search.param;
    $scope.id = id;
    db.collection('drivers').doc(id).get().then((e) => {
        //console.log(e.data());
        $scope.ad = e.data().ad;
        $scope.soyad = e.data().soyad;
        $scope.adres = e.data().adres;
        $scope.telefon = e.data().telefon;
        $scope.email = e.data().email;
        downloadURL = e.data().photoURL;
        aracdurumu = e.data().aracdurumu;
        srcState = e.data().src
        
 
        if (e.data().srcDate !== null && e.data().srcDate !== undefined) {
            var seconds = e.data().srcDate.seconds*1000;
            var newDate = new Date(seconds);
            var day = ("0" + (newDate.getDate() - 1)).slice(-2);
            var month = ("0" + (newDate.getMonth() + 1)).slice(-2);
            var date = newDate.getFullYear()+'-'+(month)+'-'+(day);
            console.log(date);
            document.querySelector('#srcDate').value = date;
        }
        $scope.carModel = e.data().carModel;
        $scope.carYear = e.data().carYear;
        $scope.carColor = e.data().carColor;
        $scope.carKm = e.data().carKm;
        //$scope.carControl =  e.data().carControl;
        if (srcState == 'srcVar') {
            $('#var').prop('checked', true)

        } else {
            $('#var2').prop('checked', true)

        }
    }).then(() => {
        $('#ad').focus();
        $('#ad').blur();
    })
    //UpdateDriver
    $scope.updateDriver = function (id) {
        if (confirm("Sürücü bilgilerini güncellemek istediğinize emin misiniz?")) {
            id = $scope.id
            db.collection('drivers').doc(id).set({
                    ad: $scope.ad,
                    soyad: $scope.soyad,
                    adres: $scope.adres,
                    telefon: $scope.telefon,
                    email: $scope.email,
                    //photoURL: downloadURL,
                    //aracdurumu: aracdurumu,
                    //src: src,
                    srcDate: $scope.srcDate,
                    carModel: $scope.carModel,
                    carYear: $scope.carYear,
                    carColor: $scope.carColor,
                    carKm: $scope.carKm,
                    carControl: $scope.carControl
                    // psico: psico,
                    // psicoDate: $scope.psicoDate
                })
                // .then((sub) => {
                //     const key = sub.id;
                //     console.log(key);
                //     if (src === 'srcVar') {
                //         db.collection('srcState').add({
                //             [key]: key
                //         })
                //     }
                //     if (aracdurumu === 'sozlesmeli') {
                //         db.collection('carState').add({
                //             [key]: key
                //         })
                //     }
                // })
                .then(() => {
                    console.log('Update success');
                    alert('Sürücü Güncelleme Başarılı');
                }).catch(err => {
                    console.log(err.message);
                })
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
    $scope.editdriver = function () {
        console.log('edit driver sayfasına gidildi');
        $location.path('/editdriver')
    }
    $scope.notifications = function () {
        console.log('notifications sayfasına gidildi');
        $location.path('/notifications')
    }
    $scope.exit = function () {
        console.log('Çıkış Başarılı');
        $location.path('/login')

        // let w = remote.getCurrentWindow()
        // w.close()
    }

    // db.collection('drivers').doc(id).then((e)=>{
    //     console.log(e);

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
    $scope.editdriver = function () {
        console.log('edit driver sayfasına gidildi');
        $location.path('/editdriver')
    }
    $scope.notifications = function () {
        console.log('notifications sayfasına gidildi');
        $location.path('/notifications')
    }
    $scope.exit = function () {

        console.log('Çıkış Başarılı');
        $location.path('/login')

        // let w = remote.getCurrentWindow()
        // w.close()
    }

    driverNumber = db.collection('drivers').get().then(snap => {
        size = snap.size // will return the collection size
        var today = new Date();
        var array = [];
        for (const i in snap.docs) {
            if (snap.docs[i].data().srcDate !== null && snap.docs[i].data().srcDate !== undefined) {
                var date = snap.docs[i].data().srcDate.seconds * 1000;
                console.log(date);
                var timeDiff = Math.abs(date - today.getTime());
                dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));

                var obj = {}
                Object.assign(obj, {
                    ad: snap.docs[i].data().ad
                })
                Object.assign(obj, {
                    soyad: snap.docs[i].data().soyad
                })
                Object.assign(obj, {
                    srcDate: dayDifference
                })
                array.push(obj)

            } else {
                var child = '<li class="list-group-item list-group-item-warning">' + snap.docs[i].data().ad +
                    ' ' + snap.docs[i].data().soyad +
                    '\'ın SRC Belgesi yoktur.'
                '</li>'
                $('div.noneSRC.ng-scope').find('ul').append(child);
            }
        }
        //Sorting By SRC Left Days
        array.sort(sortByDate)

        function sortByDate(a, b) {
            if (a.srcDate < b.srcDate) {
                return -1;
            }
            if (a.srcDate > b.srcDate) {
                return 1;
            }
            return 0;
        }
        for (const obj of array) {
            if (obj.srcDate <= 15) {
                var child = '<li class="list-group-item list-group-item-danger">' + obj.ad +
                    ' ' + obj.soyad +
                    ' SRC Belgesinin süresinin dolmasına ' + obj.srcDate + ' gün kaldı' +
                    '</li>'
            } else {
                var child = '<li class="list-group-item list-group-item-info">' + obj.ad +
                    ' ' + obj.soyad +
                    ' SRC Belgesinin süresinin dolmasına ' + obj.srcDate + ' gün kaldı' +
                    '</li>'
            }
            $('div.notiList.ng-scope').find('ul').append(child);
        }
    });
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