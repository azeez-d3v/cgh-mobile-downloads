# Portal downloads

This repository hosts the public download page, Android APK releases, checksums, and signed over-the-air update files for [Portal](https://github.com/azeez-d3v/cgh-mobile).

Portal is an unofficial, independent, read-only Android companion for selected CGH SchoolAutomate student records. It is not affiliated with, operated by, or endorsed by CGH or SchoolAutomate.

## Public links

- Website: <https://azeez-d3v.github.io/cgh-mobile-downloads/>
- Application source: <https://github.com/azeez-d3v/cgh-mobile>
- APK releases: <https://github.com/azeez-d3v/cgh-mobile-downloads/releases>
- Latest APK: <https://github.com/azeez-d3v/cgh-mobile-downloads/releases/latest/download/CGH-Mobile.apk>
- Data handling: <https://github.com/azeez-d3v/cgh-mobile/blob/development/docs/DATA_HANDLING.md>
- Security policy: <https://github.com/azeez-d3v/cgh-mobile/blob/development/SECURITY.md>

## Repository purpose

Application code and development documentation live in the public [`cgh-mobile`](https://github.com/azeez-d3v/cgh-mobile) repository. This repository is limited to:

- the static GitHub Pages website;
- signed production APKs and their SHA-256 checksums;
- immutable signed Android OTA bundles; and
- version-scoped development and production update pointers.

Release workflows in the application repository publish artifacts here. Android signing keys and OTA private signing keys are not stored in either public repository.

## Website development

The site uses plain HTML, CSS, and JavaScript. It has no build step and no analytics.

Serve the directory with any static web server:

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

## License

The static website source is available under the [MIT License](LICENSE). Application source has its own MIT license in the application repository.
