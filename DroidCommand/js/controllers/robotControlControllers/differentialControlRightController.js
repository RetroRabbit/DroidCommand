angular.module('driodCommand')
.controller('DifferentialControlRightController', ['$scope', '$location', '$http', '$swipe', function ($scope, $location, $http, $swipe) {

    //use $swipe service to get swipe evens on the elements
    $swipe.bind($('#DifferentialDriveRight'), {
        'start': function (coords) {
            console.log("DifferentialDriveRight start x co-ord: " + coords.x);
            console.log("DifferentialDriveRight start y co-ord: " + coords.y);
        },
        'move': function (coords) {
            console.log("DifferentialDriveRight move x co-ord: " + coords.x);
            console.log("DifferentialDriveRight move y co-ord: " + coords.y);
        },
        'end': function (coords) {
            console.log("DifferentialDriveRight end x co-ord: " + coords.x);
            console.log("DifferentialDriveRight end y co-ord: " + coords.y);
        },
        'cancel': function (coords) {
            console.log("DifferentialDriveRight cancel x co-ord: " + coords.x);
            console.log("DifferentialDriveRight cancel y co-ord: " + coords.y);
        }
    });


}]);