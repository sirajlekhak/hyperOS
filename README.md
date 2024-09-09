# Custom ROM Build - HyperOS

This repository hosts the details and resources for custom/ported ROMs available for various Android devices. It includes download links, changelogs, and installation instructions for each supported device.

## Table of Contents
- [Supported Devices](#supported-devices)
- [How to Contribute](#how-to-contribute)
- [Changelog](#changelog)
- [Installation Instructions](#installation-instructions)
- [Contact & Support](#contact--support)
- [Support Us](#support-us)

## Supported Devices

Below are the currently supported devices along with their respective codenames:

| Device Name         | Codename  | Maintainer        | ROM Version | Status   |
|---------------------|-----------|-------------------|-------------|----------|
| POCO M2 Pro / Redmi Note 9S / Redmi Note 9 Pro / Redmi Note 9 Pro Max / Redmi Note 10 Lite       | mi_10     | Alice Johnson     | 2.1.0       | Active   |
<!-- Add more devices as needed -->

For each device, download links, changelogs, and installation instructions are provided.

## How to Contribute

If you're a developer or a maintainer and want to contribute a custom or ported ROM for a new device, please follow the format below and provide all the necessary files.

### ROM Data Format
Ensure you follow the structure below when submitting details for a new ROM:

```json
{
  "name": "Device Name",
  "codename": "device_codename",
  "brand": "Device Brand",
  "maintainer": "Your Name",
  "recoveryDownload": "/downloads/device_codename_recovery.zip",
  "romDownload": "/downloads/device_codename_rom.zip",
  "previousRomDownload": "/downloads/device_codename_previous_rom.zip",
  "status": "active",
  "version": "ROM version number",
  "release": "Release schedule (e.g., monthly)",
  "latestBuild": "/downloads/device_codename_latest_rom.zip",
  "telegramLink": "https://t.me/device_codename",
  "githubLink": "https://github.com/your_repo",
  "sourceChangelogs": "/phones/device_codename/sourcechangelogs.txt",
  "changelogs": "/phones/device_codename/changelogs.txt",
  "installationInstructions": "/phones/device_codename/installation_instructions.txt"
}
```

Make sure to provide the following **text files**:
- **`sourceChangelogs.txt`**: A detailed source changelog.
- **`changelogs.txt`**: A general changelog for the ROM.
- **`installation_instructions.txt`**: Installation steps for the ROM.

## Changelog

For a complete list of changes made to each ROM, please refer to the `changelogs.txt` provided for each device.

- **[Xiaomi Mi 10 Changelog](./phones/xiaomi_mi_10/changelogs.txt)**
<!-- Add more device-specific changelog links here -->

## Installation Instructions

To install the ROM on your device, follow the steps provided in the `installation_instructions.txt` for your device.

- **[Xiaomi Mi 10 Installation Instructions](./phones/xiaomi_mi_10/installation_instructions.txt)**
<!-- Add more device-specific instruction links here -->

## Contact & Support

For queries, support, or to discuss development, join the official Telegram groups or visit the GitHub repository for each device:

- **[Xiaomi Mi 10 Telegram Group](https://t.me/xiaomi_mi_10)**  
- **[Xiaomi Mi 10 GitHub Repository](https://github.com/xiaomi/mi_10)**

## Support Us

If you'd like to support our work, you can donate via UPI.

<a href="upi://pay?pa=YOUR_UPI_ID&pn=YOUR_NAME" class="support-button">Donate via UPI</a>

---

### License
This project is licensed under the MIT License.

---
