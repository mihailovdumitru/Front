import angular from 'angular';
import { debug } from 'util';



const CONTROLLER_NAME = 'TeacherViewResultsController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', '$route', 'startTestService', 'entitiesService', 'teacherViewResultsService','authService',
        ($scope, $location, $route,  startTestService, entitiesService, teacherViewResultsService, authService) => {
            var ctrl = $scope;
            ctrl.model = [];
            ctrl.studentsResults = [];
            var selectedLecture = {};
            ctrl.showTable = false;

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

            ctrl.teacherViewResults = function (testID,classID) {
                teacherViewResultsService.getTestResults(testID, classID).then(function (response) {
                    ctrl.showTable = false;
                    if (response.data && response.data != "") {
                        ctrl.studentsResults = response.data;
                        ctrl.showTable = true;
                    }
                    else if (response.data == "") {
                        ctrl.studentsResults = [];
                    }
                });
            }

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

            ctrl.viewTestResults = function () {
                ctrl.teacherViewResults(ctrl.testParams.testID, ctrl.testParams.classID);
            }

        }]);

module.exports = CONTROLLER_NAME;


