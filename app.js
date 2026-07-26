const releaseVersion = document.querySelector('#release-version');
const releaseMeta = document.querySelector('#release-meta');
const downloadLinks = document.querySelectorAll('[data-download]');

fetch('https://api.github.com/repos/azeez-d3v/cgh-mobile-downloads/releases/latest', {
  headers: { Accept: 'application/vnd.github+json' },
})
  .then((response) => {
    if (!response.ok) throw new Error('No public release yet');
    return response.json();
  })
  .then((release) => {
    const apk = release.assets?.find((asset) => asset.name === 'CGH-Mobile.apk');
    const published = release.published_at
      ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(release.published_at))
      : undefined;

    releaseVersion.textContent = `${release.name || release.tag_name} available`;
    releaseMeta.textContent = [apk ? formatBytes(apk.size) : undefined, published].filter(Boolean).join(' • ');
    if (apk?.browser_download_url) {
      downloadLinks.forEach((link) => link.setAttribute('href', apk.browser_download_url));
    }
  })
  .catch(() => {
    releaseVersion.textContent = 'First public APK coming soon';
    releaseMeta.textContent = 'Android 8 or newer recommended';
  });

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index > 1 ? 1 : 0)} ${units[index]}`;
}
