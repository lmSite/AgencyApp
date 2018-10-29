app.factory("assetSrv", function ($http, $q, userSrv) {
    let activeAsset = null;
    let isUpdateAsset = false;
    var assets = [];
    var cities = [];



    function Asset(objAsset) {
        this.id = objAsset.id;
        this.userId = objAsset.userId;
        this.forPurpose = objAsset.forPurpose;
        this.price = objAsset.price;
        this.type = objAsset.type;
        this.country = objAsset.country;
        this.city = objAsset.city;
        this.neighborhood = objAsset.neighborhood;
        this.street = objAsset.street;
        this.building = objAsset.building;
        this.evacuationDate = objAsset.evacuationDate;
        this.builtSize = objAsset.builtSize;
        this.size = objAsset.size;
        this.rooms = objAsset.rooms;
        this.floor = objAsset.floor;
        this.balcony = objAsset.balcony;
        this.info = objAsset.info;
        this.airCondition = objAsset.airCondition;
        this.elevator = objAsset.elevator;
        this.bars = objAsset.bars;
        this.parking = objAsset.parking;
        this.imgUrl = objAsset.imgUrl;
    };



    function createAssetObj(asset) {

        return new Asset(asset);
    }


    async function get_Cities() {
        var apiURL = "db/israel-cities.json";
        var response = await $http.get(apiURL);
        cities = [];
        response.data.forEach(function (city) {
            if (city.english_name.length > 0 && city.english_name != "") {
                cities.push(city.english_name);
            }

        })

        return cities;
    }



    async function getAssets() {
        var apiURL = jsonSrvUrl + "/assets";
        var response = await $http.get(apiURL);
        assets = [];
        response.data.forEach(function (asset) {
            assets.push(new Asset(asset));
        })

        return assets;
    }



    async function getAssetById(assetId) {
        var apiURL = jsonSrvUrl + "/assets?id=" + assetId;
        var response = await $http.get(apiURL);
        activeAsset = null;

        if (response.data.length > 0) {
            activeAsset = new Asset(response.data[0]);
            isUpdateAsset = true;

        }

        return activeAsset;
    }



    function getByIndex(index) {
        return assets[index];
    }



    function getActiveAsset() {
        return activeAsset;
    }


    async function getActiveUserAssets() {
        var apiURL = jsonSrvUrl + "/assets?userId=" + userSrv.getActiveUser().id;
        var response = await $http.get(apiURL);
        assets = [];
        response.data.forEach(function (asset) {
            assets.push(new Asset(asset));
        });

        return assets;
    }



    function createAsset(asset) {
        var async = $q.defer();
        var apiURL = jsonSrvUrl + "/assets";
        $http.post(apiURL, asset).then(function (response) {
            var asset = new Asset(response.data);
            async.resolve(asset);
        }, function (err) {
            async.reject(err);
        });

        return async.promise;

    }



    function updateAsset(asset, assetId) {

        var async = $q.defer();

        var apiURL = jsonSrvUrl + "/assets/" + assetId;
        $http.patch(apiURL, asset).then(function (response) {

            async.resolve(response);

        }, function (err) {
            async.reject(err);
        });
        return async.promise;
    }



    async function deleteAsset(assetId) {
        var apiURL = jsonSrvUrl + "/assets/" + assetId;
        var response = await $http.delete(apiURL);
        return;
    }



    return {
        createAssetObj: createAssetObj,
        getAssets: getAssets,
        getAssetById: getAssetById,
        getByIndex: getByIndex,
        get_Cities: get_Cities,
        getActiveAsset: getActiveAsset,
        getActiveUserAssets: getActiveUserAssets,
        createAsset: createAsset,
        updateAsset: updateAsset,
        deleteAsset: deleteAsset,
        isUpdateAsset: isUpdateAsset
  }

})