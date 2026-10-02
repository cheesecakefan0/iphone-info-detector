# iPhone Diagnostics Prototype

This is a simple static HTML app that displays a polished mock diagnostic dashboard for an iPhone.

## What it does
- Shows a device card and status panel
- Displays simulated/visible diagnostics
- Pulls browser-level details like screen size, language, online status, and connection type
- Highlights the limitation: real iPhone hardware details require a native app or OS bridge

## Run it locally
Open `index.html` in a browser, or serve the folder with a tiny web server:

```bash
cd iphone-info-detector
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Important limitation
A browser page cannot read an actual iPhone's private hardware data such as:
- serial number
- IMEI
- exact battery health
- installed app inventory
- full filesystem
- secure device identifiers

Those require a native app or desktop integration with Apple device support and OS-level permissions.

## Files
- `index.html` — main page
- `styles.css` — dashboard styling
- `script.js` — data generation and UI rendering

