//Amazon scraper
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://Jschwartz:Jschwartz@users-w2ygm.mongodb.net/test?retryWrites=true&w=majority";
const CardComplete = require("./models/CardComplete");

//define main array
const totalList = [];
//create async scraper function that takes an array and a card name
async function searchAmazon(array, item) {
  const browser = await puppeteer.launch();

  const url = `https://www.amazon.com/s?k=${item}`;
  const page = await browser.newPage();
  await page.goto(url);

  const nodeList = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-asin]")).map(e =>
      e.innerText.trim()
    )
  );

  function getInfo(item) {
    let infoArray = item.split("\n");

    return { name: infoArray[0], by: infoArray[1] };
  }

  for (let j = 0; j < nodeList.length; j++) {
    totalList.push(getInfo(nodeList[j]));
  }

  await browser.close();
  return array;
}

//test -> searchAmazon(totalList);

async function getAll(array) {
  //connect to db
  await mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(e => console.log("connected"));

  //init obj containing all 10072 card objects
  let obj = await CardComplete.find({}, (err, data) => data);

  //init array for card names after format
  let namesList = [];

  //format card names and push to array
  obj.forEach(card => {
    let splitName = card.name.split(" ");
    let workedName = "";
    splitName.forEach(word => (workedName += `${word}+`));
    workedName += "yugioh+card+singles";
    namesList.push(workedName);
  });

  let list = [];
  for (let i = 0; i < 3; i++) {
    await list.push(searchAmazon(array, namesList));
  }

  return await list;
}

getAll(totalList).then(doc => console.log(doc));
