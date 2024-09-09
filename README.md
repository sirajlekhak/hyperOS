# Custom ROM Build - HyperOS

This repository hosts the details and resources for custom/ported ROMs available for various Android devices. It includes download links, changelogs, and installation instructions for each supported device.

## Table of Contents
- [How to Contribute](#how-to-contribute)
- [Contact & Support](#contact--support)
- [Support Us](#support-us)

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
  "recoveryDownload": "link to recovery",
  "romDownload": "link to your custom rom",
  "previousRomDownload": "link to your archive or previous version download",
  "status": "active",
  "version": "ROM version number",
  "release": "Release schedule (e.g., monthly, weekly)",
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

## Contact & Support

For queries, support, or to discuss development, join the official Telegram groups or Dm me:

- **[Rohan's Discussion](https://t.me/Rohanupdates)**
- **[MsN's ChatHub | Miatoll](https://t.me/PortRomsbyMsn)** 
- **[Siraj Alam](https://t.me/sirajlekhak)** 

## Support Us

If you'd like to support our work, you can donate via UPI.

<a href="upi://pay?pa=YOUR_UPI_ID&pn=YOUR_NAME" class="support-button">Donate via UPI</a>

---

### License
This project is licensed under the MIT License.

---
