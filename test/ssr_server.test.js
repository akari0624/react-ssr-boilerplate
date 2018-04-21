import puppeteer from 'puppeteer';

const port = process.env.PORT || 3000;
const localServerRootUrl = `localhost:${port}/`;

test('root route server render is functional', async () => {

    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(localServerRootUrl);

    const text = await page.$eval('#root', el => el.innerHTML);

    expect(text).not.toBe('');
    await page.close();
    await browser.close();

});