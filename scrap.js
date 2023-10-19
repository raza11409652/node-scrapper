// import puppeteer from "puppeteer";
const fs = require("fs");
const { default: puppeteer } = require("puppeteer");
const checkEmailIsValid = require("./email");
const websiteRequestCall = require("./axios");
function extractEmails(text) {
  const a = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
  const result = [];
  if (a && Array.isArray(a)) {
    for (const iterator of a) {
      if (
        iterator.includes(".png") ||
        iterator.includes(".jpg") ||
        iterator.includes(".svg")
      ) {
      } else {
        const t = iterator.split("@");
        const ta = t?.[1] || "";
        const ag = ta.split(".");
        if (ag.length == 2) result.push(iterator);
      }
    }
  }
  return result;
}
function extractPhones(text) {
  return text.match(/^\d{10}$/);
  // (098)=-()
}

function findWhatsappNumber(t) {
  const mobiles = [];
  if (typeof t === "string") {
    // console.log(t)
    const index = t.indexOf("?phone=");
    console.log("?phone=", index);

    const substring = index > -1 ? t.substring(index) : t;
    let index_and = substring.indexOf("&");
    if (index > -1 && index_and < 0) {
      index_and = 14;
    }
    // console.log(index, index_and);
    if (index > -1) {
      const mobile = substring.substring(7, index_and);
      // return
      mobiles.push(mobile);
    } else {
      // console.log(t);
      const index = t.indexOf("wa.me");
      console.log("Wa.me", index);
      const substring = index > -1 ? t.substring(index) : t;
      // let index_and = substring.indexOf("?");
      // if (index > -1 && index_and < 0) {
      //   index_and = 14;
      // }
      if (index > 0) {
        const mobile = substring.substring(6, 14);
        // return
        mobiles.push(mobile);
      }
      //
    }
    return mobiles;
  }
  return [];
}
const startScrapping = async (url, outputFile) => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)

  try {
    // const browser = await puppeteer.launch({
    //   headless: false,
    //   defaultViewport: null,
    // });

    // // Open a new page
    // const page = await browser.newPage();

    // // On this new page:
    // // - open the "http://quotes.toscrape.com/" website
    // // - wait until the dom content is loaded (HTML is ready)
    // await page.goto(url, {
    //   waitUntil: "networkidle0",
    // });
    const a = await websiteRequestCall(url);
    // var pageContent = await page.content();
    //   console.log(pageContent);
    const pageContent = a;
    const result = { emails: [], mobiles: [], whatsapp: [] };
    const emails = extractEmails(pageContent);
    if (emails && Array.isArray(emails) && emails.length > 0) {
      const x = [...new Set(emails)];
      // if(checkEmailIsValid())
      for (const iterator of x) {
        try {
          const res = await checkEmailIsValid(iterator);
          // console.log("email", res, iterator);
          if (res === "OK") result.emails.push(iterator);
        } catch (e) {}
      }
    }
    const mobiles = extractPhones(pageContent);
    //   console.log(mobiles);
    if (mobiles) {
      result.mobiles = mobiles;
    }

    const waNumber = findWhatsappNumber(pageContent);
    if (waNumber.length > 0) {
      result.whatsapp = waNumber;
    }
    // console.log(waNumber);
    // const title = await page.title();
    // browser.close();
    const output = `${url},${result.emails.join(",")},${result.whatsapp.join(
      ","
    )},${result.mobiles.join(",")}\n`;
    //   console.log(output);
    const file = outputFile ? outputFile : "./output.txt";
    fs.writeFileSync(file, output, { flag: "a+" });
    return url;
  } catch (e) {
    console.log(e);
    return null;
  }
};
module.exports = startScrapping;
