// get info from API

function privDataRead(key) {
    return privateDataService.Get(key);
};

function getParkingLots() {
    var apiKey = privDataRead('api_key');
    if (apiKey == "")
        return '{"error":"No Api Key! Add your key in the server script file."}';
    var data = JSON.parse(proxy.GetProxy('https://api.uwaterloo.ca/v2/parking/watpark.json?key=' + apiKey));
    var meterData = JSON.parse(proxy.GetProxy('https://api.uwaterloo.ca/v2/parking/lots/meter.json?key=' + apiKey));
    meterData = meterData.data;
    var lots = data.data;
    var openLots = [];
    for (i = 0; i < meterData; i++) {
        var parkingLot = new Object();
        parkingLot.lot_name =  meterData[i].name;
        parkingLot.longitude = meterData[i].longitude;
        parkingLot.latitude =  meterData[i].latitude;
        parkingLot.capacity = 0;
        parkingLot.percent_fill = 0;
        parkingLot.current_count = 0;
        
        openLots.push(JSON.parse(parkingLot));
    }

    for (i = 0; i < lots.length; i++) {
        if (lots[i].percent_filled < 100) {
            openLots.push(lots[i]);
        }
    }

    openLots = orderByLocation(openLots, args.Get('latitude'), args.Get('longitude'));
	openLots.concat(meterData);
    return openLots;
}

function orderByLocation(lots, lat, long) {
    
    for (i = 0; i < lots.length; i++) {
        lots[i].distance = Math.sqrt((lat - lots[i].latitude) * (lat - lots[i].latitude) + (long - lots[i].longitude) * (long - lots[i].longitude))
    }
    lots.sort(compLots);
    return lots
}

function compLots(lotA, lotB) {
    if (lotA.distance > lotB.distance) {
        return 1;
    }
    return -1;
}

function getOpenData(building) {
    var apikey = privdataRead('API Key');
    if (apiKey == "")
        return '{"error":"No Api Key! Add your key in the server script file."}';
    return proxy.GetProxy('https://api.uwaterloo.ca/v2/buildings/' + building + '/{room}/courses.json?key=' + apiKey);
}