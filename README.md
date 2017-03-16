# Profitelo Frontend

## Requirements
*   `npm` (best install via [nvm][github-nvm])
*   `nginx`

## Installation
Download repository and inside:

> If you setup frontend localy with local domains, **DO NOT FORGET** to change
> `profitelo.urls.frontend` into `config.json` to those set into your server config,
> to avoid domains mismatch errors.

```bash
# node --version: min 4 or greater
npm install
git submodule init
git submodule update
npm run tr
npm run cc
npm run serve
```

testing:
```bash
npm run test
```

create component
```bash
npm run component [name]
```

download translations from tr
```
npm run tr
```

generate common config
```
npm run cc
```

generate new api client
```
brew install swagger-codegen
cd src/common/api
swagger-codegen generate -i http://api.dev.profitelo.pl/swagger/swagger.json -l typescript-angular -t typescript-angular
```
