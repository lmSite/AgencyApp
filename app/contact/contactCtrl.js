app.controller('contactCtrl', function ($scope, $sce, $rootScope) {
    
    $rootScope.isNavBAr = true;
    $scope.isSent = false;

    $scope.q = "ben yehuda 100 tel aviv";

    $scope.query = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyCXtNI7RL0FN5jAvjs0fbCwMntma1wY0i4&q=" + encodeURIComponent($scope.q));



    $scope.template_params = {
        from_name: "",
        from_email: "",
        tel: "",
        message_html: ""
    }


    var service_id = "default_service";
    var template_id = "template_Rf96Gqt4";



    $scope.sendEmail = function () {
        emailjs.send(service_id, template_id, $scope.template_params);

        $scope.isSent = true;

        $timeout(function () {
            $scope.isSent = false;
        }, 4000);

        $scope.template_params = {
            from_name: "",
            from_email: "",
            tel: "",
            message_html: ""
        }
    }


});