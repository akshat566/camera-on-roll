/* Shared client roster — used by the homepage and About page marquees. */
export type Client = { name: string; logo: string | null; domain: string };

export const CLIENTS: Client[] = [
  { name: 'Engage',                    logo: null,                    domain: 'engage.itcportal.com' },
  { name: 'Maybelline',                logo: '/logos/Maybelline.png', domain: 'maybelline.com' },
  { name: 'Artize',                    logo: '/logos/Artize.png',     domain: 'artize.in' },
  { name: 'Cornetto',                  logo: null,                    domain: 'cornetto.com' },
  { name: 'Homegrown',                 logo: '/logos/Homegrown.png',  domain: 'homegrown.co.in' },
  { name: 'Renée',                     logo: null,                    domain: 'reneecosmetics.com' },
  { name: 'Sony LIV',                  logo: '/logos/Sony_LIV.png',   domain: 'sonyliv.com' },
  { name: 'Flipkart',                  logo: '/logos/Flipkart.png',   domain: 'flipkart.com' },
  { name: "L'Oréal Paris",             logo: '/logos/L_Or_al_Paris.png', domain: 'lorealparis.com' },
  { name: 'Breezer',                   logo: '/logos/Breezer.png',    domain: 'bacardi.com' },
  { name: 'Sofy',                      logo: '/logos/Sofy.png',       domain: 'sofy.in' },
  { name: 'Lotto',                     logo: '/logos/Lotto.png',      domain: 'lottosport.com' },
  { name: 'Matrix',                    logo: '/logos/Matrix.png',     domain: 'matrixprofessional.in' },
  { name: 'TRESemmé',                  logo: '/logos/TRESemm_.png',   domain: 'tresemme.com' },
  { name: 'Lavie',                     logo: '/logos/Lavie.png',     domain: 'lavieworld.com' },
  { name: 'Bombay Times Fashion Week', logo: null,                    domain: 'bombaytimesfashionweek.com' },
  { name: 'Emaar India',               logo: null,                    domain: 'emaar-india.com' },
  { name: 'Deconstruct',               logo: '/logos/Deconstruct.png', domain: 'deconstruct.in' },
  { name: 'Savlon',                    logo: '/logos/Savlon.png',     domain: 'savlon.in' },
  { name: 'Nimyle',                    logo: '/logos/Nimyle.png',     domain: 'nimyle.com' },
  { name: 'NPCI',                      logo: '/logos/NPCI.png',       domain: 'npci.org.in' },
  { name: 'Tata AIA',                  logo: '/logos/Tata_AIA.png',  domain: 'tataaia.com' },
  { name: 'Pillsbury',                 logo: '/logos/Pillsbury.png', domain: 'pillsbury.in' },
  { name: 'Ghar',                      logo: null,                    domain: 'gharsoaps.com' },
];
