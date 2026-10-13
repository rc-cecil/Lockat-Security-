import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage();
await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
for(const theme of ['light','dark']){
  await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
  for(const width of [320,375,768,1366,1920]){
    await page.setViewportSize({width,height:900});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${theme} overflow ${width}`);
  }
}
await page.setViewportSize({width:375,height:812});
await page.getByLabel('Full name',{exact:true}).fill('Ama & Kojo');
assert.equal(await page.locator('.mobile-conversion').evaluate(e=>getComputedStyle(e).display),'none');
await page.getByLabel('Contact number',{exact:true}).fill('0246064413');
await page.getByLabel('Property type',{exact:true}).selectOption({label:'Homes & Apartments'});
await page.getByLabel('Project location',{exact:true}).fill('Adenta');
await page.getByLabel('I agree to LOCKAT contacting me about this enquiry.').check();
await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{throw Error('Denied')}}}));
await page.getByRole('button',{name:'Copy enquiry'}).click();
await page.getByText('Copy is unavailable. Select and copy the prepared enquiry below.').waitFor();
await page.getByText('View prepared enquiry',{exact:true}).click();
assert((await page.getByLabel('Prepared enquiry').inputValue()).includes('Ama & Kojo'));
await page.getByRole('button',{name:'Learn more about CCTV Surveillance Systems'}).click();
await page.keyboard.press('Tab');
assert(await page.evaluate(()=>!!document.activeElement.closest('dialog')));
await page.keyboard.press('Escape');
assert.equal(await page.getByRole('button',{name:'Learn more about CCTV Surveillance Systems'}).evaluate(e=>e===document.activeElement),true);
await page.evaluate(()=>window.dispatchEvent(new Event('lockat-webgl-failed')));
await page.locator('.scene-fallback').waitFor();
await page.getByRole('button',{name:'Access control',exact:true}).click();
await page.getByRole('button',{name:'Deny entry',exact:true}).click();
assert.equal(await page.locator('.demo-status').innerText(),'Access denied');
await page.setViewportSize({width:1366,height:900});
await page.evaluate(()=>{document.documentElement.dataset.theme='light';window.scrollTo({top:0,behavior:'instant'})});
await page.screenshot({path:'artifacts/final-desktop.png'});
console.log('PASS: both themes / five widths, keyboard focus restoration, clipboard rejection fallback, focused mobile form, WebGL failure fallback and denied entry.');
await browser.close();
