import angular from 'angular';

import './header.css';

const CONTROLLER_NAME = require('@components/header/header-controller.js');

angular
    .module('app')
    .component('headerComponent', {
        controller: CONTROLLER_NAME,
        template: require('@components/header/header-template.html'),
        bindings: { teacherrole: '@', adminrole: '@', studentrole: '@' }
    })