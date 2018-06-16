import angular from 'angular';
import { debug } from 'util';

const CONTROLLER_NAME = 'TestsController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', '$route', 'createTestService', 'startTestService', 'entitiesService', 'teacherViewResultsService','authService',
        ($scope, $location, $route, createTestService, startTestService, entitiesService, teacherViewResultsService, authService) => {
            var ctrl = $scope;
            ctrl.model = [];
            ctrl.showQuestion = true;
            var selectedLecture = {};
            ctrl.test = {};


            authService.setToken();

            authService.validateUser("teacher");

            init();

            function init() {
                ctrl.testParams = {};
                ctrl.dropdownTestsAll = [];
            }

            $scope.$watch('testParams.lectureID', function (newValue, oldValue) {
                if (newValue != null && newValue != oldValue) {
                    selectedLecture = ctrl.lectures.filter(lecture => lecture.lectureID == newValue)[0];
                    var yearOfStudy = parseInt(selectedLecture.yearOfStudy);
                    ctrl.dropDownTests = ctrl.dropdownTestsAll.filter(test => test.lectureID == newValue);
                }
            });

            ctrl.getLectures = function () {
                startTestService.getLectures().then(function (response) {
                    if (response.data) {
                        ctrl.dropDownLectures = [];
                        ctrl.lectures = response.data;
                        for (var element of ctrl.lectures) {
                            var lecture = element;
                            lecture.value = element.lectureID;
                            lecture.text = element.name;
                            ctrl.dropDownLectures.push(lecture);
                        }

                        ctrl.getTests();
                    }
                });
            };

            ctrl.getLectures();

            ctrl.getTests = function () {
                startTestService.getTests().then(function (response) {
                    if (response.data) {
                        ctrl.dropDownTests = [];
                        ctrl.tests = response.data;
                        for (var element of ctrl.tests) {
                            var test = element;
                            test.value = element.testID;
                            test.text = element.naming;
                            ctrl.dropdownTestsAll.push(test);
                        }
                        ctrl.dropdownTests = ctrl.dropdownTestsAll.slice();
                    }
                });
            };

            ctrl.getTestById = function (testID) {
                teacherViewResultsService.getTestByID(testID).then(function (response) {
                    if (response.data) {
                        ctrl.test = response.data;
                    }
                });
            }

            ctrl.updateTest = function (test) {
                teacherViewResultsService.updateTest(test).then(function (response) {
                    $route.reload();
                });
            };


            ctrl.viewTestResults = function (testID) {
                ctrl.getTestById(testID);
            }

            ctrl.save = function () {
                ctrl.updateTest(ctrl.test);
            }
        }]);

module.exports = CONTROLLER_NAME;


