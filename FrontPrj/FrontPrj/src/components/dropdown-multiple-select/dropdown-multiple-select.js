import angular from 'angular';

import './dropdown-multiple-select.css';

angular
    .module('app')
    .component('dropdownMultipleSelectComponent', {
        template: require('@components/dropdown-multiple-select/dropdown-multiple-select.template.html'),
        bindings: { data: '=', selectedData: '=', label: '@', width: '@', height: '@', name: '@', option: '=' }
    })