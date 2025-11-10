import { it, page, sleep, waitOnFile } from "../lib/helpers";
import fs from "fs";
import assert from "node:assert/strict";
import { OptionsTogglePage } from "../pages/options_toggle_page";

const filePath = "/root/Downloads/agama-logs.tar.gz";

export async function downloadLogs() {
  it(`should download logs`, async function () {
    await new OptionsTogglePage(page).downloadLogs();
    await waitOnFile(filePath);

    await sleep(10000);
    const fileSize = fs.statSync(filePath).size;
    assert(fileSize > 0, "Agama Logfile is empty.");
  });
}
