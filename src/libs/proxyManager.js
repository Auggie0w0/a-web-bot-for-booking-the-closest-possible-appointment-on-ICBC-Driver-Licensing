/**
 * Proxy Manager for ICBC Appointment Bot
 * 
 * This file provides functionality for managing proxies to avoid IP rate limiting.
 * Currently set up as a placeholder for future implementation if needed.
 */

import { logWithTimestamp } from '../helpers.js';

class ProxyManager {
  constructor() {
    this.proxies = [];
    this.currentProxyIndex = -1;
    this.enabled = false;
  }

  /**
   * Add a proxy to the list
   * @param {string} host - Proxy host
   * @param {number} port - Proxy port
   * @param {string} username - Proxy username (optional)
   * @param {string} password - Proxy password (optional)
   */
  addProxy(host, port, username = null, password = null) {
    this.proxies.push({ host, port, username, password });
    logWithTimestamp(`Added proxy: ${host}:${port}`);
  }

  /**
   * Enable proxy rotation
   */
  enable() {
    if (this.proxies.length === 0) {
      logWithTimestamp('No proxies available. Proxy rotation remains disabled.');
      return false;
    }
    this.enabled = true;
    logWithTimestamp('Proxy rotation enabled.');
    return true;
  }

  /**
   * Disable proxy rotation
   */
  disable() {
    this.enabled = false;
    logWithTimestamp('Proxy rotation disabled.');
  }

  /**
   * Get the next proxy in rotation
   * @returns {Object|null} Proxy configuration or null if disabled
   */
  getNextProxy() {
    if (!this.enabled || this.proxies.length === 0) {
      return null;
    }

    this.currentProxyIndex = (this.currentProxyIndex + 1) % this.proxies.length;
    const proxy = this.proxies[this.currentProxyIndex];
    logWithTimestamp(`Switching to proxy: ${proxy.host}:${proxy.port}`);
    return proxy;
  }

  /**
   * Get puppeteer arguments for the current proxy
   * @returns {Array} Array of arguments for puppeteer
   */
  getPuppeteerArgs() {
    if (!this.enabled || this.proxies.length === 0) {
      return [];
    }

    const proxy = this.proxies[this.currentProxyIndex];
    if (!proxy) return [];

    const proxyArg = `--proxy-server=${proxy.host}:${proxy.port}`;
    return [proxyArg];
  }
}

export default ProxyManager; 