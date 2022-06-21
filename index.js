const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

let url = "";
let docName = "";
let output = [];

let maxPages = 7;
const scrape = () => {
    return new Promise( (resolve, reject) => {
        axios.get(url)
        .then((response) => {
            const $ = cheerio.load(response.data);

            // create array of separate "items" as they appear in HTML
            let items = []
            $('****ENTER JQUERY SELECTOR HERE****').each((_index, el) => {
                items.push($(el));
            })

            // map through coachesHtml and create new coach() with info
                // push to output array
            items.map((x) => {
                const sub$ = cheerio.load(x.html());

                // find item 1
                const item_1 = sub$('****ENTER JQUERY SELECTOR HERE****').text();

                // find item 2
                const item_2 = sub$('****ENTER JQUERY SELECTOR HERE****').text();
                

                // to drill down further 
                // repeat if needed
                let subItems = [];
                sub$('****ENTER JQUERY SELECTOR HERE****').each((_idx, el) => {
                    subItems.push(sub$(el));
                })
                subItems.map((y) => {
                    const subSub$ = cheerio.load(y.html());

                    // find item 3
                    const item_3 = subSub$('****ENTER JQUERY SELECTOR HERE****').text(); // removes colon
                    
                    /* 
                        Adjust JSON output here
                    */
                    output.push({
                        "item_1": item_1,
                        "item_2": item_2,
                        "item_3": item_3
                    })

                })
            })


        })
        .catch((err) => {
            console.log(err);
        })
        .then( () => resolve())

    })
       
}


async function buildDoc() {

    await scrape();
    // for (let i = 0; i < maxPages + 1; i++) {
    //     await scrape(i);
    // }


    fs.appendFile("./" + docName + ".json", JSON.stringify(output, null, 4), err => {
        if (err) {
            console.log(err);
            }
        });
    console.log('Scraping Complete!');
}

buildDoc();