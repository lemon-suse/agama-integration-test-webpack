import { type Page } from "puppeteer-core";

export class StorageResultPage {
  private readonly page: Page;

  private readonly destructiveActionsListWithSidebar = () => this.page.locator("::-p-aria(Check)");
  private readonly destructiveActionsList = () => this.page.locator("::-p-aria(Actions)");
  public readonly destructiveActionText = (name: string) =>
    this.page.locator(`::-p-aria(Delete ${name})`);

  constructor(page: Page) {
    this.page = page;
  }

  async scrollToDestructiveActionsList() {
    (await this.destructiveActionsList().waitHandle()).scrollIntoView();
  }

  async expandDestructiveActionsList() {
    await this.destructiveActionsListWithSidebar().click();
  }
}
