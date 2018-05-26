import angular from 'angular';

const SERVICE_NAME = 'createTestService';

angular.module('app')
    .factory(SERVICE_NAME, ['$http', '$state', 'createTestBaseUrl',
        function ($http, $state, createTestBaseUrl) {
            var service = {};


            service.getValues = function () {
                return $http.get(createTestBaseUrl + "CreateTest/6");
            }

            service.insertTest = function (params) {
                console.log(params);
                return $http.post(createTestBaseUrl + "CreateTest", params);
            }

            service.getUserInfoForUserId = function () {
                console.log("Dima");
            };
            return service;
        }
    ]);

module.exports = SERVICE_NAME;