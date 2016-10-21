﻿angular.module("umbraco").controller("UIOMatic.Views.Pickers.MemberController",
    function ($scope, $routeParams, dialogService, entityResource, iconHelper) {

        function init() {

            if (!$scope.setting) {
                $scope.setting = {};
            }

            var val = parseInt($scope.property.value);

            if (!isNaN(val) && angular.isNumber(val) && val > 0) {
                $scope.showQuery = false;

                entityResource.getById(val, "Member").then(function (item) {
                    item.icon = iconHelper.convertFromLegacyIcon(item.icon);
                    $scope.node = item;
                });
            }

            $scope.openMemberPicker = function () {
                var d = dialogService.treePicker({
                    section: "member",
                    treeAlias: "member",
                    multiPicker: false,
                    callback: populate
                });
            };


            $scope.clear = function () {
                $scope.id = undefined;
                $scope.node = undefined;
                $scope.property.value = undefined;
            };

            function populate(item) {
                $scope.clear();
                item.icon = iconHelper.convertFromLegacyIcon(item.icon);
                $scope.node = item;
                $scope.id = item.id;
                $scope.property.value = item.id;
            }
        };

        init();

        $scope.$on('valuesLoaded', function (event, data) {
            init();
        });

    });