import angular from 'angular';

const SERVICE_NAME = 'entitiesService';

angular.module('app')
    .factory(SERVICE_NAME, ['$http', '$state', 'createTestBaseUrl', 'apiBaseUrl',
        function ($http, $state, createTestBaseUrl, apiBaseUrl) {
            var service = {};

            service.insertTest = function (test) {
                console.log(test);
                return $http.post(createTestBaseUrl + "CreateTest", test);
            }

            service.insertLecture = function (lecture) {
                return $http.post(apiBaseUrl + "Lectures", lecture);
            }

            service.insertClass = function (studyClass) {
                return $http.post(apiBaseUrl + "Classes", studyClass);
            }

            service.getClasses = function () {
                return $http.get(apiBaseUrl + "Classes");
            }

            service.getUserInfoForUserId = function () {
                console.log("Dima");
            };

            return service;
        }
    ]);

module.exports = SERVICE_NAME;