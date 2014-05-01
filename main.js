angular.module ('admisionApp', [])
    .factory ('mongolabResource', function ($http) {
        var objName = "persona";
        var apiKey = "94m7FxDlMbXUd6CTqpzwRrk8wCrhJKjc";
        var mongoURL = "https://api.mongolab.com/api/1/databases/shell/collections/" + objName;
        return {
            getList: function () {
                return $http.get (mongoURL + "?apiKey=" + apiKey, {});
            },
            addPersona: function (persona) {
                return $http.post (mongoURL + "?apiKey=" + apiKey, persona);
            },
            removePersona: function (persona) {
                return $http.delete (mongoURL + "/" + persona._id.$oid + "?apiKey=" + apiKey, {});
            }
        }
    })
    .controller ('mainController', function ($scope, mongolabResource) {
        $scope.personas = [];
        mongolabResource.getList ().then (function (response) {
            $scope.personas = response.data;
        });

        $scope.agregarPersona = function () {
            mongolabResource.addPersona ($scope.persona).then (function (response) {
                $scope.personas.push (response.data);
            });
        };

        $scope.remove = function (persona) {
            mongolabResource.removePersona (persona).then (function (response) {
                var index = $scope.personas.indexOf (persona);
                $scope.personas.splice (index, 1);
            }, function (response) {
                console.log ("Ocurrio un error!! :-(");
            });
        }
    })
;

