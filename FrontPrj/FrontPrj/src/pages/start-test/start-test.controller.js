import angular from 'angular';
import { debug } from 'util';

const CONTROLLER_NAME = 'StartTestController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', '$route', 'startTestService', 'entitiesService', 'authService',
        ($scope, $location, $route, startTestService, entitiesService, authService) => {
            var ctrl = $scope;
            ctrl.model = [];
            var selectedLecture = {};

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
                    ctrl.dropDownStudyClasses = ctrl.studyClasses.filter
                        (studyClass => (parseInt(studyClass.name.toString().charAt(1)) == yearOfStudy));
                    ctrl.dropDownTests = ctrl.dropdownTestsAll.filter(test => test.lectureID == newValue);
                }
            });

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

            ctrl.getTests();


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
                    }
                });
            };


            ctrl.getLectures();

            ctrl.getStudyClasses = function () {
                entitiesService.getClasses().then(function (response) {
                    if (response.data) {
                        ctrl.studyClasses = [];
                        ctrl.classes = response.data;
                        for (var element of ctrl.classes) {
                            var classObj = element;
                            classObj.value = element.classID;
                            classObj.text = element.name;
                            ctrl.studyClasses.push(classObj);
                        }
                    }
                });
            };

            ctrl.getStudyClasses();


            ctrl.beginTest = function () {
                startTestService.generateFileWithHashCodes(ctrl.testParams.classID)
                    .then(function (response) {
                        if (response.data) {
                            var currentdate = new Date();
                            var className = ctrl.dropDownStudyClasses.filter(studyClass => studyClass.classID.toString() == ctrl.testParams.classID)[0].name;
                            var filename = selectedLecture.name + "_" + className + "_" + currentdate.getDate() +
                                "_" + (currentdate.getMonth() + 1) + "_" + currentdate.getFullYear();

                            startTestService.downloadFile(filename, response.data.content);
                            init();
                            ctrl.getLectures();
                            ctrl.getStudyClasses();
                            ctrl.getTests();
                        }
                    });
                startTestService.addTestParams(ctrl.testParams);

            };

        }]);

module.exports = CONTROLLER_NAME;


