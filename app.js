const releaseStatus = document.querySelector('#release-status');
const releaseVersion = document.querySelector('#release-version');
const releaseMeta = document.querySelector('#release-meta');
const downloadLinks = document.querySelectorAll('[data-download]');
const checksumLinks = document.querySelectorAll('[data-checksum]');

fetch('https://api.github.com/repos/azeez-d3v/cgh-mobile-downloads/releases/latest', {
  headers: { Accept: 'application/vnd.github+json' },
})
  .then((response) => {
    if (!response.ok) throw new Error('Release details unavailable');
    return response.json();
  })
  .then((release) => {
    const apk = release.assets?.find((asset) => asset.name === 'CGH-Mobile.apk');
    const checksum = release.assets?.find(
      (asset) => asset.name === 'CGH-Mobile.apk.sha256',
    );
    const published = release.published_at
      ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
          new Date(release.published_at),
        )
      : undefined;

    const displayVersion = release.tag_name
      ? `Portal ${release.tag_name}`
      : 'Latest Portal release';
    releaseVersion.textContent = `${displayVersion} available`;
    releaseMeta.textContent =
      [apk ? formatBytes(apk.size) : undefined, published]
        .filter(Boolean)
        .join(' • ') || 'Android 8 or newer recommended';

    if (apk?.browser_download_url) {
      downloadLinks.forEach((link) => {
        link.setAttribute('href', apk.browser_download_url);
      });
    }

    const verificationUrl =
      checksum?.browser_download_url || release.html_url;
    if (verificationUrl) {
      checksumLinks.forEach((link) => {
        link.setAttribute('href', verificationUrl);
      });
    }
  })
  .catch(() => {
    releaseVersion.textContent = 'Latest APK remains available';
    releaseMeta.textContent = 'Release details could not be refreshed';
  })
  .finally(() => {
    releaseStatus?.setAttribute('aria-busy', 'false');
  });

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  return `${(bytes / 1024 ** index).toFixed(index > 1 ? 1 : 0)} ${units[index]}`;
}
