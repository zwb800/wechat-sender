const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    "platformName": "Android",
    // "platformVersion": "10",
    // "deviceName": "MI_8",
    // "app": "d:\\Users\\zwb\\Downloads\\ApiDemos-debug.apk",
    // "appPackage": "io.appium.android.apis",
    // "appActivity": ".view.TextFields",
    "automationName": "UiAutomator2"
  }
};

const notSend = ['燕子','ice bear','乖乖虎']

function swipe(){
  driver.touchAction([
    {action: 'press', x: 583, y: 2000},
    {action: 'moveTo', x: 583, y: 600},
    'release'
  ]);
}

let driver = null

async function main () {
  driver = await wdio.remote(opts);
  
  const btnNext = await driver.$('id=com.tencent.mm:id/em')

  while(true){
    const field = await driver.$$("id=com.tencent.mm:id/j9q")
    if(field.length==0){
      console.error('未找到元素')
      break
    }
  
    for (const e of field) {

      const isChecked = await e.getAttribute("checked") == 'true'
      if(isChecked){
        continue
      } 
      const parent = await e.nextElement()
      const text = await (await parent.$('id=com.tencent.mm:id/c8_')).getText()
      if(!notSend.includes(text)){
        await e.click()
        const btnLabel = await btnNext.getText()
        const regex = /\d+/.exec(btnLabel)
        if(regex.length>0){
          const count = parseInt(regex[0])
          if(count == 200){
            btnNext.click()
            break
          }
          
        }
      }
        
    }
    swipe()
  }
  
//   await field.setValue("Hello World!");
//   const value = await field.getText();
//   assert.strictEqual(value,"Hello World!");


//   await client.deleteSession();
}

main();