/* AUTO-GENERATED from CSV + R2 uploads. DO NOT EDIT MANUALLY.
   Run: npx tsx scripts/sync-csv-upload.ts && npx tsx scripts/upload-csv-videos.ts
*/

export type Project = {
  id: number;
  owner: 'ashna' | 'akshat' | 'external';
  cat: string;
  title: string;
  client: string;
  link: string;
  poster: string;
  platform: 'youtube' | 'instagram' | 'r2';
  orientation: 'h' | 'v';
  tags: string;
};

export const ALL_PROJECTS: Project[] = [
  {
    id: 1,
    owner: 'akshat',
    cat: 'Brand Reels',
    title: 'Samay Raina',
    client: 'Camera On Roll',
    link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/I ❤️ Knorr Ramen. (Poora Europe trip ka kharcha nikal gaya doston)#Knorr #KnorrKoreanRamen #AD # (1).mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/I ❤️ Knorr Ramen. (Poora Europe trip ka kharcha nikal gaya doston)#Knorr #KnorrKoreanRamen #AD # (1).mp4.jpg',
    platform: 'r2',
    orientation: 'v',
    tags: ''
  },
  {
    id: 2,
    owner: 'akshat',
    cat: 'Brand Reels',
    title: 'Urfi',
    client: 'Camera On Roll',
    link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/TDWP X TRESEMME UORFI AND ASFI V6.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/TDWP X TRESEMME UORFI AND ASFI V6.mp4.jpg',
    platform: 'r2',
    orientation: 'v',
    tags: 'Devils wears prada'
  },
  {
    id: 3,
    owner: 'akshat',
    cat: 'Brand Reels',
    title: 'Santanu',
    client: 'Camera On Roll',
    link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/SANTANU X CLAUD V5.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/vertical/SANTANU X CLAUD V5.mp4.jpg',
    platform: 'r2',
    orientation: 'v',
    tags: ''
  },
  {
    id: 4,
    owner: 'ashna',
    cat: 'Product',
    title: 'AASHNAS PINK PRODUCT',
    client: 'Camera On Roll',
    link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/ashna/horizontal/15.mp4 - pick any product shot in the first 10 seconds, dont need models.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/ashna/horizontal/15.mp4 - pick any product shot in the first 10 seconds, dont need models.mp4.jpg',
    platform: 'r2',
    orientation: 'v',
    tags: ''
  },
  {
    id: 5,
    owner: 'akshat',
    cat: 'Cinematography',
    title: 'EMAAR',
    client: 'Camera On Roll',
    link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/Emaar Final.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/Emaar Final.mp4.jpg',
    platform: 'r2',
    orientation: 'h',
    tags: ''
  },
  {
    id: 6,
    owner: 'akshat',
    cat: 'Product',
    title: 'Engage Product Shoot',
    client: 'Camera On Roll',
    link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/IMG_3467.JPG',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/IMG_3467.JPG',
    platform: 'r2',
    orientation: 'h',
    tags: ''
  },
  {
    id: 7,
    owner: 'akshat',
    cat: 'Podcasts',
    title: 'NPCI Podcast',
    client: 'Camera On Roll',
    link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/vidssave.com Ep_ 4 Future-Ready_ A Playbook for Engineers and Dreamers _ Kunal Shah, Founder, CRED 720P.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/vidssave.com Ep_ 4 Future-Ready_ A Playbook for Engineers and Dreamers _ Kunal Shah, Founder, CRED 720P.mp4.jpg',
    platform: 'r2',
    orientation: 'h',
    tags: ''
  },
  {
    id: 8,
    owner: 'akshat',
    cat: 'Product',
    title: 'Complan',
    client: 'Camera On Roll',
    link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/vidssave.com COMPLAN kesar badam 1080P.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/vidssave.com COMPLAN kesar badam 1080P.mp4.jpg',
    platform: 'r2',
    orientation: 'h',
    tags: ''
  },
  {
    id: 9,
    owner: 'akshat',
    cat: 'Product',
    title: 'Bombay 99 Ad',
    client: 'Camera On Roll',
    link: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/Bombay 99 Mixers.mp4',
    poster: 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev/akshat/horizontal/Bombay 99 Mixers.mp4.jpg',
    platform: 'r2',
    orientation: 'h',
    tags: ''
  }
];

export const FEATURED_HOME: Project[] = ALL_PROJECTS.slice(0, 8);

export const CATEGORIES = ['Brand Reels', 'Product', 'Cinematography', 'Podcasts'] as const;

export const OWNERS = ['All', 'Ashna', 'Akshat', 'External'] as const;

export function getEmbedUrl(project: Project): string | null {
  const { link, platform } = project;
  if (platform === 'youtube') {
    const id = link.match(/(?:youtu\.be\/|v=|\/embed\/)([\w-]{6,})/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : null;
  }
  if (platform === 'instagram') {
    const sc = link.match(/instagram\.com\/(?:p|reel|tv)\/([\w-]+)/)?.[1];
    return sc ? `https://www.instagram.com/p/${sc}/embed/` : null;
  }
  return null;
}
