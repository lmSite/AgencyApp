app.controller('homeCtrl', function( $scope ,$rootScope  ) {
    $rootScope.isNavBAr=true;
    
    $.get(jsonSrvUrl, function (data, status) {
        console.log('loaded');
    });
    
});
