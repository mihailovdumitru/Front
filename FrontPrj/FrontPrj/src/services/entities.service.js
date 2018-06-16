import angular from 'angular';

const SERVICE_NAME = 'entitiesService';

angular.module('app')
    .factory(SERVICE_NAME, ['$http', '$state', '$cookies', 'createTestBaseUrl', 'apiBaseUrl',
        function ($http, $state, $cookies, createTestBaseUrl, apiBaseUrl) {
            var service = {};
            //var token = $cookies.get("token");
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + token;

            service.insertLecture = function (lecture) {
                return $http.post(apiBaseUrl + "Lectures", lecture);
            }

            service.getLectures = function () {
                return $http.get(apiBaseUrl + "Lectures");
            }

            service.updateLecture = function (lecture, lectureID) {
                return $http.put(apiBaseUrl + "Lectures/" + lectureID, lecture);
            }

            service.deleteLecture = function (lectureID) {
                return $http.delete(apiBaseUrl + "Lectures/" + lectureID);
            }

            service.deleteClass = function (classID) {
                return $http.delete(apiBaseUrl + "Classes/" + classID);
            }

            service.insertClass = function (studyClass) {
                return $http.post(apiBaseUrl + "Classes", studyClass);
            }

            service.getClasses = function () {
                return $http.get(apiBaseUrl + "Classes");
            }

            service.deleteClass = function (classID) {
                return $http.delete(apiBaseUrl + "Classes/" + classID);
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

            service.deleteStudent = function (studentID) {
                return $http.delete(apiBaseUrl + "Students/" + studentID);
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
            }

            service.deleteTeacher = function (teacherID) {
                return $http.delete(apiBaseUrl + "Teachers/" + teacherID);
            }

            return service;
        }
    ]);

module.exports = SERVICE_NAME;