# Ink to Markdown - ink2md (Obsidian Plugin)

Convert handwritten notes and images into **clean Markdown** directly inside Obsidian using **Google Gemini OCR/HTR**. Tries to preserve structure and content.

The purpose of this plugin is to bridge the gap between handwritten and typed notes. If, like me, you prefer annotating the old-fashioned way, this plugin lets you bring those notes into Obsidian so you can keep everything in one place and take advantage of Obsidian’s usual features.

## Features

- OCR/HTR handwritten notes into Markdown  
- Works with images embedded in your vault (`![[note.png]]`)  
- Powered by Google Gemini for high-quality recognition  
- Output is inserted right below the image in your note  

## Installation

### From GitHub Release
1. Go to the [Releases](https://github.com/FerTia8/obsidian-ink2md/releases) page.
2. Download the latest release `.zip`.
3. Extract it into your vault’s `.obsidian/plugins/` folder.
4. Reload Obsidian and enable the plugin in **Settings → Community Plugins**.

### From Source
1. Clone or download this repo.
2. Run `npm install && npm run build`.
3. Copy the generated files (`main.js`, `manifest.json`) into your vault’s `.obsidian/plugins/` folder.
4. Reload Obsidian.

## Setup

This plugin currently supports **Google Gemini API** only. You’ll need an API key, which you can get from official sources. There's a free plan included, ence why it was chosen as the first supported LLM. Then, in Obsidian:

1. Open **Settings → ink2md**.  
2. Paste your API key into the field.  

## 🚀 Usage

- Right-click on an embedded image in your editor (`![[note.png]]`).  
- Select **“Convert Ink to Markdown”**.  
- Wait (few seconds usually).
- The recognized text will appear below the image.  

## Settings

- **Gemini API Key** → Required to use the plugin.  

## Development

If you want to hack on this plugin:

```sh
git clone https://github.com/FerTia8/obsidian-ink2md
cd obsidian-ink2md
npm install
npm run dev
```

Then reload Obsidian to test.  


## Acknowledgements

- [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin)  
- [Google Gemini](https://ai.google.dev) for OCR/HTR  
