# actions-setup-keychain

<p align="left">
  <a href="https://github.com/sinoru/actions-setup-keychain"><img alt="GitHub Actions status" src="https://github.com/sinoru/actions-setup-keychain/workflows/Main%20workflow/badge.svg"></a>
</p>

This action sets up a new macOS keychain solve multiple problems.

# Usage

See [action.yml](action.yml)

Basic:
```yaml
steps:
- uses: actions/checkout@master
- uses: sinoru/actions-setup-keychain@v1.0
- run: fastlane match
```

# License

The scripts and documentation in this project are released under the [Apache License](LICENSE)

# Contributions

Contributions are welcome!  See [Contributor's Guide](docs/contributors.md)
