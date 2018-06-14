import angular from 'angular';

const SERVICE_NAME = 'teacherViewResultsService';

angular.module('app')
    .factory(SERVICE_NAME, ['$http', '$state', '$cookies', 'teacherViewResultsUrl',
        function ($http, $state, $cookies, teacherViewResultsUrl) {
            var service = {};
            var token = $cookies.get("token");
            $http.defaults.headers.common['Authorization'] = 'Basic ' + token;

            service.getTestResults = function (testID, classID) {
                return $http.get(teacherViewResultsUrl + "TeacherViewResults/GetTestsResults/testID/" + testID + "/classID/" + classID);
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



            service.getUserInfoForUserId = function () {
                console.log("Dima");
            };

            return service;
        }
    ]);

module.exports = SERVICE_NAME;