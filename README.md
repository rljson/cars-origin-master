<!--
@license
Copyright (c) rljson

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# @rljson/cars-origin-master

English | [Deutsch](README.de.md)

[![CI](https://github.com/rljson/cars-origin-master/actions/workflows/quick_check.yaml/badge.svg)](https://github.com/rljson/cars-origin-master/actions/workflows/quick_check.yaml)

Master of the origin side of the cars example app, where catalogs are captured originally.

## Motivation

- The origin side of the cars example app runs its own master, where catalogs are captured originally
- Later it holds all data of its side on `@rljson/server`; for now it
  answers the hello world: `GET /`, `GET /api/hello` and `GET /health`
- It runs as a container in the stages `dev`, `test` and `prod`, also
  behind a proxy that serves it under a path and strips that prefix

## Installation

The package is private and not published to npm. Depend on a tagged
version of its git repository:

```bash
pnpm add git+ssh://git@github.com/rljson/cars-origin-master.git#semver:^0.0.1
```

## Usage

Start the server:

```ts
import { start } from '@rljson/cars-origin-master';

await start({ PORT: '3000' });
```

`GET /` then answers `Hello from cars-origin-master`.

### Container

Build the image in the registry `crcars`, tagged with the version:

```bash
az acr build --registry crcars --image cars-origin-master:<version> .
```

## Limitations

- Holds no data yet, only the greeting

## Documentation

- The guides in [doc/guides](doc/guides)

## Status

Before 1.0 — the API may change between minor versions.

## Contributing

See [doc/guides/develop-guide.md](doc/guides/develop-guide.md).

## License

MIT — see [LICENSE](LICENSE).
