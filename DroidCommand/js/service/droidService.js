angular.module('driodCommand')
.service('droidService', function ($location, $rootScope) {

    this.activeDroid = null;
    this.droidList = {};
    this.selectedDroidPosition = 0;
 
    // Return public API.
    return ({
        initialiseDroids: initialiseDroids,
        getDroids: getDroids,
        getActiveDroid: getActiveDroid
    });

    function initialiseDroids()
    {
        this.selectedDroidPosition = 0;

        this.droidList = {
            ID: 0,
            Name: 'All',
            Img: 'img/robot.png',
            Mode: 'N/A',
            Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
            Battery: 100,
            EmotionLevel: 100
        };

        //robot data
        $scope.droidList = [
        {
            ID: 1,
            Name: 'Robocop',
            Img: 'img/robot.png',
            Mode: 'Autonomous',
            Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
            Battery: 50,
            EmotionLevel: 80
        },
        {
            ID: 2,
            Name: 'T1000',
            Img: 'img/robot.png',
            Mode: 'Autonomous',
            Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
            Battery: 40,
            EmotionLevel: 20
        },
        {
            ID: 3,
            Name: 'Data',
            Img: 'img/robot.png',
            Mode: 'Autonomous',
            Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
            Battery: 60,
            EmotionLevel: 60
        }];

        this.activeDroid = this.droidList[this.selectedDroidPosition];   
    }

    function getDroids()
    {
        return this.droidList;
    }

    function getActiveDroid()
    {
        return this.activeDroid;
    }

}]);