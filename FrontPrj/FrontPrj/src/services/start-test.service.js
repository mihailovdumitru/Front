import angular from 'angular';

const SERVICE_NAME = 'startTestService';

angular.module('app')
    .factory(SERVICE_NAME, ['$http', '$state', '$cookies', 'createTestBaseUrl', 'apiBaseUrl', 'beginTestBaseUrl', 'studentBeginTestUrl',
        function ($http, $state, $cookies, createTestBaseUrl, apiBaseUrl, beginTestBaseUrl, studentBeginTestUrl) {
            var service = {};
            //var token = $cookies.get("token");
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + token;



            service.getLectures = function () {
                return $http.get(beginTestBaseUrl + "TeacherLectures");
            }

            service.getTests = function () {
                return $http.get(beginTestBaseUrl + "Tests");
            }

            service.generateFileWithHashCodes = function (classID) {
                return $http.post(beginTestBaseUrl + "GenerateFileWithHashCodes", classID);
            }

            service.addTestParams = function (testParams) {
                return $http.post(beginTestBaseUrl + "AddTestParameters", testParams);
            }

            service.getStudentTest = function () {
                return $http.get(studentBeginTestUrl + "StudentTest/GetTest");
            }

            service.getTestInfo = function () {
                return $http.get(studentBeginTestUrl + "StudentTest/GetTestParams");
            }


            service.addTestsResults = function (testResults) {
                return $http.post(studentBeginTestUrl + "StudentTest/PostTestsResults", testResults);
            }

            service.getTestsResults = function () {
                return $http.get(studentBeginTestUrl + "StudentTest/GetTestsResults");
            }


            service.getFullTest = function () {
                return $http.get(studentBeginTestUrl + "StudentTest/GetFullTest");
            }

            service.getTestParamsForTest = function (testID) {
                return $http.get(studentBeginTestUrl + "StudentTest/GetTestParamsByTestID/" + testID);
            }



            service.downloadFile = function (filename, fileContent) {
                var blob = new Blob([fileContent], {
                    encoding: "UTF-8",
                    type: 'text/html'
                });

                if (window.navigator.msSaveOrOpenBlob) { // For IE
                    navigator.msSaveBlob(blob, filename + '.txt');
                } else { // For other browsers
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = filename + ".txt";
                    document.body.appendChild(link);
                    link.click();
                    window.URL.revokeObjectURL(link.href);
                    document.body.removeChild(link);
                }
            };

            return service;
        }
    ]);

module.exports = SERVICE_NAME;