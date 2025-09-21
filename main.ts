import { Plugin, Menu, Editor, MarkdownView, parseLinktext, TFile, Notice, App, Setting, PluginSettingTab } from 'obsidian';
import { HTR } from 'utils/HTR';
import { trimBrackets } from 'utils/utils';

interface InkToMarkdownSettings {
	apiKey: string;
}

export default class InkToMarkdownPlugin extends Plugin {
  settings: InkToMarkdownSettings;
  htr = new HTR();

  async onload() {
    await this.loadSettings();

    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu: Menu, editor: Editor, info: MarkdownView) => {
        const selected : string = editor.getSelection();
        menu.addItem((item) => {
          item
            .setTitle("Convert Ink to Markdown")
            .setDisabled(!selected)
            .setIcon("wand")
            .onClick(async () => {
              const selectedPath : string = parseLinktext(trimBrackets(selected)).path;
              const selectedFile = this.app.vault.getAbstractFileByPath(selectedPath);

              if (selectedFile instanceof TFile) {
                new Notice("Starting OCR operation!");

                const bytesImg : ArrayBuffer = await this.app.vault.readBinary(selectedFile);
                const base64Img : string = Buffer.from(bytesImg).toString('base64');
                const apiKey : string = this.settings.apiKey;

                if (!apiKey) {
                  new Notice("Please set your Gemini API key in plugin settings.");
                  return;
                }
                let markdown = "";
                try {
                  markdown = await this.htr.useGemini(base64Img, apiKey);
                } catch(err) {
                    console.error(err);
                    new Notice("Gemini OCR failed, check console for details.");
                }
                new Notice("Completed OCR operation!");

                editor.replaceRange(`\n\n${markdown}\n`, { line: editor.getCursor().line + 1, ch: 0 });
              } else {
                new Notice("File not found!")
              }
            })
          })
      })
    );

    this.addSettingTab(new SettingTab(this.app, this));
    
    // Configure resources needed by the plugin.
  }
  async onunload() {
    // Release any resources configured by the plugin.
  }

  async loadSettings() {
		this.settings = Object.assign({ apiKey: "" }, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SettingTab extends PluginSettingTab {
  plugin: InkToMarkdownPlugin;

  constructor(app: App, plugin: InkToMarkdownPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const {containerEl} = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Gemini API Key')
      .setDesc('For OCR/HTR recognition')
      .addText(text => text
        .setValue(this.plugin.settings.apiKey)
        .onChange(async (value) => {
          this.plugin.settings.apiKey = value;
          await this.plugin.saveSettings();
        }));
  }
}
