import angular from 'angular';

const SERVICE_NAME = 'entitiesService';

angular.module('app')
    .factory(SERVICE_NAME, ['$http', '$state', 'createTestBaseUrl', 'apiBaseUrl',
        function ($http, $state, createTestBaseUrl, apiBaseUrl) {
            var service = {};

            service.insertLecture = function (lecture) {
                return $http.post(apiBaseUrl + "Lectures", lecture);
            }

            service.getLectures = function () {
                return $http.get(apiBaseUrl + "Lectures");
            }

            service.insertClass = function (studyClass) {
                return $http.post(apiBaseUrl + "Classes", studyClass);
            }

            service.getClasses = function () {
                return $http.get(apiBaseUrl + "Classes");
            }

            service.insertStudent = function (student) {
                return $http.post(apiBaseUrl + "Students", student);
            }

            service.getStudents = function (student) {
                return $http.get(apiBaseUrl + "Students");
            }

            service.insertTeacher = function (teacher) {
                return $http.post(apiBaseUrl + "Teachers", teacher);
            }


            service.getUserInfoForUserId = function () {
                console.log("Dima");
            };

            return service;
        }
    ]);

module.exports = SERVICE_NAME;