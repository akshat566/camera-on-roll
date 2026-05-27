/**
 * Fetch brand logos from the web for each client.
 * Tries: Wikipedia/Wikimedia → brand website favicon → Google favicon API
 */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const OUT_DIR = 'c:/camera-on-roll/public/logos';
fs.mkdirSync(OUT_DIR, { recursive: true });

const BRANDS = [
  { name: 'Engage', domain: 'engage.itcportal.com', wiki: 'Engage_(ITC)' },
  { name: 'Maybelline', domain: 'maybelline.com', wiki: 'Maybelline' },
  { name: 'Artize', domain: 'artize.in', wiki: null },
  { name: 'Cornetto', domain: 'cornetto.com', wiki: 'Cornetto_(ice_cream)' },
  { name: 'Homegrown', domain: 'homegrown.co.in', wiki: null },
  { name: 'Renée', domain: 'reneecosmetics.com', wiki: null },
  { name: 'Sony LIV', domain: 'sonyliv.com', wiki: 'Sony_LIV' },
  { name: 'Flipkart', domain: 'flipkart.com', wiki: 'Flipkart' },
  { name: "L'Oréal Paris", domain: 'lorealparis.com', wiki: "L%27Or%C3%A9al" },
  { name: 'Breezer', domain: 'bacardi.com', wiki: 'Bacardi_Breezer' },
  { name: 'Sofy', domain: 'sofy.in', wiki: null },
  { name: 'Lotto', domain: 'lottosport.com', wiki: 'Lotto_Sport_Italia' },
  { name: 'Matrix', domain: 'matrixprofessional.in', wiki: 'Matrix_(haircare)' },
  { name: 'TRESemmé', domain: 'tresemme.com', wiki: 'TRESemmé' },
  { name: 'Lavie', domain: 'lavieworld.com', wiki: null },
  { name: 'Bombay Times Fashion Week', domain: 'bombaytimesfashionweek.com', wiki: null },
  { name: 'Emaar India', domain: 'emaar-india.com', wiki: 'Emaar_Properties' },
  { name: 'Deconstruct', domain: 'deconstruct.in', wiki: null },
  { name: 'Savlon', domain: 'savlon.in', wiki: 'Savlon' },
  { name: 'Nimyle', domain: 'nimyle.com', wiki: null },
  { name: 'NPCI', domain: 'npci.org.in', wiki: 'National_Payments_Corporation_of_India' },
  { name: 'Tata AIA', domain: 'tataaia.com', wiki: 'Tata_AIA_Life' },
  { name: 'Pillsbury', domain: 'pillsbury.in', wiki: 'Pillsbury_Company' },
  { name: 'Ghar', domain: 'gharsoaps.com', wiki: null },
];

async function download(url: string, outPath: string): Promise<boolean> {
  try {
    const response = await fetch(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) return false;
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outPath, Buffer.from(buffer));
    return true;
  } catch { return false; }
}

function fileSize(path: string): number {
  try { return fs.statSync(path).size; } catch { return 0; }
}

async function fetchWikiLogo(brand: typeof BRANDS[0]): Promise<string | null> {
  if (!brand.wiki) return null;
  
  // Try Wikimedia Commons first
  const commonsUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${brand.wiki}&prop=pageimages&format=json&pithumbsize=200`;
  try {
    const res = await fetch(commonsUrl, { signal: AbortSignal.timeout(10000) });
    const data = await res.json();
    const pages = data.query?.pages;
    const pageId = Object.keys(pages)[0];
    const thumb = pages[pageId]?.thumbnail?.source;
    if (thumb) {
      const tmpPath = path.join(OUT_DIR, `${brand.name.replace(/[^a-z0-9]/gi, '_')}_wiki.png`);
      if (await download(thumb, tmpPath) && fileSize(tmpPath) > 500) {
        return tmpPath;
      }
    }
  } catch {}
  return null;
}

async function fetchFavicon(brand: typeof BRANDS[0]): Promise<string | null> {
  const safeName = brand.name.replace(/[^a-z0-9]/gi, '_');
  
  // Try multiple favicon sources
  const sources = [
    `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`,
    `https://${brand.domain}/favicon.ico`,
    `https://${brand.domain}/apple-touch-icon.png`,
    `https://logo.clearbit.com/${brand.domain}?size=80`,
  ];
  
  for (const url of sources) {
    const outPath = path.join(OUT_DIR, `${safeName}.png`);
    if (await download(url, outPath) && fileSize(outPath) > 200) {
      // Check if it's a real image (not an HTML error page)
      const header = fs.readFileSync(outPath).subarray(0, 4);
      const isPng = header[0] === 0x89 && header[1] === 0x50;
      const isJpg = header[0] === 0xFF && header[1] === 0xD8;
      const isIco = header[0] === 0x00 && header[1] === 0x00 && header[2] === 0x01 && header[3] === 0x00;
      if (isPng || isJpg || isIco) {
        return outPath;
      }
      // Not a valid image, remove it
      fs.unlinkSync(outPath);
    }
  }
  return null;
}

async function main() {
  const results: { name: string; path: string | null; source: string }[] = [];
  
  for (const brand of BRANDS) {
    process.stdout.write(`Fetching ${brand.name}... `);
    
    // Try Wikipedia first (highest quality logos)
    const wikiPath = await fetchWikiLogo(brand);
    if (wikiPath) {
      console.log(`✓ Wikipedia`);
      results.push({ name: brand.name, path: wikiPath, source: 'wikipedia' });
      continue;
    }
    
    // Try favicon sources
    const favPath = await fetchFavicon(brand);
    if (favPath) {
      console.log(`✓ Favicon/API`);
      results.push({ name: brand.name, path: favPath, source: 'favicon' });
      continue;
    }
    
    console.log(`✗ Not found`);
    results.push({ name: brand.name, path: null, source: 'none' });
  }
  
  console.log('\n=== RESULTS ===');
  const found = results.filter(r => r.path);
  const missing = results.filter(r => !r.path);
  console.log(`Found: ${found.length}/${results.length}`);
  console.log(`Missing: ${missing.map(m => m.name).join(', ')}`);
  
  // Now convert all to PNG and resize to consistent 200x200 white circle
  for (const result of found) {
    if (!result.path) continue;
    const safeName = result.name.replace(/[^a-z0-9]/gi, '_');
    const finalPath = path.join(OUT_DIR, `${safeName}.png`);
    
    try {
      // Use ImageMagick to convert to PNG, resize to 200x200, and make circular
      // First create a white circle mask
      execFileSync('magick', [
        result.path,
        '-resize', '200x200>',
        '-background', 'white',
        '-gravity', 'center',
        '-extent', '200x200',
        '-format', 'png',
        finalPath
      ]);
      console.log(`Processed: ${result.name}`);
    } catch (e) {
      // If ImageMagick fails, just keep original
      if (result.path !== finalPath) {
        fs.copyFileSync(result.path, finalPath);
      }
      console.log(`Kept original: ${result.name}`);
    }
  }
  
  console.log(`\nAll logos saved to ${OUT_DIR}`);
}

main().catch(console.error);
