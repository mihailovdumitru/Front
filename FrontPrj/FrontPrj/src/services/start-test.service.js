import angular from 'angular';

const SERVICE_NAME = 'startTestService';

angular.module('app')
    .factory(SERVICE_NAME, ['$http', '$state', '$cookies', 'createTestBaseUrl', 'apiBaseUrl','beginTestBaseUrl',
        function ($http, $state, $cookies, createTestBaseUrl, apiBaseUrl,beginTestBaseUrl) {
            var service = {};
            var token = $cookies.get("token");
            $http.defaults.headers.common['Authorization'] = 'Basic ' + token;

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





            /*service.insertLecture = function (lecture) {
                return $http.post(apiBaseUrl + "Lectures", lecture);
            }

            service.updateLecture = function (lecture, lectureID) {
                return $http.put(apiBaseUrl + "Lectures/" + lectureID, lecture);
            }

            service.insertClass = function (studyClass) {
                return $http.post(apiBaseUrl + "Classes", studyClass);
            }

            service.getClasses = function () {
                return $http.get(apiBaseUrl + "Classes");
            }

            service.updateClass = function (studyClass, classID) {
                return $http.put(apiBaseUrl + "Classes/" + classID, studyClass);
            }

            service.insertStudent = function (student) {
                return $http.post(apiBaseUrl + "Students", student);
            }

            service.updateStudent = function (student, studentID) {
                return $http.put(apiBaseUrl + "Students/" + studentID, student);
            }

            service.getStudents = function (student) {
                return $http.get(apiBaseUrl + "Students");
            }

            service.insertTeacher = function (teacher) {
                return $http.post(apiBaseUrl + "Teachers", teacher);
            }

            service.getTeachers = function () {
                return $http.get(apiBaseUrl + "Teachers");
            }

            service.updateTeacher = function (teacher, teacherID) {
                return $http.put(apiBaseUrl + "Teachers/" + teacherID, teacher);
            }*/




            service.getUserInfoForUserId = function () {
                console.log("Dima");
            };

            return service;
        }
    ]);

module.exports = SERVICE_NAME;