# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.6.1](https://github.com/BlackGlory/estore-js/compare/v0.6.0...v0.6.1) (2025-07-22)


### Features

* make the timeout apply to connect and reconnect ([9b2791c](https://github.com/BlackGlory/estore-js/commit/9b2791c27491ced93021df248eaa1578a57be6d7))

## [0.6.0](https://github.com/BlackGlory/estore-js/compare/v0.5.3...v0.6.0) (2025-05-29)


### ⚠ BREAKING CHANGES

* Replaced `timeout: number` with `signal: AbortSignal`
* Node.js v16 => Node.js v22

### Features

* replace `timeout: number` with `signal: AbortSignal` ([15689b5](https://github.com/BlackGlory/estore-js/commit/15689b5b10d21f0c7e73d9ca6268e1b70d912b9c))


* upgrade dependencies ([1ba3f00](https://github.com/BlackGlory/estore-js/commit/1ba3f00f439b4a7a9b45708a67332d59b538ddaa))

### [0.5.3](https://github.com/BlackGlory/estore-js/compare/v0.5.2...v0.5.3) (2023-06-10)


### Bug Fixes

* export src ([2e46ca5](https://github.com/BlackGlory/estore-js/commit/2e46ca59a810ec45162d0159792fb72f89b0da78))

### [0.5.2](https://github.com/BlackGlory/estore-js/compare/v0.5.1...v0.5.2) (2023-03-28)


### Bug Fixes

* browser version ([29cf6a1](https://github.com/BlackGlory/estore-js/commit/29cf6a1b1274758faaa89087984ae00d5181f710))

### [0.5.1](https://github.com/BlackGlory/estore-js/compare/v0.5.0...v0.5.1) (2023-03-28)


### Bug Fixes

* timeout, retryIntervalForReconnection ([473d61b](https://github.com/BlackGlory/estore-js/commit/473d61bc44f8ae60c8b7a723adf4a72386d95618))

## [0.5.0](https://github.com/BlackGlory/estore-js/compare/v0.4.1...v0.5.0) (2023-03-28)


### ⚠ BREAKING CHANGES

* It requires EStore@^0.4.0

### Features

* upgrade to EStore@^0.4.0 ([b9c46a0](https://github.com/BlackGlory/estore-js/commit/b9c46a0d0fe13ba78009fc63f066ca205a1d1db1))

### [0.4.1](https://github.com/BlackGlory/estore-js/compare/v0.4.0...v0.4.1) (2023-03-11)


### Features

* export EventIndexConflict ([4043a17](https://github.com/BlackGlory/estore-js/commit/4043a175ec7104783a11e80f46e75b9497d7b104))

## [0.4.0](https://github.com/BlackGlory/estore-js/compare/v0.3.0...v0.4.0) (2023-02-05)


### ⚠ BREAKING CHANGES

* It requires EStore^0.3.0

### Features

* upgrade to EStore^0.3.0 ([e64a787](https://github.com/BlackGlory/estore-js/commit/e64a7876fe2dc5c145d4541e27d2fddbd44faf1e))

## [0.3.0](https://github.com/BlackGlory/estore-js/compare/v0.2.4...v0.3.0) (2023-01-29)


### ⚠ BREAKING CHANGES

* - CommonJS => ESM.
- The minimal version of Node.js is 16.
- It requires EStore^0.2.0.
* It requires EStore 0.2.0

### Features

* upgrade ([a4a60de](https://github.com/BlackGlory/estore-js/commit/a4a60debfb2a4ea6478c7fd3c53c16a74e4c4044))
* upgrade ([a567893](https://github.com/BlackGlory/estore-js/commit/a5678933001a40872b7d32cc448461dc94c8ab45))

### [0.2.4](https://github.com/BlackGlory/estore-js/compare/v0.2.3...v0.2.4) (2022-10-31)

### [0.2.3](https://github.com/BlackGlory/estore-js/compare/v0.2.2...v0.2.3) (2022-10-23)


### Bug Fixes

* replace `pathname` with `appendPathname` ([7eb9bab](https://github.com/BlackGlory/estore-js/commit/7eb9bab15c86baeb7439e268df4bb324d2fdcb03))

### [0.2.2](https://github.com/BlackGlory/estore-js/compare/v0.2.1...v0.2.2) (2022-10-21)

### [0.2.1](https://github.com/BlackGlory/estore-js/compare/v0.2.0...v0.2.1) (2022-10-21)

## [0.2.0](https://github.com/BlackGlory/estore-js/compare/v0.1.7...v0.2.0) (2022-10-21)


### ⚠ BREAKING CHANGES

* Removed `HTTPStatus`, `AbortError`

* replace `HTTPStatus`, `AbortError` with peer dependencies ([c828cab](https://github.com/BlackGlory/estore-js/commit/c828cab9d17a97b9afe69e366664b7f1fb291151))

### [0.1.7](https://github.com/BlackGlory/estore-js/compare/v0.1.6...v0.1.7) (2022-10-21)

### [0.1.6](https://github.com/BlackGlory/estore-js/compare/v0.1.5...v0.1.6) (2022-10-21)

### [0.1.5](https://github.com/BlackGlory/estore-js/compare/v0.1.4...v0.1.5) (2022-10-20)


### Bug Fixes

* export all http statuses ([b727851](https://github.com/BlackGlory/estore-js/commit/b727851f29962c6627d68432d3c23a9f723bb172))

### [0.1.4](https://github.com/BlackGlory/estore-js/compare/v0.1.3...v0.1.4) (2022-09-30)


### Bug Fixes

* keepalive ([25a0864](https://github.com/BlackGlory/estore-js/commit/25a0864c1e2a5feb403d12561ff5591962a8abc4))

### [0.1.3](https://github.com/BlackGlory/estore-js/compare/v0.1.2...v0.1.3) (2022-09-30)

### [0.1.2](https://github.com/BlackGlory/estore-js/compare/v0.1.1...v0.1.2) (2022-08-01)

### [0.1.1](https://github.com/BlackGlory/estore-js/compare/v0.1.0...v0.1.1) (2022-02-10)


### Features

* add Accept-Version to EStoreClient ([192397b](https://github.com/BlackGlory/estore-js/commit/192397bf809a0ebfca8e046ab9abad5d40ce970d))

## 0.1.0 (2022-02-06)


### Features

* init ([7f99ece](https://github.com/BlackGlory/estore-js/commit/7f99ece1cc72666b3d126d972a072a7ed03f027b))
