import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import webpackConfig from '../webpack.config';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { resolve } from 'path';
import users from '../users.json';

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

    if (user) return res.sendStatus(404);

    res.json(user);
  })
  .patch((req, res) => {
    const { body, params: { id } } = req;
    const userIndex = users.findIndex(u => u.id === id * 1);

    if (userIndex < 0) return res.sendStatus(404);

    const user = users[userIndex];

    users[userIndex] = { ...user, ...body };

    res.json(users[userIndex]);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id * 1);

    if (userIndex < 0) return res.sendStatus(404);

    const user = users[userIndex];

    users.splice(userIndex, 1);

    res.json(user);
  });

app.use('/api', apiRouter);

if (NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, { stats: { colors: true } }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(resolve(__dirname, 'client')));

  app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'index.html'));
  });
}

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`The server is running at localhost:${PORT}`);
});
