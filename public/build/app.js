"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.search.js */ "./node_modules/core-js/modules/es.string.search.js");
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/app.scss */ "./assets/styles/app.scss");
/* harmony import */ var datatables_net__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! datatables.net */ "./node_modules/datatables.net/js/jquery.dataTables.js");
/* harmony import */ var datatables_net__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(datatables_net__WEBPACK_IMPORTED_MODULE_6__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");






/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// any CSS you import will output into a single css file (app.css in this case)

 // start the Stimulus application
// let oTable = $('#datatable').DataTable({
//   pageLength: 60,
//   lengthChange: false,
// })

switch (window.location.pathname) {
  case '/':
    window.addEventListener('load', function () {
      var table = $('#datatable').DataTable({
        sPaginationType: 'full_numbers',
        language: {
          paginate: {
            previous: '<a class="mailpreview" href="#">&laquo;</a>',
            next: '<a  class="mailpreview" href="#">&raquo;</a>'
          },
          search: 'Recherche:',
          zeroRecords: 'Pas de résultats'
        },
        ajax: window.location.protocol + '//' + window.location.host + '/',
        columns: [{
          data: 'receiver'
        }, {
          data: 'subject'
        }, {
          data: 'content'
        }, {
          data: 'date'
        }, {
          data: 'status'
        }],
        bAutoWidth: false
      });
      $('#myInputTextField').keyup(function () {
        table.search($(this).val()).draw();
      });
      var button = document.querySelector('.paginate_button');
      button.classList.toggle('effect');
    });
    break;

  case '/unseen':
    window.addEventListener('load', function () {
      var table = $('#datatable').DataTable({
        language: {
          paginate: {
            previous: '<a class="mailpreview" href="#">&laquo;</a>',
            next: '<a  class="mailpreview" href="#">&raquo;</a>'
          },
          search: 'Recherche:',
          zeroRecords: 'Pas de résultats'
        },
        ajax: window.location.protocol + '//' + window.location.host + '/unseen',
        columns: [{
          data: 'receiver'
        }, {
          data: 'subject'
        }, {
          data: 'content'
        }, {
          data: 'date'
        }, {
          data: 'status'
        }],
        bAutoWidth: false
      });
      $('#myInputTextField').keyup(function () {
        table.search($(this).val()).draw();
      });
    });
    break;

  case '/seen':
    window.addEventListener('load', function () {
      var table = $('#datatable').DataTable({
        ajax: window.location.protocol + '//' + window.location.host + '/seen',
        language: {
          paginate: {
            previous: '<a class="mailpreview" href="#">&laquo;</a>',
            next: '<a  class="mailpreview" href="#">&raquo;</a>'
          },
          search: 'Recherche:',
          zeroRecords: 'Pas de résultats'
        },
        columns: [{
          data: 'receiver'
        }, {
          data: 'subject'
        }, {
          data: 'content'
        }, {
          data: 'date'
        }, {
          data: 'status'
        }],
        bAutoWidth: false
      });
      $('#myInputTextField').keyup(function () {
        table.search($(this).val()).draw();
      });
    });
    break;

  case '/stat/hour':
    window.addEventListener('load', function () {
      $.ajax({
        url: window.location.protocol + '//' + window.location.host + '/stat/hour',
        success: function success(data) {
          var drawtable = [];
          data.data.forEach(function (element) {
            drawtable.push(element);
          });
          google.charts.load('current', {
            packages: ['corechart', 'bar']
          });
          google.charts.setOnLoadCallback(drawTitleSubtitle);

          function drawTitleSubtitle() {
            var table = google.visualization.arrayToDataTable(drawtable);
            var materialOptions = {
              width: 1500,
              height: 750,
              chart: {
                title: 'Nombre des mail lu par heure',
                subtitle: 'Basé sur les mail envoyer'
              },
              hAxis: {
                title: 'Total Population',
                minValue: 0
              },
              vAxis: {
                title: 'City'
              },
              bars: 'horizontal',
              colors: ['#7650f8']
            };
            var materialChart = new google.charts.Bar(document.getElementById('chart_div'));
            materialChart.draw(table, materialOptions);
          }
        }
      });
    });
    break;

  case '/stat/person':
    document.getElementById('search').addEventListener('click', function () {
      $.ajax({
        type: 'POST',
        url: window.location.protocol + '//' + window.location.host + '/stat/person',
        data: document.getElementById('to').value,
        success: function success(data) {
          var drawtable = [];
          data.data.forEach(function (element) {
            drawtable.push(element);
          });
          google.charts.load('current', {
            packages: ['corechart', 'bar']
          });
          google.charts.setOnLoadCallback(drawTitleSubtitle);

          function drawTitleSubtitle() {
            var table = google.visualization.arrayToDataTable(drawtable);
            var materialOptions = {
              width: 1500,
              height: 400,
              chart: {
                title: drawtable[0][0],
                subtitle: drawtable[0][1]
              },
              hAxis: {
                title: 'Total Population',
                minValue: 0
              },
              vAxis: {
                title: 'City'
              },
              bars: 'horizontal',
              colors: ['#7650f8']
            };
            var materialChart = new google.charts.Bar(document.getElementById('chart_div'));
            materialChart.draw(table, materialOptions);
          }
        }
      });
    });
    break;
}

/***/ }),

/***/ "./assets/styles/app.scss":
/*!********************************!*\
  !*** ./assets/styles/app.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_modules_es_array_for-each_js-node_modules_core-js_modules_es_obj-1954e2"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y0FGTCxDQUhhO2NBT3BCa0IsS0FBSyxFQUFFO2dCQUNMRixLQUFLLEVBQUUsa0JBREY7Z0JBRUxHLFFBQVEsRUFBRTtjQUZMLENBUGE7Y0FXcEJDLEtBQUssRUFBRTtnQkFDTEosS0FBSyxFQUFFO2NBREYsQ0FYYTtjQWNwQkssSUFBSSxFQUFFLFlBZGM7Y0FlcEJDLE1BQU0sRUFBRSxDQUFDLFNBQUQ7WUFmWSxDQUF0QjtZQWlCQSxJQUFJQyxhQUFhLEdBQUcsSUFBSW5CLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjbUIsR0FBbEIsQ0FDbEI5QixRQUFRLENBQUMrQixjQUFULENBQXdCLFdBQXhCLENBRGtCLENBQXBCO1lBR0FGLGFBQWEsQ0FBQy9CLElBQWQsQ0FBbUJsQixLQUFuQixFQUEwQnNDLGVBQTFCO1VBQ0Q7UUFDRjtNQXhDSSxDQUFQO0lBMENELENBM0NEO0lBNENBO0FBMUtKOzs7Ozs7Ozs7OztBQ2pCQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9hcHAuc2Nzcz84ZjU5Il0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXG4gKlxuICogV2UgcmVjb21tZW5kIGluY2x1ZGluZyB0aGUgYnVpbHQgdmVyc2lvbiBvZiB0aGlzIEphdmFTY3JpcHQgZmlsZVxuICogKGFuZCBpdHMgQ1NTIGZpbGUpIGluIHlvdXIgYmFzZSBsYXlvdXQgKGJhc2UuaHRtbC50d2lnKS5cbiAqL1xuXG4vLyBhbnkgQ1NTIHlvdSBpbXBvcnQgd2lsbCBvdXRwdXQgaW50byBhIHNpbmdsZSBjc3MgZmlsZSAoYXBwLmNzcyBpbiB0aGlzIGNhc2UpXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJ1xuaW1wb3J0ICdkYXRhdGFibGVzLm5ldCdcblxuLy8gc3RhcnQgdGhlIFN0aW11bHVzIGFwcGxpY2F0aW9uXG4vLyBsZXQgb1RhYmxlID0gJCgnI2RhdGF0YWJsZScpLkRhdGFUYWJsZSh7XG4vLyAgIHBhZ2VMZW5ndGg6IDYwLFxuLy8gICBsZW5ndGhDaGFuZ2U6IGZhbHNlLFxuLy8gfSlcblxuc3dpdGNoICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgY2FzZSAnLyc6XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGFibGUgPSAkKCcjZGF0YXRhYmxlJykuRGF0YVRhYmxlKHtcbiAgICAgICAgc1BhZ2luYXRpb25UeXBlOiAnZnVsbF9udW1iZXJzJyxcbiAgICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgICBwYWdpbmF0ZToge1xuICAgICAgICAgICAgcHJldmlvdXM6ICc8YSBjbGFzcz1cIm1haWxwcmV2aWV3XCIgaHJlZj1cIiNcIj4mbGFxdW87PC9hPicsXG4gICAgICAgICAgICBuZXh0OiAnPGEgIGNsYXNzPVwibWFpbHByZXZpZXdcIiBocmVmPVwiI1wiPiZyYXF1bzs8L2E+JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNlYXJjaDogJ1JlY2hlcmNoZTonLFxuICAgICAgICAgIHplcm9SZWNvcmRzOiAnUGFzIGRlIHLDqXN1bHRhdHMnLFxuICAgICAgICB9LFxuICAgICAgICBhamF4OiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyAnLycsXG4gICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICB7IGRhdGE6ICdyZWNlaXZlcicgfSxcbiAgICAgICAgICB7IGRhdGE6ICdzdWJqZWN0JyB9LFxuICAgICAgICAgIHsgZGF0YTogJ2NvbnRlbnQnIH0sXG4gICAgICAgICAgeyBkYXRhOiAnZGF0ZScgfSxcbiAgICAgICAgICB7IGRhdGE6ICdzdGF0dXMnIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGJBdXRvV2lkdGg6IGZhbHNlLFxuICAgICAgfSlcbiAgICAgICQoJyNteUlucHV0VGV4dEZpZWxkJykua2V5dXAoZnVuY3Rpb24gKCkge1xuICAgICAgICB0YWJsZS5zZWFyY2goJCh0aGlzKS52YWwoKSkuZHJhdygpXG4gICAgICB9KVxuICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0ZV9idXR0b24nKVxuICAgICAgYnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2VmZmVjdCcpXG4gICAgfSlcbiAgICBicmVha1xuICBjYXNlICcvdW5zZWVuJzpcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0YWJsZSA9ICQoJyNkYXRhdGFibGUnKS5EYXRhVGFibGUoe1xuICAgICAgICBsYW5ndWFnZToge1xuICAgICAgICAgIHBhZ2luYXRlOiB7XG4gICAgICAgICAgICBwcmV2aW91czogJzxhIGNsYXNzPVwibWFpbHByZXZpZXdcIiBocmVmPVwiI1wiPiZsYXF1bzs8L2E+JyxcbiAgICAgICAgICAgIG5leHQ6ICc8YSAgY2xhc3M9XCJtYWlscHJldmlld1wiIGhyZWY9XCIjXCI+JnJhcXVvOzwvYT4nLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2VhcmNoOiAnUmVjaGVyY2hlOicsXG4gICAgICAgICAgemVyb1JlY29yZHM6ICdQYXMgZGUgcsOpc3VsdGF0cycsXG4gICAgICAgIH0sXG4gICAgICAgIGFqYXg6XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgJy91bnNlZW4nLFxuICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgeyBkYXRhOiAncmVjZWl2ZXInIH0sXG4gICAgICAgICAgeyBkYXRhOiAnc3ViamVjdCcgfSxcbiAgICAgICAgICB7IGRhdGE6ICdjb250ZW50JyB9LFxuICAgICAgICAgIHsgZGF0YTogJ2RhdGUnIH0sXG4gICAgICAgICAgeyBkYXRhOiAnc3RhdHVzJyB9LFxuICAgICAgICBdLFxuICAgICAgICBiQXV0b1dpZHRoOiBmYWxzZSxcbiAgICAgIH0pXG4gICAgICAkKCcjbXlJbnB1dFRleHRGaWVsZCcpLmtleXVwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGFibGUuc2VhcmNoKCQodGhpcykudmFsKCkpLmRyYXcoKVxuICAgICAgfSlcbiAgICB9KVxuICAgIGJyZWFrXG4gIGNhc2UgJy9zZWVuJzpcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0YWJsZSA9ICQoJyNkYXRhdGFibGUnKS5EYXRhVGFibGUoe1xuICAgICAgICBhamF4OiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyAnL3NlZW4nLFxuICAgICAgICBsYW5ndWFnZToge1xuICAgICAgICAgIHBhZ2luYXRlOiB7XG4gICAgICAgICAgICBwcmV2aW91czogJzxhIGNsYXNzPVwibWFpbHByZXZpZXdcIiBocmVmPVwiI1wiPiZsYXF1bzs8L2E+JyxcbiAgICAgICAgICAgIG5leHQ6ICc8YSAgY2xhc3M9XCJtYWlscHJldmlld1wiIGhyZWY9XCIjXCI+JnJhcXVvOzwvYT4nLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2VhcmNoOiAnUmVjaGVyY2hlOicsXG4gICAgICAgICAgemVyb1JlY29yZHM6ICdQYXMgZGUgcsOpc3VsdGF0cycsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICB7IGRhdGE6ICdyZWNlaXZlcicgfSxcbiAgICAgICAgICB7IGRhdGE6ICdzdWJqZWN0JyB9LFxuICAgICAgICAgIHsgZGF0YTogJ2NvbnRlbnQnIH0sXG4gICAgICAgICAgeyBkYXRhOiAnZGF0ZScgfSxcbiAgICAgICAgICB7IGRhdGE6ICdzdGF0dXMnIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGJBdXRvV2lkdGg6IGZhbHNlLFxuICAgICAgfSlcbiAgICAgICQoJyNteUlucHV0VGV4dEZpZWxkJykua2V5dXAoZnVuY3Rpb24gKCkge1xuICAgICAgICB0YWJsZS5zZWFyY2goJCh0aGlzKS52YWwoKSkuZHJhdygpXG4gICAgICB9KVxuICAgIH0pXG4gICAgYnJlYWtcbiAgY2FzZSAnL3N0YXQvaG91cic6XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgJy9zdGF0L2hvdXInLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIGxldCBkcmF3dGFibGUgPSBbXVxuICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBkcmF3dGFibGUucHVzaChlbGVtZW50KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgZ29vZ2xlLmNoYXJ0cy5sb2FkKCdjdXJyZW50JywgeyBwYWNrYWdlczogWydjb3JlY2hhcnQnLCAnYmFyJ10gfSlcbiAgICAgICAgICBnb29nbGUuY2hhcnRzLnNldE9uTG9hZENhbGxiYWNrKGRyYXdUaXRsZVN1YnRpdGxlKVxuICAgICAgICAgIGZ1bmN0aW9uIGRyYXdUaXRsZVN1YnRpdGxlKCkge1xuICAgICAgICAgICAgdmFyIHRhYmxlID0gZ29vZ2xlLnZpc3VhbGl6YXRpb24uYXJyYXlUb0RhdGFUYWJsZShkcmF3dGFibGUpXG5cbiAgICAgICAgICAgIHZhciBtYXRlcmlhbE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgIHdpZHRoOiAxNTAwLFxuICAgICAgICAgICAgICBoZWlnaHQ6IDc1MCxcbiAgICAgICAgICAgICAgY2hhcnQ6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ05vbWJyZSBkZXMgbWFpbCBsdSBwYXIgaGV1cmUnLFxuICAgICAgICAgICAgICAgIHN1YnRpdGxlOiAnQmFzw6kgc3VyIGxlcyBtYWlsIGVudm95ZXInLFxuICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgIGhBeGlzOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdUb3RhbCBQb3B1bGF0aW9uJyxcbiAgICAgICAgICAgICAgICBtaW5WYWx1ZTogMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdkF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0NpdHknLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBiYXJzOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICAgIGNvbG9yczogWycjNzY1MGY4J10sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWF0ZXJpYWxDaGFydCA9IG5ldyBnb29nbGUuY2hhcnRzLkJhcihcbiAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXJ0X2RpdicpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgbWF0ZXJpYWxDaGFydC5kcmF3KHRhYmxlLCBtYXRlcmlhbE9wdGlvbnMpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9KVxuICAgIGJyZWFrXG4gIGNhc2UgJy9zdGF0L3BlcnNvbic6XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICB1cmw6XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLnByb3RvY29sICtcbiAgICAgICAgICAnLy8nICtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgJy9zdGF0L3BlcnNvbicsXG4gICAgICAgIGRhdGE6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0bycpLnZhbHVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIGxldCBkcmF3dGFibGUgPSBbXVxuICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBkcmF3dGFibGUucHVzaChlbGVtZW50KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgZ29vZ2xlLmNoYXJ0cy5sb2FkKCdjdXJyZW50JywgeyBwYWNrYWdlczogWydjb3JlY2hhcnQnLCAnYmFyJ10gfSlcbiAgICAgICAgICBnb29nbGUuY2hhcnRzLnNldE9uTG9hZENhbGxiYWNrKGRyYXdUaXRsZVN1YnRpdGxlKVxuICAgICAgICAgIGZ1bmN0aW9uIGRyYXdUaXRsZVN1YnRpdGxlKCkge1xuICAgICAgICAgICAgdmFyIHRhYmxlID0gZ29vZ2xlLnZpc3VhbGl6YXRpb24uYXJyYXlUb0RhdGFUYWJsZShkcmF3dGFibGUpXG5cbiAgICAgICAgICAgIHZhciBtYXRlcmlhbE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgIHdpZHRoOiAxNTAwLFxuICAgICAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICAgICAgY2hhcnQ6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogZHJhd3RhYmxlWzBdWzBdLFxuICAgICAgICAgICAgICAgIHN1YnRpdGxlOiBkcmF3dGFibGVbMF1bMV0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGhBeGlzOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdUb3RhbCBQb3B1bGF0aW9uJyxcbiAgICAgICAgICAgICAgICBtaW5WYWx1ZTogMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdkF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0NpdHknLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBiYXJzOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICAgIGNvbG9yczogWycjNzY1MGY4J10sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWF0ZXJpYWxDaGFydCA9IG5ldyBnb29nbGUuY2hhcnRzLkJhcihcbiAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXJ0X2RpdicpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgbWF0ZXJpYWxDaGFydC5kcmF3KHRhYmxlLCBtYXRlcmlhbE9wdGlvbnMpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9KVxuICAgIGJyZWFrXG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0YWJsZSIsIiQiLCJEYXRhVGFibGUiLCJzUGFnaW5hdGlvblR5cGUiLCJsYW5ndWFnZSIsInBhZ2luYXRlIiwicHJldmlvdXMiLCJuZXh0Iiwic2VhcmNoIiwiemVyb1JlY29yZHMiLCJhamF4IiwicHJvdG9jb2wiLCJob3N0IiwiY29sdW1ucyIsImRhdGEiLCJiQXV0b1dpZHRoIiwia2V5dXAiLCJ2YWwiLCJkcmF3IiwiYnV0dG9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwidXJsIiwic3VjY2VzcyIsImRyYXd0YWJsZSIsImZvckVhY2giLCJlbGVtZW50IiwicHVzaCIsImdvb2dsZSIsImNoYXJ0cyIsImxvYWQiLCJwYWNrYWdlcyIsInNldE9uTG9hZENhbGxiYWNrIiwiZHJhd1RpdGxlU3VidGl0bGUiLCJ2aXN1YWxpemF0aW9uIiwiYXJyYXlUb0RhdGFUYWJsZSIsIm1hdGVyaWFsT3B0aW9ucyIsIndpZHRoIiwiaGVpZ2h0IiwiY2hhcnQiLCJ0aXRsZSIsInN1YnRpdGxlIiwiaEF4aXMiLCJtaW5WYWx1ZSIsInZBeGlzIiwiYmFycyIsImNvbG9ycyIsIm1hdGVyaWFsQ2hhcnQiLCJCYXIiLCJnZXRFbGVtZW50QnlJZCIsInR5cGUiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=