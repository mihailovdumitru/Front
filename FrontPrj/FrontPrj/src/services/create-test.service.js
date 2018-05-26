import angular from 'angular';

const SERVICE_NAME = 'createTestService';

angular.module('app')
    .factory(SERVICE_NAME, ['$http', '$state', 
        function ($http, $state) {
            var service = {};


            service.getValues = function (values) {
                $http.get('http://localhost:59009/api/values/6').then(function (response) {
                        values = response.data;
                    });
            }

            service.getUserInfoForUserId = function () {
                console.log("Dima");
            };
            return service;
        }
    ]);

module.exports = SERVICE_NAME;