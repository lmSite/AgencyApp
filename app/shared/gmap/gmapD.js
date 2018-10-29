app.directive("lmGmap", function () {
    return {
    //   restrict: "E",
    //  controller: "gmapCtrl",
    //  scope: { qUrl: '=' },
    // template: "{{qUrl}}"
    //'<iframe width="600" height="450" frameborder="0" style="border:0" ng-src="{{$sce.trustAsResourceUrl(qUrl) }}" allowfullscreen></iframe>'
    restrict: "E",
    template: '<iframe width="600" height="450" frameborder="0" style="border:0" src="{{text}}" ></iframe>',
    //"<p>{{text}}</p>",
    scope: {
      text: "="
    }

  };
  })