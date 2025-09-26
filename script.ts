import puppeteer from "puppeteer";


interface typeOfFiels {
  email_id: string,
  name: string,
  rollNumber: string,
  contactNumber: string,
  defaultSelect: number 
}


const fields : typeOfFiels= {
  email_id: "ashtondsouza192@gmail.com",
  name: "Ashton Dsouza",
  rollNumber: "28",
  contactNumber:"8828518227",
  defaultSelect: 1 // choose 2nd option for multiple-choice (0-based index)
};

const links : string[] = [
   'https://forms.gle/tQXwDH14EGbQsRLw6'
  // add more
];

async function fillForm(page: puppeteer.Page) {
  // 1) Wait for form to load
  await page.waitForSelector("form");

  // 2) Fill all text inputs (Google Forms uses input[type=text] for short answers)
  const textInputs = await page.$$("input[type='text']");
  for (const input of textInputs) {
    const name = await input.evaluate((el:any) =>
      el.closest("div[aria-label]")?.getAttribute("aria-label")
    );
    if (!name) continue;

    let value = "";
    if (name.toLowerCase().includes("name")) value = fields.name;
    else if (name.toLowerCase().includes("email")) value = fields.email_id;
    else if (name.toLowerCase().includes("roll")) value = fields.rollNumber;
    else if (name.toLowerCase().includes("contact"))
      value = fields.contactNumber;

    if (value) {
      await input.type(value);
    }
  }

  // 3) Select default multiple-choice (radio buttons)
  const radioGroups = await page.$$("div[role='radiogroup']");
  for (const group of radioGroups) {
    const options = await group.$$("div[role='radio']");
    if (options.length > 0) {
      const idx =
        fields.defaultSelect >= options.length
          ? 0
          : fields.defaultSelect; // fallback to first if out of range
      await options[idx].click();
    }
  }

  // 4) Click Next buttons until Submit
  while (true) {
    const nextButton = await page.$(
      "div[role='button'][jsname][data-idom-class*='appsMaterialWizButtonEl']"
    );
    if (!nextButton) break;
    const btnText = await nextButton.evaluate(
      (el:any) => (el as HTMLElement).innerText
    );

    if (btnText.toLowerCase().includes("submit")) {
      await nextButton.click();
      break;
    } else if (btnText.toLowerCase().includes("next")) {
      await nextButton.click();
      await page.waitForTimeout(1000); // wait for next page to load
    } else break;
  }
}

async function main() {
  const browser = await puppeteer.launch({ headless: false }); // show browser for debugging
  const page = await browser.newPage();

  for (const link of links) {
    console.log(`Opening: ${link}`);
    await page.goto(link, { waitUntil: "networkidle2" });
    await fillForm(page);
    console.log(`✅ Submitted: ${link}`);
  }

  await browser.close();
}

main();
