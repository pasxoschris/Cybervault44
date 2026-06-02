import { useEffect } from 'react';

const BASE_URL = 'https://cybervault.gr';
const DEFAULT_IMAGE = 'https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/136eeae84_web-app-manifest-512x512.png';

/**
 * SeoHead — injects per-page SEO meta tags into <head> dynamically.
 * Props: title, description, path, ogType
 */
export default function SeoHead({ title, description, path = '/', ogType = 'website' }) {
  const fullUrl = `${BASE_URL}${path}`;

  useEffect(() => {
    // Title
    document.title = title;

    const setMeta = (selector, value) => {
      let el = document.querySelector(selector);
      if (el) el.setAttribute('content', value);
    };

    const setLink = (rel, value) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (el) el.setAttribute('href', value);
    };

    // Standard meta
    setMeta('meta[name="description"]', description);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', fullUrl);

    // OG
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', fullUrl);
    setMeta('meta[property="og:type"]', ogType);

    // Twitter
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
  }, [title, description, fullUrl, ogType]);

  return null;
}