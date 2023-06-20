# well-known

This is a repository for maintaining data about well known entities to the Vega community.

## Data stored here

- [Oracle providers](./oracle-providers/): details about public keys of known oracle providers
- [Compiled oracle provider data](./__generated__/oracle-proofs.json): The same details but validated and compiled into a single file so that apps can easily fetch the data and link back to it

## Disclaimer

This repository is for data regarding oracles used in markets on the Vega trading platform.

Anyone can contribute to it and no representations or warranties of any kind are made by any party about the accuracy of the information contained in it.


## Using this repository

TODO: rules for adding and changing data, reviewing PRs, etc.

### Generating oracle proof JSON

The [process-oracle-providers](./scripts/process-oracle-providers.js) script will run on every PR via a [github action](./.github/workflows/process-oracle-providers.yml) to ensure the format of the .toml file is correct and to compile all oracle providers into a single JSON file for easy consumption by other apps.

#### Running manually

Install [NodeJS](https://nodejs.org/en)

Install [Yarn](https://classic.yarnpkg.com/en/)

Install dependencies

```
yarn install
```

Run with

```
npm run process
```

## Tools and apps incorporating this data

### Console

The Console trading application uses the generated oracle json to provide links on market pages back to this repo. This allows users of Vega to independently verify data sources.
