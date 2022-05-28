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

async function main () {
  const client = await wdio.remote(opts);

  const field = await client.$$("id=com.tencent.mm:id/j9q");
  console.log(field)
  for (const e of field) {
      e.touchAction('tap')
  }
//   await field.setValue("Hello World!");
//   const value = await field.getText();
//   assert.strictEqual(value,"Hello World!");


//   await client.deleteSession();
}

main();