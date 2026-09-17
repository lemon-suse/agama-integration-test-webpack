import { type Page } from "puppeteer-core";

export class ConfigureLvmVolumeGroupPage {
  private readonly page: Page;
  private readonly acceptButton = () => this.page.locator("::-p-aria(Accept[role='button'])");
  constructor(page: Page) {
    this.page = page;
  }

  get diskCheckboxSelector(): string {
    return '::-p-aria([role="checkbox"])';
  }

  async accept() {
    await this.acceptButton().click();
  }
}
