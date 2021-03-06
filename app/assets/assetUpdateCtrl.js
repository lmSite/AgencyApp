app.controller('assetUpdateCtrl', function ($scope, $filter,  $timeout, $location, $route, assetSrv) {

  $scope.modalUpdate = "";
  $scope.isAssetUpd = false;

  //load cities
  assetSrv.get_Cities().then(function (cities) {
    $scope.cities = cities;
    $scope.$apply();
  }, function (err) {
    console.log(err);
  });

  $scope.saveAssetUpdate = function (assetUpdate) {

    if (angular.isDate($scope.dt))
      assetUpdate.evacuationDate = $filter('date')(new Date($scope.dt), 'dd/MM/yyyy').toString();

    assetSrv.updateAsset(assetUpdate, assetUpdate.id);
    $scope.cancelAssetUpdate();

  };

  $scope.cancelAssetUpdate = function () {
    
    sessionStorage.activeTab = 2;
    
    $scope.dt = undefined;

    $timeout(function () {

      $route.reload();

      $location.path("/admin");
    }, 500);

    $scope.modalUpdate = "modal";
  }

  $scope.reloadLoc = function () {
    $route.reload();
  }
 
  // date handling==============================================

  $scope.today = function () {
    $scope.dt = new Date();
  };

  $scope.clear = function () {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };


  $scope.toggleMin = function () {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function () {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function () {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function (year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }


});
