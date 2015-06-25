angular.module('driodCommand')
.controller('DifferentialControlLeftController', ['$scope', '$location', '$http', '$swipe', function ($scope, $location, $http, $swipe) {

    //use $swipe service to get swipe evens on the elements
    $swipe.bind($('#DifferentialDriveLeft'), {
        'start': function (coords) {
            console.log("DifferentialDriveLeft start x co-ord: " + coords.x);
            console.log("DifferentialDriveLeft start y co-ord: " + coords.y);
        },
        'move': function (coords) {
            console.log("DifferentialDriveLeft move x co-ord: " + coords.x);
            console.log("DifferentialDriveLeft move y co-ord: " + coords.y);
        },
        'end': function (coords) {
            console.log("DifferentialDriveLeft end x co-ord: " + coords.x);
            console.log("DifferentialDriveLeft end y co-ord: " + coords.y);
        },
        'cancel': function (coords) {
            console.log("DifferentialDriveLeft cancel x co-ord: " + coords.x);
            console.log("DifferentialDriveLeft cancel y co-ord: " + coords.y);
        }
    });


}]);