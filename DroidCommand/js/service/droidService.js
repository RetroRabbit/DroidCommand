angular.module('driodCommand')
.service('droidService', function ($location, $rootScope) {

    //this.droidList = {};
    this.counterID = 0;

    //this.droidList = [
    //{
    //    ID: 0,
    //    Name: 'All',
    //    Img: 'img/robot.png',
    //    Mode: 'N/A',
    //    Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
    //    Battery: 100,
    //    EmotionLevel: 100
    //},
    //{
    //    ID: 1,
    //    Name: 'Robocop',
    //    Img: 'img/robot.png',
    //    Mode: 'Autonomous',
    //    Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
    //    Battery: 50,
    //    EmotionLevel: 80
    //},
    //{
    //    ID: 2,
    //    Name: 'T1000',
    //    Img: 'img/robot.png',
    //    Mode: 'Autonomous',
    //    Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
    //    Battery: 40,
    //    EmotionLevel: 20
    //},
    //{
    //    ID: 3,
    //    Name: 'Data',
    //    Img: 'img/robot.png',
    //    Mode: 'Autonomous',
    //    Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
    //    Battery: 60,
    //    EmotionLevel: 60
    //}];

    this.selectedDroidPosition = 1;
 
    // Return public API.
    //return ({
    //    initialiseDroids: initialiseDroids,
    //    getDroids: getDroids,
    //    getActiveDroid: getActiveDroid,
    //    nextDroid: nextDroid
    //});

    this.addDroid = function (device)
    {
        var tempDevice = {
                            ID: this.droidList.length,
                            name: device.name,
                            address: device.address,
                            info: device.info,
                            Img: 'img/robot.png',
                            Mode: 'Autonomous',
                            Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
                            Battery: 100,
                            EmotionLevel: 100
        }
        return tempDevice;
    }

    this.initialiseDroids = function (deviceList)
    {
        this.selectedDroidPosition = 0;

        this.droidList = [
        {
            ID: 0,
            name: 'All',
            address: '0',
            info: null,
            Img: 'img/robot.png',
            Mode: 'N/A',
            Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
            Battery: 100,
            EmotionLevel: 100
        }
        ];

        for (i = this.droidList.length; i < deviceList.length; i++) {
            this.droidList[i] = this.addDroid(deviceList[i])
        }

        if (this.droidList.length > 0) {
            this.selectedDroidPosition = 0;
        }
          
    }

    this.getDroids = function ()
    {
        return this.droidList;
    }

    this.getActiveDroid = function ()
    {
        return this.droidList[this.selectedDroidPosition];
    }

    //add to public
    this.nextDroid = function ()
    {
        if (this.selectedDroidPosition < this.droidList.length -1)
        {
            this.selectedDroidPosition++;
        }   
        else
        {
            this.selectedDroidPosition = 1;
        }

    }

    this.previousDroid = function () {
        if (this.selectedDroidPosition > 1) {
            this.selectedDroidPosition--;
        }
        else {
            this.selectedDroidPosition = this.droidList.length - 1;
        }

    }
});