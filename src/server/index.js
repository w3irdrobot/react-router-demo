import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { resolve } from 'path';
import historyFallback from 'connect-history-api-fallback';
import webpackConfig from '../../webpack.config';
import users from '../../users.json';

const { NODE_ENV = 'development', PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiRouter = express.Router();

apiRouter.route('/users')
  .get((req, res) => {
    res.json({ users });
  })
  .post((req, res) => {
    const { body } = req;
    const lastId = users[users.length - 1].id;
    const user = { ...body, id: lastId + 1 };

    users.push(user);

    res.json(user);
  });

apiRouter.route('/users/:id')
  .get((req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id * 1);

    if (!user) return res.sendStatus(404);

    return res.json(user);
  })
  .patch((req, res) => {
    const { body, params: { id } } = req;
    const userIndex = users.findIndex(u => u.id === id * 1);

    if (userIndex < 0) return res.sendStatus(404);

    const user = users[userIndex];

    users[userIndex] = { ...user, ...body };

    return res.json(users[userIndex]);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id * 1);

    if (userIndex < 0) return res.sendStatus(404);

    const user = users[userIndex];

    users.splice(userIndex, 1);

    return res.json(user);
  });

app.use('/api', apiRouter);
app.use(historyFallback());

if (NODE_ENV === 'production') {
  const FE_DIR = resolve(__dirname, '..', 'client');

  app.use(express.static(FE_DIR));

  app.get('/*', (req, res) => {
    res.sendFile(resolve(FE_DIR, 'index.html'));
  });
} else {
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    stats: { colors: true },
  }));
  app.use(webpackHotMiddleware(compiler));
}

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
