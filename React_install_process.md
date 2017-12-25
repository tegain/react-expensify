# Install React


# Install Babel

```
# Optional
npm install -g babel-cli
```

```
yarn init

# used to compile JSX
yarn add babel-preset-react 
yarn add babel-preset-env
```

## Run babel directly in CLI (optional)

```
babel src/app.js --out-file=public/scripts/app.js --presets=env,react
```