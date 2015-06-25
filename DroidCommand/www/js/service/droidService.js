angular.module('driodCommand')
.service('droidService', function ($location, $rootScope) {

    this.droidList = [];
    this.counterID = 0;

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
                            AutonomousBehaviour: null,
                            Battery: 100,
                            EmotionLevel: 100
        }
        return tempDevice;
    }

    this.initialiseDroids = function (deviceList, connectedDeviceInfo)
    {
        this.selectedDroidPosition = 0;

        for (i = 0; i < deviceList.length; i++) {
            if (deviceList[i].info != null)
            {
                this.droidList[i] = this.addDroid(deviceList[i]);

                if (deviceList[i].address == connectedDeviceInfo.address) {
                    this.selectedDroidPosition = i;
                }
            }         
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
            this.selectedDroidPosition = 0;
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