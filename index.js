// const websiteRequestCall = require("./axios");
// const scrapContent = require("./scrap");
// const { scrapContent } = require("./scrap");

const data = require("./data");
const startScrapping = require("./scrap");

// data.forEach(async (a) => {
//   startScrapping(a.URL).then((d) => {
//     console.log("done");
//   });
// });

async function application() {
  // const a = "https://www.buywow.in";
  // const URL = data[0].URL;
  // const ab = await startScrapping(a, "./result.txt");
  // console.log(ab);
  // const chunk2 = data.splice(0,10)
  for (const iterator of data) {
    const a = await startScrapping(iterator.URL, "./result1.txt");
    // console.log(a);
    console.log(a);
  }
}

application();

/**
 *  98
 *  8
 *  7
 *  6
 *  - 
 *  -- api.whatsapp.com?phone =123455 [web.whatsapp.com] ->session -> [True|false]
 *  -- Name , Is business [true ,false]
 */

