/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss'
import 'datatables.net'

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
            next: '<a  class="mailpreview" href="#">&raquo;</a>',
          },
          search: 'Recherche:',
          zeroRecords: 'Pas de résultats',
        },
        ajax: window.location.protocol + '//' + window.location.host + '/',
        columns: [
          { data: 'receiver' },
          { data: 'subject' },
          { data: 'content' },
          { data: 'date' },
          { data: 'status' },
        ],
        bAutoWidth: false,
      })
      $('#myInputTextField').keyup(function () {
        table.search($(this).val()).draw()
      })
      let button = document.querySelector('.paginate_button')
      button.classList.toggle('effect')
    })
    break
  case '/unseen':
    window.addEventListener('load', function () {
      var table = $('#datatable').DataTable({
        language: {
          paginate: {
            previous: '<a class="mailpreview" href="#">&laquo;</a>',
            next: '<a  class="mailpreview" href="#">&raquo;</a>',
          },
          search: 'Recherche:',
          zeroRecords: 'Pas de résultats',
        },
        ajax:
          window.location.protocol + '//' + window.location.host + '/unseen',
        columns: [
          { data: 'receiver' },
          { data: 'subject' },
          { data: 'content' },
          { data: 'date' },
          { data: 'status' },
        ],
        bAutoWidth: false,
      })
      $('#myInputTextField').keyup(function () {
        table.search($(this).val()).draw()
      })
    })
    break
  case '/seen':
    window.addEventListener('load', function () {
      var table = $('#datatable').DataTable({
        ajax: window.location.protocol + '//' + window.location.host + '/seen',
        language: {
          paginate: {
            previous: '<a class="mailpreview" href="#">&laquo;</a>',
            next: '<a  class="mailpreview" href="#">&raquo;</a>',
          },
          search: 'Recherche:',
          zeroRecords: 'Pas de résultats',
        },
        columns: [
          { data: 'receiver' },
          { data: 'subject' },
          { data: 'content' },
          { data: 'date' },
          { data: 'status' },
        ],
        bAutoWidth: false,
      })
      $('#myInputTextField').keyup(function () {
        table.search($(this).val()).draw()
      })
    })
    break
  case '/stat/hour':
    window.addEventListener('load', function () {
      $.ajax({
        url:
          window.location.protocol + '//' + window.location.host + '/stat/hour',
        success: function (data) {
          let drawtable = []
          data.data.forEach((element) => {
            drawtable.push(element)
          })
          google.charts.load('current', { packages: ['corechart', 'bar'] })
          google.charts.setOnLoadCallback(drawTitleSubtitle)
          function drawTitleSubtitle() {
            var table = google.visualization.arrayToDataTable(drawtable)

            var materialOptions = {
              width: 1500, //1100 for small screen
              height: 750, //300 for small screen
              chart: {
                title: 'Nombre des mail lu par heure',
                subtitle: 'Basé sur les mail envoyer',
              },

              hAxis: {
                title: 'Total Population',
                minValue: 0,
              },
              vAxis: {
                title: 'City',
              },
              bars: 'horizontal',
              colors: ['#7650f8'],
            }
            var materialChart = new google.charts.Bar(
              document.getElementById('chart_div'),
            )
            materialChart.draw(table, materialOptions)
          }
        },
      })
    })
    break
  case '/stat/person':
    document.getElementById('search').addEventListener('click', function () {
      $.ajax({
        type: 'POST',
        url:
          window.location.protocol +
          '//' +
          window.location.host +
          '/stat/person',
        data: document.getElementById('to').value,
        success: function (data) {
          let drawtable = []
          data.data.forEach((element) => {
            drawtable.push(element)
          })
          google.charts.load('current', { packages: ['corechart', 'bar'] })
          google.charts.setOnLoadCallback(drawTitleSubtitle)
          function drawTitleSubtitle() {
            var table = google.visualization.arrayToDataTable(drawtable)

            var materialOptions = {
              width: 1500, //900 for small screen
              height: 400, //300 for small screen
              chart: {
                title: drawtable[0][0],
                subtitle: drawtable[0][1],
              },
              hAxis: {
                title: 'Total Population',
                minValue: 0,
              },
              vAxis: {
                title: 'City',
              },
              bars: 'horizontal',
              colors: ['#7650f8'],
            }
            var materialChart = new google.charts.Bar(
              document.getElementById('chart_div'),
            )
            materialChart.draw(table, materialOptions)
          }
        },
      })
    })
    break
}
