// get info from API

function privDataRead(key){
    return privateDataService.Get(key);
};
	
function getBuildingsList(){
    var apikey = privdataRead('API Key');
	if (apiKey == "")
        return '{"error":"No Api Key! Add your key in the server script file."}';
    return proxy.GetProxy('https://api.uwaterloo.ca/v2/buildings/list.json?key=' + apiKey);
}


    
function getOpenData(building){
    var apikey = privdataRead('API Key');
	if (apiKey == "")
        return '{"error":"No Api Key! Add your key in the server script file."}';
    return proxy.GetProxy('https://api.uwaterloo.ca/v2/buildings/'building'/{room}/courses.json?key=' + apiKey);
}
