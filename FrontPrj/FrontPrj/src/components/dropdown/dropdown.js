import angular from 'angular';

import './dropdown.css';

angular
    .module('app')
    .component('dropdownComponent', {
        template: require('@components/dropdown/dropdown.html'),
        bindings: { data: '=', width: '@', height: '@', name: '@', option: '=' }
    })