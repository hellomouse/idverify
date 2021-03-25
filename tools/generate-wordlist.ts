import got from 'got';

const WORDLIST_URL = 'https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt';

// usage: node build/tools/generate-wordlist.js > src/wordlist.json
async function main() {
  let wordlist = await got.get(WORDLIST_URL);
  let wordsLong = wordlist.body
    .split('\n')
    .filter(Boolean)
    .map(line => line.split('\t')[1]);

  // 7776 (6 ** 5) words in total, need 4096 words
  // 4096 / 7776 = 128 / 243
  // 7776 / 243 = 32
  // split wordlist into 32 groups of 243 words each, then select first 128
  // words in each group
  let words = wordsLong.filter((_val, idx) => (idx % 243) < 128);
  console.log(JSON.stringify(words, null, 1));
}

main();
