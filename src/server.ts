import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';

import * as express from 'express';
import * as path from 'path';
import { ServerAppModule } from './platform-modules/server.module';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { routes } from './server.routes';
import { enableProdMode } from '@angular/core';

enableProdMode();
const app = express();
const port = 3000;
const baseUrl = `http://localhost:${port}`;
const ROOT = path.join(path.resolve(__dirname, '..'));

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModule
}));

app.set('view engine', 'html');
app.set('views', 'src');

function cacheControl(req, res, next) {
  // instruct browser to revalidate in 60 seconds
  res.header('Cache-Control', 'max-age=60');
  next();
}
function ngApp(req, res) {
  function onHandleError(parentZoneDelegate, currentZone, targetZone, error)  {
    console.warn('Error in SSR, serving for direct CSR');
    res.sendFile('index.html', {root: './src'});
    return false;
  }
  
  Zone.current.fork({ name: 'CSR fallback', onHandleError }).run(() => {
    res.render('index', {
      req,
      res,
      time: true, // use this to determine what part of your app is slow only in development
      preboot: true,
      baseUrl: '/',
      requestUrl: req.originalUrl,
      originUrl: `http://localhost:${ app.get('port') }`
    });
  });
}

// Serve static files
app.use('/assets', cacheControl, express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(cacheControl, express.static(path.join(ROOT, 'dist/client'), {index: false}));

app.use('/', express.static('dist/client', {index: false}));


app.get('/', (req,res)=>{
  console.log(`GET: ${req.originalUrl}`);
  res.render('index', {
    req,
    res
  });
});

routes.forEach(route => {
  app.get(route, (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('index', {req});
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});

app.listen(3000,() => {
	console.log(`Listening at ${baseUrl}`);
});
