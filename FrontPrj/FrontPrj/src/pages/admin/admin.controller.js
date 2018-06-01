import angular from 'angular';
import { debug } from 'util';

const CONTROLLER_NAME = 'AdminController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', '$route', 'createTestService', 'entitiesService', ($scope, $location, $route, createTestService, entitiesService) => {
        var ctrl = $scope;
        ctrl.model = [];
        ctrl.response = "";
        ctrl.classes = {};
        ctrl.students = {};
        ctrl.lectures = {};
        ctrl.dropDownClasses = [];
        ctrl.dropDownStudents = [];
        ctrl.dropDownStudentsAll = [];
        ctrl.person = {};
        ctrl.person.lectures = [];

        ctrl.dropDownLectures = [];

        var test = {};

        ctrl.dropdownData = [{ value: 1, text: "Ddddddddddddddddddddima" }, { value: 2, text: "Jaddddddddddddddddnea" }, { value: 3, text: "Emilddddddddddddddddddddddddddd" }];

        ctrl.selectedRadio = "Teachers";
        ctrl.studyYears = [ { value: 1, text: "1" },
                            { value: 2, text: "2" },
                            { value: 3, text: "3" },
                            { value: 4, text: "4" }];


        init();

        function init() { 
            ctrl.lecture = {};
            ctrl.lecture.name = "";
            ctrl.lecture.yearOfStudy = "";

            ctrl.class = {};
            ctrl.class.name = "";
        }

        $scope.$watch('person.classID', function (newValue, oldValue) {
            if (newValue != null && newValue != oldValue) {
                ctrl.dropDownStudents = ctrl.dropDownStudentsAll.filter
                    (student => (student.classID.toString() == newValue.toString()));
            }
        });
    
         $scope.$watch('person.studentID', function (newValue, oldValue) {
             if (newValue != null && newValue != oldValue) {
                 var personObj = ctrl.dropDownStudentsAll.filter
                     (student => (student.studentID.toString() == newValue.toString()))[0];
                 ctrl.person.firstName = personObj.firstName;
                 ctrl.person.lastName = personObj.lastName;
                 ctrl.person.email = personObj.email;
            }
        });


        ctrl.getLectures = function () {
            entitiesService.getLectures().then(function (response) {
                if (response.data) {
                    ctrl.lectures = response.data;
                    for (var element of ctrl.lectures) {
                        var lecture = element;
                        lecture.value = element.lectureID;
                        lecture.text = element.name;
                        ctrl.dropDownLectures.push(lecture);
                    }
                    console.log(ctrl.dropDownLectures);
                }
            });
        };


        ctrl.getLectures();

        ctrl.getStudyClasses = function () {
            entitiesService.getClasses().then(function (response) {
                if (response.data) {
                    ctrl.classes = response.data;
                    for (var element of ctrl.classes) {
                        ctrl.dropDownClasses.push({ value: element.classID, text: element.name });
                    }
                }
            });
        };

        ctrl.getStudyClasses();

        ctrl.getStudents = function () {
            entitiesService.getStudents().then(function (response) {
                if (response.data) {
                    ctrl.students = response.data;
                    for (var element of ctrl.students) {
                        var student = element;
                        student.value = element.studentID;
                        student.text = element.lastName + ' ' + element.firstName;
                        ctrl.dropDownStudentsAll.push(student);
                    }
                    ctrl.dropDownStudents = ctrl.dropDownStudentsAll.slice();
                }
            });
        }

        ctrl.getStudents();

        ctrl.add = function (selectedRadio) {
            if (selectedRadio == 'Lectures') {
                ctrl.insertLecture(ctrl.lecture);
            }
            else if (selectedRadio == 'Classes') {
                ctrl.insertClass(ctrl.class);
            }
            else if (selectedRadio == 'Students') {
                ctrl.insertStudent(ctrl.person);
            }
            else if (selectedRadio == 'Teachers') {
                console.log(ctrl.person);
                ctrl.insertTeacher(ctrl.person);
            }
        }

        ctrl.insertTeacher = function (teacher) {
            entitiesService.insertTeacher(teacher);
        }

        ctrl.insertStudent = function (student) {
            entitiesService.insertStudent(student);
        }

        ctrl.insertClass = function (studyClass) {
            entitiesService.insertClass(studyClass);
        }


        ctrl.insertLecture = function (lecture) {
            entitiesService.insertLecture(lecture);
        }

        ctrl.deleteElement = function (selectedRadio) {
            console.log(ctrl.classes.dropDownElem);
        };

        ctrl.cancel = function () {
            $route.reload();
        }


    }]);

module.exports = CONTROLLER_NAME;


