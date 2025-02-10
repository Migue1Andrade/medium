fetch("header.html")
        .then(response => response.text())
        .then(data => {
            const headerDiv = document.getElementById("header");
            headerDiv.innerHTML = data;

            angular.element(headerDiv).injector().invoke(["$compile", function($compile) {
                const scope = angular.element(headerDiv).scope();
                $compile(headerDiv)(scope);
                scope.$apply();
            }]);
        })
        .catch(error => console.error("Erro ao carregar template:", error));