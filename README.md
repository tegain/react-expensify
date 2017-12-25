# React Expensify

## Dev
```
# Start dev server
yarn run dev-server
```

Webpack will compile all JS into `public/bundle.js`, and CSS into `public/styles.css`.
SourceMaps are allowed (see `webpack.config.js` file)



## Tests
Using Jest and Enzyme



```
# Run tests
# Will search for jest.config.json file as defined in the NPM command
yarn test
```
```
#Run tests with watcher
yarn test --watch
```

Basic jest.config.json file
```json
{
  "setupFiles": [
    // Using polyfill for RequestAnimationFrame
    "raf/polyfill",
    // Enzyme config file
    "<rootDir>/src/tests/setupTests.js"
  ],
  "snapshotSerializers": [
    // Used to test snapshots
    "enzyme-to-json/serializer"
  ]
}
```

## Deployment

Using Heroku CLI

See server config in `server/server.js` file.

When typing the `git push heroku master` command, Heroku will run the `start` NPM script (which starts the Node.JS server).
Heroku will then run Webpack (the production build) using the `heroku-postbuild` NPM script defined in package.json (which runs itself the `yarn run build:prod` script)

```
#Login
heroku login
```
```
# Create new app
heroku create <app_name>
```
```
# Push to git
git push
```
```
# Push to heroku
git push heroku master
```
```
# Open app
heroku open
```
```
# View server logs
heroku logs
```


