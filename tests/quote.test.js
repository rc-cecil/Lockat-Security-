import test from 'node:test';
import assert from 'node:assert/strict';
import {validateQuote,quoteSummary,whatsappUrl,emailUrl} from '../src/lib/quote.js';
const valid={name:'Ama Mensah',phone:'0246064413',email:'',property:'Homes & Apartments',location:'Adenta',message:'Gate & camera\nPlease call.',consent:true};
test('requires usable contact and consent',()=>{assert.deepEqual(validateQuote(valid),{});assert.deepEqual(Object.keys(validateQuote({...valid,name:' ',phone:'abc',property:'',location:'',consent:false})),['name','phone','property','location','consent']);assert.ok(validateQuote({...valid,email:'invalid'}).email)});
test('summary includes exact selected services and products',()=>{const text=quoteSummary(valid,['intercom'],['intercom-kits']);assert.match(text,/Video Intercom Systems/);assert.match(text,/Video Intercom Kits/);assert.doesNotMatch(text,/undefined|null/);assert.equal(new URL(whatsappUrl(text)).searchParams.get('text'),text);assert.match(emailUrl(text),/^mailto:lockatafrica@gmail.com/)});
