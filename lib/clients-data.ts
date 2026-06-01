/* Shared client roster — used by the homepage and About page marquees. */
export type Client = { name: string; logo: string | null };

export const CLIENTS: Client[] = [
  { name: 'Engage',                    logo: null },
  { name: 'Maybelline',                logo: '/logos/Maybelline.png' },
  { name: 'Artize',                    logo: '/logos/Artize.png' },
  { name: 'Cornetto',                  logo: null },
  { name: 'Homegrown',                 logo: '/logos/Homegrown.png' },
  { name: 'Renée',                     logo: null },
  { name: 'Sony LIV',                  logo: '/logos/Sony_LIV.png' },
  { name: 'Flipkart',                  logo: '/logos/Flipkart.png' },
  { name: "L'Oréal Paris",             logo: '/logos/L_Or_al_Paris.png' },
  { name: 'Breezer',                   logo: '/logos/Breezer.png' },
  { name: 'Sofy',                      logo: '/logos/Sofy.png' },
  { name: 'Lotto',                     logo: '/logos/Lotto.png' },
  { name: 'Matrix',                    logo: '/logos/Matrix.png' },
  { name: 'TRESemmé',                  logo: '/logos/TRESemm_.png' },
  { name: 'Lavie',                     logo: '/logos/Lavie.png' },
  { name: 'Bombay Times Fashion Week', logo: null },
  { name: 'Emaar India',               logo: null },
  { name: 'Deconstruct',               logo: '/logos/Deconstruct.png' },
  { name: 'Savlon',                    logo: '/logos/Savlon.png' },
  { name: 'Nimyle',                    logo: '/logos/Nimyle.png' },
  { name: 'NPCI',                      logo: '/logos/NPCI.png' },
  { name: 'Tata AIA',                  logo: '/logos/Tata_AIA.png' },
  { name: 'Pillsbury',                 logo: '/logos/Pillsbury.png' },
  { name: 'Ghar',                      logo: null },
];
