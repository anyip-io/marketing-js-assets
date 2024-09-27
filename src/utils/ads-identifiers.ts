interface AdIdentifiers {
  [key: string]: string;
}

function getParam(p: string): string | null {
  const match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search);
  return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : null;
}

function getDomain(): string {
  const domainParts = window.location.hostname.split('.');
  if (domainParts.length > 2) {
    // Return the top-level domain and the domain before it
    return domainParts.slice(-2).join('.');
  }
  return window.location.hostname;
}

function saveAdIdentifiersToCookie(identifiers: AdIdentifiers): void {
  const domain = getDomain();
  document.cookie = `anyip_identifiers=${JSON.stringify(
    identifiers
  )}; path=/; domain=.${domain}; max-age=${90 * 24 * 60 * 60}; SameSite=Strict`;
}

function getAdIdentifiersFromCookie(): AdIdentifiers | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'anyip_identifiers') {
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export default () => {
  const adParams = ['gclid', 'gbraid', 'wbraid', 'msclkid'];

  const identifiers = getAdIdentifiersFromCookie() || {};

  adParams.forEach((param) => {
    const value = getParam(param);
    if (value) {
      identifiers[param] = value;
    }
  });

  if (Object.keys(identifiers).length > 0) {
    saveAdIdentifiersToCookie(identifiers);
  }
};
