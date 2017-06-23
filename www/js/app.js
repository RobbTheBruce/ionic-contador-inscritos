// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }


                var admobid = {};
                // select the right Ad Id according to platform
                if (/(android)/i.test(navigator.userAgent)) {
                    admobid = {// for Android
                        banner: 'xx-xxx-xxx-xxxx/46891xxx23281',
                        interstitial: 'cxxxa-axxxpp-xx-78234651xxx1373121xxx6/xxxxx'
                    };
                } 

                if (window.AdMob)
                    AdMob.createBanner({
                        adId: admobid.banner,
                        position: AdMob.AD_POSITION.BOTTOM_CENTER,
                        autoShow: true
                    });




            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                    .state('home', {
                        url: '/home',

                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    })
                    .state('inscritos', {
                        url: '/inscritos',

                        templateUrl: 'templates/inscritos.html',
                        controller: 'InscritosCtrl'
                    });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/home');
        });
