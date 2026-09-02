import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const main = await readFile(new URL('../firmware/main/app_main.c', import.meta.url), 'utf8');
const portal = await readFile(new URL('../firmware/components/dv_portal/dv_portal.c', import.meta.url), 'utf8');

test('Bambu phases reach the existing DragonVent lighting states', () => {
  assert.match(main, /DC_BAMBU_PRINT_PREPARING:\s+status = DV_PS_PREPARING/);
  assert.match(main, /DC_BAMBU_PRINT_PRINTING:\s+status = DV_PS_PRINTING/);
  assert.match(main, /DC_BAMBU_PRINT_PAUSED:\s+status = DV_PS_PAUSED/);
  assert.match(main, /DC_BAMBU_PRINT_COMPLETE:\s+status = DV_PS_COMPLETE/);
  assert.match(main, /DC_BAMBU_PRINT_ERROR:\s+status = DV_PS_ERROR/);
});

test('Bambu phases remain distinct in the existing state API', () => {
  assert.match(portal, /DC_BAMBU_PRINT_PAUSED:\s+return "paused"/);
  assert.match(portal, /DC_BAMBU_PRINT_COMPLETE:\s+return "complete"/);
  assert.match(portal, /printer_state = bambu_print_wire\(status\.print_state\)/);
});
