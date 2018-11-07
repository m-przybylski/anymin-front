# Profitelo Frontend

## Requirements
*   `npm` (best install via [nvm][github-nvm])
*   `nginx`

## Installation
- Download repository and inside:
- 
> If you setup frontend localy with local domains, **DO NOT FORGET** to change
> `profitelo.urls.frontend` into `config.json` to those set into your server config,
> to avoid domains mismatch errors.

```bash
# node --version: min 4 or greater
npm install
npm run start
```

- testing:
```bash
npm run test
```

- create component
```bash
npm run component [name]
```

- generate new api client
```
brew install swagger-codegen
cd src/common/api
swagger-codegen generate -i http://api.dev.profitelo.pl/swagger/swagger.json -l typescript-angular -t typescript-angular
```

### To test Push notifications locally:
- Use ssl `npm run serve-ssl`
- Run chrome in trusted mode:
```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=/tmp/foo --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://localhost:4200
```
- You need to change OneSignal stage configuration to use localhost:4200 and run `ng serve` with `--ssl` flag
