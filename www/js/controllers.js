var channel = {};

angular.module('starter.controllers', [])

        .controller('HomeCtrl', function ($scope, $stateParams, $http, $ionicLoading, $state, $location) {

            $scope.input = [];
            $scope.channels = [];

            $scope.search = function () {
                if (('' + $scope.input.search).length >= 4) {

                    $ionicLoading.show();

                    $http({
                        method: 'GET',
                        url: 'https://www.googleapis.com/youtube/v3/search',
                        params: {
                            part: 'snippet, id',
                            q: $scope.input.search,
                            type: 'channel',
                            key: 'AIzaSyBHEmLqtgV6_Ip7nHJJgF5-vP_hyw2tYCo'
                        }
                    })
                            .then(function (response) {
                                $scope.channels = response.data.items;
                                
                                $ionicLoading.hide();
                            }, function (response) {
                                $ionicLoading.hide();
                            });

                }
            };

            $scope.select = function (chnl) {
                channel = chnl;
                $location.path('/inscritos');
            };


        })

        .controller('InscritosCtrl', function ($scope, $stateParams, $http, $ionicLoading, $location, $interval) {

            $scope.atualiza = function () {

                $http({
                    method: 'GET',
                    url: 'https://www.googleapis.com/youtube/v3/channels',
                    params: {
                        part: 'statistics,brandingSettings,snippet',
                        id: channel.id.channelId,
                        key: 'AIzaSyBHEmLqtgV6_Ip7nHJJgF5-vP_hyw2tYCo'
                    }
                })
                        .then(function (response) {
                            if (('' + channel).length > 10 && ('' + $scope.channel).length > 10){
                                
                                if ($scope.channel.statistics.subscriberCount
                                        < response.data.items[0].statistics.subscriberCount) {
                                    $scope.subscriber = "balanced";
                                } else if($scope.channel.statistics.subscriberCount
                                        > response.data.items[0].statistics.subscriberCount) {
                                    $scope.subscriber = "assertive";
                                } else{
                                    $scope.subscriber = "";
                                }
                            }
                            $scope.channel = response.data.items[0];
                            
                            $ionicLoading.hide();
                        }, function (response) {
                            $location.path('/home');
                            $ionicLoading.hide();
                        });
            }

            if (('' + channel).length > 0) {
                $ionicLoading.show();
                $scope.atualiza();

                var interval = $interval(function () {
                    $scope.atualiza();
                }, 6000);

            } else {
                $location.path('/home');
            }


        });
