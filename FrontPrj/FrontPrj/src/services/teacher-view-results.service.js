import angular from 'angular';

const SERVICE_NAME = 'teacherViewResultsService';

angular.module('app')
    .factory(SERVICE_NAME, ['$http', '$state', '$cookies', 'teacherViewResultsUrl', 'teacherTestsUrl',
        function ($http, $state, $cookies, teacherViewResultsUrl, teacherTestsUrl) {
            var service = {};

            service.getTestResults = function (testID, classID) {
                return $http.get(teacherViewResultsUrl + "TeacherViewResults/GetTestsResults/testID/" + testID + "/classID/" + classID);
            }

            service.getTestByID = function (testID) {
                return $http.get(teacherTestsUrl + "TeacherTests/GetFullTestByID/testID/" + testID);
            }


            service.updateTest = function (test) {
                return $http.put(teacherTestsUrl + "TeacherTests/UpdateTest", test);
            }

            return service;
        }
    ]);

module.exports = SERVICE_NAME;