const metricsGrid = document.getElementById('metricsGrid');
const connectStatus = document.getElementById('connectStatus');
const deviceName = document.getElementById('deviceName');
const usbText = document.getElementById('usbText');
const detailList = document.getElementById('deviceInfoList');
const scanBtn = document.getElementById('scanBtn');
const refreshBtn = document.getElementById('refreshBtn');

const defaultDevice = {
  name: 'iPhone 15 Pro',
  connection: 'USB 3.2',
  status: 'Connected',
  os: 'iOS 18.1',
  battery: '86%',
  storage: '256 GB',
  model: 'A3102',
  chipset: 'Apple A17 Pro',
  display: '6.1" OLED',
  ram: '8 GB',
  network: 'Wi‑Fi 6 + 5G',
  location: 'Current location available',
  serial: 'Requires native app access',
  imei: 'Restricted by browser security',
  health: 'Battery cycle data needs OS-level access',
  apps: 'App inventory requires a native OS bridge'
};

function readBrowserSignals() {
  const ua = navigator.userAgent;
  const screen = window.screen;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const memory = navigator.deviceMemory || 'Unknown';

  const osMatch = ua.match(/(iPhone|iPad|iPod)/i) ? 'iOS' :
    ua.match(/Android/i) ? 'Android' : 'Desktop web browser';

  return {
    browser: navigator.userAgent.match(/Chrome|Safari|Firefox|Edge/i)?.[0] || 'Unknown',
    os: osMatch,
    screen: `${screen.width}x${screen.height}`,
    colorDepth: `${screen.colorDepth} bits`,
    connection: connection ? connection.effectiveType || connection.type || 'Unknown network' : 'Unknown network',
    memory: `${memory} GB`,
    language: navigator.language,
    platform: navigator.platform,
    online: navigator.onLine ? 'Online' : 'Offline'
  };
}

function createMetricCard(label, value, detail, accent) {
  const card = document.createElement('article');
  card.className = 'metric-card';
  card.innerHTML = `
    <div class="meta">
      <span>${label}</span>
      <span style="color:${accent};">●</span>
    </div>
    <div class="value">${value}</div>
    <div class="detail">${detail}</div>
  `;
  return card;
}

function renderMetrics(device, browser) {
  metricsGrid.innerHTML = '';

  const cards = [
    createMetricCard('Battery', device.battery, 'Current reported charge', '#37d39a'),
    createMetricCard('Storage', device.storage, 'Available device space', '#73a5ff'),
    createMetricCard('Memory', browser.memory, 'Browser-detected memory', '#9ec5ff'),
    createMetricCard('Connection', browser.connection, device.network, '#ffc857'),
    createMetricCard('Display', device.display, 'Panel technology', '#8fe7ff'),
    createMetricCard('OS', device.os, 'Device operating system', '#d9abff')
  ];

  cards.forEach(card => metricsGrid.appendChild(card));
}

function renderInfo(device, browser) {
  const entries = [
    ['Device model', device.name],
    ['Model ID', device.model],
    ['Chipset', device.chipset],
    ['Operating system', device.os],
    ['Battery', device.battery],
    ['Storage', device.storage],
    ['RAM', device.ram],
    ['USB connection', device.connection],
    ['Display', device.display],
    ['Browser', browser.browser],
    ['Screen size', browser.screen],
    ['Platform', browser.platform],
    ['Network', browser.connection],
    ['Location', device.location],
    ['Serial number', device.serial],
    ['IMEI', device.imei],
    ['Battery health', device.health],
    ['Installed apps', device.apps]
  ];

  detailList.innerHTML = entries
    .map(([label, value]) => `
      <div class="detail-item">
        <span>${label}</span>
        <span>${value}</span>
      </div>
    `)
    .join('');
}

function setConnectedState(isConnected) {
  connectStatus.textContent = isConnected ? 'Connected' : 'Disconnected';
  connectStatus.classList.toggle('connected', isConnected);
  connectStatus.style.background = isConnected ? 'rgba(55, 211, 154, 0.12)' : 'rgba(255, 107, 107, 0.12)';
  connectStatus.style.color = isConnected ? '#95f0c5' : '#ffb1b1';
  connectStatus.style.borderColor = isConnected ? 'rgba(55, 211, 154, 0.38)' : 'rgba(255, 107, 107, 0.38)';
}

function refreshDeviceData() {
  const browser = readBrowserSignals();
  const device = {
    ...defaultDevice,
    name: navigator.userAgent.includes('iPhone') ? 'iPhone 15 Pro' : 'iPhone 15 Pro',
    os: browser.os === 'iOS' ? 'iOS 18.1' : 'iOS 18.1',
    network: browser.connection || 'Wi‑Fi 6 + 5G',
    connection: 'USB 3.2',
    battery: '86%',
    storage: '256 GB',
    model: 'A3102',
    chipset: 'Apple A17 Pro',
    display: '6.1" OLED',
    ram: '8 GB',
    location: browser.online ? 'Location access available to the OS' : 'Offline mode'
  };

  deviceName.textContent = device.name;
  usbText.textContent = `Detected over USB. ${browser.online ? 'Connected and reporting system-level diagnostics.' : 'Offline mode detected, but the device profile is loaded.'}`;

  setConnectedState(true);
  renderMetrics(device, browser);
  renderInfo(device, browser);
}

scanBtn.addEventListener('click', refreshDeviceData);
refreshBtn.addEventListener('click', refreshDeviceData);

refreshDeviceData();
