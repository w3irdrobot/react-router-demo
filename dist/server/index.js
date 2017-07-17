'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _path = require('path');

var _connectHistoryApiFallback = require('connect-history-api-fallback');

var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);

var _webpack3 = require('../../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _users = require('../../users.json');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { NODE_ENV = 'development', PORT = 3000 } = process.env;

const app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

const apiRouter = _express2.default.Router();

apiRouter.route('/users').get((req, res) => {
  res.json({ users: _users2.default });
}).post((req, res) => {
  const { body } = req;
  const lastId = _users2.default[_users2.default.length - 1].id;
  const user = (0, _extends3.default)({}, body, { id: lastId + 1 });

  _users2.default.push(user);

  res.json(user);
});

apiRouter.route('/users/:id').get((req, res) => {
  const { id } = req.params;
  const user = _users2.default.find(u => u.id === id * 1);

  if (!user) return res.sendStatus(404);

  return res.json(user);
}).patch((req, res) => {
  const { body, params: { id } } = req;
  const userIndex = _users2.default.findIndex(u => u.id === id * 1);

  if (userIndex < 0) return res.sendStatus(404);

  const user = _users2.default[userIndex];

  _users2.default[userIndex] = (0, _extends3.default)({}, user, body);

  return res.json(_users2.default[userIndex]);
}).delete((req, res) => {
  const { id } = req.params;
  const userIndex = _users2.default.findIndex(u => u.id === id * 1);

  if (userIndex < 0) return res.sendStatus(404);

  const user = _users2.default[userIndex];

  _users2.default.splice(userIndex, 1);

  return res.json(user);
});

app.use('/api', apiRouter);
app.use((0, _connectHistoryApiFallback2.default)());

if (NODE_ENV === 'production') {
  const FE_DIR = (0, _path.resolve)(__dirname, '..', 'client');

  app.use(_express2.default.static(FE_DIR));

  app.get('/*', (req, res) => {
    res.sendFile((0, _path.resolve)(FE_DIR, 'index.html'));
  });
} else {
  const compiler = (0, _webpack2.default)(_webpack4.default);

  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    stats: { colors: true }
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
}

const server = _http2.default.createServer(app);

server.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});