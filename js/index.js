var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Headline = function (_React$Component) {
  _inherits(Headline, _React$Component);

  function Headline() {
    _classCallCheck(this, Headline);

    return _possibleConstructorReturn(this, (Headline.__proto__ || Object.getPrototypeOf(Headline)).apply(this, arguments));
  }

  _createClass(Headline, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'jumbotron text-center' },
        React.createElement(
          'h1',
          { className: 'display-3', id: 'headline-box' },
          'Weather App'
        ),
        React.createElement('h5', { className: '', id: 'weather' })
      );
    }
  }]);

  return Headline;
}(React.Component);

var Buttons = function (_React$Component2) {
  _inherits(Buttons, _React$Component2);

  function Buttons() {
    _classCallCheck(this, Buttons);

    return _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).apply(this, arguments));
  }

  _createClass(Buttons, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'row text-center' },
        React.createElement(
          'button',
          { className: 'col-sm-4 btn btn-outline-info geo' },
          'Change To Fahrenheit'
        ),
        React.createElement(
          'button',
          { className: 'col-sm-4 btn btn-outline-primary geo' },
          'Use Your Location'
        ),
        React.createElement(
          'button',
          { className: 'col-sm-4 btn btn-outline-info altUnits' },
          'Change To Celsius'
        )
      );
    }
  }]);

  return Buttons;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(Headline, null),
        React.createElement(Buttons, null)
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));

// if ('geolocation' in navigator) {
//   $('.geo').show();
// } else {
//   $('.geo').hide();
// }

// $('.geo').on('click', function() {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     getWeather(position.coords.latitude+','+position.coords.longitude, '', 'f');
//   });
// });

// $('.altUnits').on('click', function() {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     getWeather(position.coords.latitude+','+position.coords.longitude, '', 'c');
//   });
// });


$(document).ready(function () {

  if ('geolocation' in navigator) {
    $('.geo').show();
  } else {
    $('.geo').hide();
  }

  $('.geo').on('click', function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      getWeather(position.coords.latitude + ',' + position.coords.longitude, '', 'f');
    });
  });

  $('.altUnits').on('click', function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      getWeather(position.coords.latitude + ',' + position.coords.longitude, '', 'c');
    });
  });

  //  getWeather('Colton', '', 'f'); //Get the initial weather for testing.
  setInterval(getWeather, 600000); //Update the weather every 10 minutes.
});

function getWeather(location, woeid, units) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: units,
    success: function success(weather) {
      html = '<p>' + '<img src="' + weather.thumbnail + '">' + weather.temp + '&deg;' + weather.units.temp + '</p>';
      html += '<p>' + weather.city + ', ' + weather.region + '</p>';
      html += '<p>' + weather.currently + '</p>';
      html += '<p>' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed + '</p>';

      $("#weather").html(html);
    },
    error: function error(_error) {
      $("#weather").html('<p>' + _error + '</p>');
    }
  });
}