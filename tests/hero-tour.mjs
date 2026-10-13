import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage();
for(const width of [375,1366]){
 await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 for(const [i,p] of [.16,.4,.64,.92].entries()){
  await page.evaluate(p=>{const track=document.querySelector('.hero-tour .scroll-expand__track');const h=document.querySelector('.hero-tour .scroll-expand__stage').clientHeight;window.scrollTo({top:track.getBoundingClientRect().top+scrollY-(innerWidth<1024?72:78)+h*1.65*p,behavior:'instant'})},p);
  await page.waitForTimeout(400);
  assert.equal(await page.locator('.hero-annotations').getAttribute('data-step'),String(i));
  const marker=await page.locator('.hero-annotation[data-active=true]').boundingBox();
  assert(marker.x>0 && marker.x<width);
  await page.screenshot({path:`artifacts/hero-${width}-${i}.png`});
 }
}
await page.emulateMedia({reducedMotion:'reduce'});await page.reload();assert.equal(await page.locator('.hero-tour-summary').evaluate(e=>getComputedStyle(e).position),'relative');
console.log('PASS four sequential annotations at desktop/mobile and static reduced-motion summary.');await browser.close();
