/**
 * Central catalog of all production work shown on /work and home page.
 * Segregated by owner: 'ashna' | 'akshat' | 'external'.
 * Each R2-hosted video has a corresponding poster JPG at `${url}.jpg`.
 */

const R2 = 'https://pub-4d3cad9469854486ab973729b0a3541b.r2.dev';

export type Owner = 'ashna' | 'akshat' | 'external';
export type Platform = 'r2' | 'youtube' | 'instagram';

export type Project = {
  id: string;
  owner: Owner;
  cat: string;
  client: string;
  title: string;
  link: string;       // playable URL (R2 mp4 / YouTube / Instagram)
  poster: string;     // thumbnail image URL
  platform: Platform;
  orientation: 'v' | 'h';
};

// Helpers
const r2 = (key: string) => `${R2}/${key}`;
const poster = (key: string) => `${R2}/${key}.jpg`;

// Build R2-hosted entry
const R2Entry = (
  owner: Owner,
  key: string,
  meta: Omit<Project, 'id'|'owner'|'link'|'poster'|'platform'>
): Project => ({
  id: `${owner}-${key}`,
  owner,
  link: r2(key),
  poster: poster(key),
  platform: 'r2',
  ...meta,
});

// YouTube poster (mqdefault is always 16:9)
const ytPoster = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

// ─── Ashna's work — 41 R2 videos at work/horizontal & work/vertical ──────
const ASHNA_H = (key: string, m: Omit<Project,'id'|'owner'|'link'|'poster'|'platform'|'orientation'>) =>
  R2Entry('ashna', `work/horizontal/${key}`, { ...m, orientation: 'h' });
const ASHNA_V = (key: string, m: Omit<Project,'id'|'owner'|'link'|'poster'|'platform'|'orientation'>) =>
  R2Entry('ashna', `work/vertical/${key}`, { ...m, orientation: 'v' });

const ASHNA: Project[] = [
  // Fashion
  ASHNA_H('1.mp4_-_fashion_set_1_.mp4',                           { cat:'Fashion',        client:"Ashna",   title:'Fashion Set 1' }),
  ASHNA_H('3.mp4_-_fashion_set_2_.mp4',                           { cat:'Fashion',        client:"Ashna",   title:'Fashion Set 2' }),
  ASHNA_H('4.mp4_-_fashion_set_3_.mp4',                           { cat:'Fashion',        client:"Ashna",   title:'Fashion Set 3' }),
  ASHNA_H('6.mp4_-_fashion_set_4.mp4',                            { cat:'Fashion',        client:"Ashna",   title:'Fashion Set 4' }),
  ASHNA_H('8.mp4_-_fashion_set_5.mp4',                            { cat:'Fashion',        client:"Ashna",   title:'Fashion Set 5' }),
  ASHNA_H('10.mp4_-_more_shots_of_fashion_set_5_.mp4',            { cat:'Fashion',        client:"Ashna",   title:'Fashion Set 5 · Cont.' }),
  ASHNA_H('21.mp4_-_fashion_set_6.mp4',                           { cat:'Fashion',        client:"Ashna",   title:'Fashion Set 6' }),
  ASHNA_H('24.mp4_-_fashion_sets_7_.mp4',                         { cat:'Fashion',        client:"Ashna",   title:'Fashion Set 7' }),
  ASHNA_H('30.mp4_-_fashion_set_8.mp4',                           { cat:'Fashion',        client:"Ashna",   title:'Fashion Set 8' }),
  // Product
  ASHNA_H('11.mp4_-_bubble_shot_.mp4',                            { cat:'Product',        client:"Ashna",   title:'Bubble Shot · Pink' }),
  ASHNA_H('12.mp4_-_4_drinks_shot__bartender_shuffling_shot__JAPONICO_shots.mp4', { cat:'Product', client:'Japonico', title:'Drinks · Bartender' }),
  ASHNA_H('15.mp4_-_pick_any_product_shot_in_the_first_10_seconds__dont_need_models.mp4', { cat:'Product', client:"Ashna", title:'Product Shot · Open' }),
  ASHNA_H('20.mp4_-_product_shot.mp4',                            { cat:'Product',        client:"Ashna",   title:'Product Shot' }),
  ASHNA_H('22.mp4_-_bubble_shot_.mp4',                            { cat:'Product',        client:"Ashna",   title:'Bubble Shot · Alt' }),
  ASHNA_H('27.mp4_-_product_shot_0.11_onwards_.mp4',              { cat:'Product',        client:"Ashna",   title:'Product Detail' }),
  ASHNA_H('28.mp4_-_initial_5-10_seconds__product__mascara__closeup.mp4', { cat:'Product', client:"Ashna",  title:'Mascara · Closeup' }),
  ASHNA_H('29.mp4_-_need_one_balloon_setup_shot.mp4',             { cat:'Product',        client:"Ashna",   title:'Balloon Setup' }),
  // Cinematography
  ASHNA_H('7.mp4_-_i_like_the_reverse_walking_b_w_shot_.mp4',     { cat:'Cinematography', client:"Ashna",   title:'Reverse Walking · B&W' }),
  ASHNA_H('9.mp4_-_see_if_you_wanna_take_the_talking_bit.mp4',    { cat:'Cinematography', client:"Ashna",   title:'Studio Talk' }),
  ASHNA_H('13.mp4_-_outdoor_indian_set_1_.mp4',                   { cat:'Cinematography', client:"Ashna",   title:'Outdoor · Indian Set' }),
  ASHNA_H('14.mp4_-_outdoor_set_2_.mp4',                          { cat:'Cinematography', client:"Ashna",   title:'Outdoor Set 2' }),
  ASHNA_H('16.mp4_-_outdoor_set_3.mp4',                           { cat:'Cinematography', client:"Ashna",   title:'Outdoor Set 3' }),
  ASHNA_H('18.mp4_-_0.2_seconds__spotlight_on_face.mp4',          { cat:'Cinematography', client:"Ashna",   title:'Spotlight' }),
  ASHNA_H('25.mp4_-_any_moodshot_.mp4',                           { cat:'Cinematography', client:"Ashna",   title:'Mood Moment' }),
  ASHNA_H('26.mp4_-_moodshot.mp4',                                { cat:'Cinematography', client:"Ashna",   title:'Moodshot' }),
  ASHNA_H('31-_one_kids_shot_.mp4',                               { cat:'Cinematography', client:"Ashna",   title:'Kids' }),
  // Podcast
  ASHNA_H('2.mp4_-_podcast_setup.mp4',                            { cat:'Podcasts',       client:"Ashna",   title:'Podcast Setup' }),
  // Vertical reels
  ASHNA_V('0.3_blur_to_coloured_transition.mp4',                  { cat:'Brand Reels',    client:"Ashna",   title:'Blur to Colour' }),
  ASHNA_V('coloured_shot_option_for_interiors.mp4',               { cat:'Brand Reels',    client:"Ashna",   title:'Interior · Colour 1' }),
  ASHNA_V('coloured_shot_options_for_interior.mp4',               { cat:'Brand Reels',    client:"Ashna",   title:'Interior · Colour 2' }),
  ASHNA_V('digital_ad_.mp4',                                      { cat:'Brand Reels',    client:"Ashna",   title:'Digital Ad' }),
  ASHNA_V('event_-_take_some_famous_face_.mp4',                   { cat:'Brand Reels',    client:"Ashna",   title:'Event Reel 1' }),
  ASHNA_V('event_reel_-_take_a_famous_persons_face_.mp4',         { cat:'Brand Reels',    client:"Ashna",   title:'Event Reel 2' }),
  ASHNA_V('fashion_set.mp4',                                      { cat:'Fashion',        client:"Ashna",   title:'Fashion Reel' }),
  ASHNA_V('interior.mp4',                                         { cat:'Brand Reels',    client:"Ashna",   title:'Interior' }),
  ASHNA_V('interiors_-_need_b_w_to_coloured_shot.mp4',            { cat:'Brand Reels',    client:"Ashna",   title:'Interior · B&W to Colour' }),
  ASHNA_V('kid_and_mom_dancing_shot_-_set_8.mp4',                 { cat:'Brand Reels',    client:"Ashna",   title:'Kids · Dance' }),
  ASHNA_V('need_this_clothes_changing_transition.mp4',            { cat:'Brand Reels',    client:"Ashna",   title:'Wardrobe Transition' }),
  ASHNA_V('outdoor_set_.mp4',                                     { cat:'Brand Reels',    client:"Ashna",   title:'Outdoor Reel' }),
  ASHNA_V('outdoor_shoot_moodshot.mp4',                           { cat:'Brand Reels',    client:"Ashna",   title:'Outdoor Mood' }),
];

// ─── Akshat's work — 34 R2 videos at akshat/vertical & akshat/horizontal ─
const AK_V = (key: string, m: Omit<Project,'id'|'owner'|'link'|'poster'|'platform'>) =>
  R2Entry('akshat', `akshat/vertical/${key}`, m);
const AK_H = (key: string, m: Omit<Project,'id'|'owner'|'link'|'poster'|'platform'>) =>
  R2Entry('akshat', `akshat/horizontal/${key}`, m);

const AKSHAT: Project[] = [
  // Horizontal priorities (3 client ads)
  AK_H('vidssave.com_COMPLAN_kesar_badam_1080P.mp4', { cat:'Product',  client:'Complan', title:'Complan · Kesar Badam',      orientation:'h' }),
  AK_H('HSBCv2.mp4',                                  { cat:'Brand Reels', client:'HSBC',    title:'HSBC',                    orientation:'h' }),
  AK_H('Bombay_99_Mixers.mp4',                        { cat:'Product',  client:'Bombay 99', title:'Bombay 99 · Mixers',       orientation:'h' }),
  // Long-form podcast episodes (horizontal in akshat/vertical/ folder)
  AK_V('vidssave.com_Ep__4_Future-Ready__A_Playbook_for_Engineers_and_Dreamers___Kunal_Shah__Founder__CRED_720P.mp4', { cat:'Podcasts', client:'CRED', title:'Future-Ready · Kunal Shah', orientation:'h' }),
  AK_V('vidssave.com_Ep_5_More_Than_A_Bank__How_SBI_Shapes_India_s_Future___CS_Setty__Chairman__SBI_720P.mp4',         { cat:'Podcasts', client:'SBI',  title:'More Than A Bank · CS Setty', orientation:'h' }),
  AK_V('vidssave.com_Investment_Strategies_for_Long-Term_Wealth_with_Tata_AIA_720P.mp4',                                { cat:'Podcasts', client:'Tata AIA', title:'Investment Strategies · Tata AIA', orientation:'h' }),
  // "default__*" — horizontal mood/B-roll clips
  AK_V('default__13__1.mp4',           { cat:'Cinematography', client:'Akshat', title:'Clip 1', orientation:'h' }),
  AK_V('default__133134253456_.mp4',   { cat:'Cinematography', client:'Akshat', title:'Clip 2', orientation:'h' }),
  AK_V('default__134_.mp4',            { cat:'Cinematography', client:'Akshat', title:'Clip 3', orientation:'h' }),
  AK_V('default__136_.mp4',            { cat:'Cinematography', client:'Akshat', title:'Clip 4', orientation:'h' }),
  AK_V('default__1433_.mp4',           { cat:'Cinematography', client:'Akshat', title:'Clip 5', orientation:'h' }),
  AK_V('default__1gsdfh_fdggh_hg3_.mp4', { cat:'Cinematography', client:'Akshat', title:'Clip 6', orientation:'h' }),
  AK_V('default__1qerqer3_.mp4',       { cat:'Cinematography', client:'Akshat', title:'Clip 7', orientation:'h' }),
  // Snapsave (Instagram-downloaded reels, vertical 9:16)
  AK_V('snapsave-app_3563965397331263512.mp4', { cat:'Brand Reels', client:'Akshat', title:'Reel 1', orientation:'v' }),
  AK_V('snapsave-app_3572862150502482796.mp4', { cat:'Brand Reels', client:'Akshat', title:'Reel 2', orientation:'v' }),
  AK_V('snapsave-app_3631636547351477692.mp4', { cat:'Brand Reels', client:'Akshat', title:'Reel 3', orientation:'v' }),
  AK_V('snapsave-app_3671489376971988178.mp4', { cat:'Brand Reels', client:'Akshat', title:'Reel 4', orientation:'v' }),
  AK_V('snapsave-app_3704032377286461338.mp4', { cat:'Brand Reels', client:'Akshat', title:'Reel 5', orientation:'v' }),
  AK_V('snapsave-app_3718445394176428041.mp4', { cat:'Brand Reels', client:'Akshat', title:'Reel 6', orientation:'v' }),
  AK_V('snapsave-app_3720693803373489463.mp4', { cat:'Brand Reels', client:'Akshat', title:'Reel 7', orientation:'v' }),
  AK_V('snapsave-app_3730876355291782962.mp4', { cat:'Brand Reels', client:'Akshat', title:'Reel 8', orientation:'v' }),
];

// ─── External — original Instagram & YouTube links from real client work ─
const ig = (shortcode: string, m: Omit<Project,'id'|'owner'|'link'|'poster'|'platform'>): Project => ({
  id: `ext-ig-${shortcode}`, owner:'external', platform:'instagram',
  link: `https://www.instagram.com/p/${shortcode}/`,
  // IG doesn't expose easy thumbs without API; use a tasteful Unsplash placeholder.
  poster: m.orientation === 'v'
    ? 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80'
    : 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80',
  ...m,
});
const yt = (id: string, m: Omit<Project,'id'|'owner'|'link'|'poster'|'platform'|'orientation'>): Project => ({
  id: `ext-yt-${id}`, owner:'external', platform:'youtube',
  link: `https://youtu.be/${id}`,
  poster: ytPoster(id),
  orientation: 'h',
  ...m,
});

const EXTERNAL: Project[] = [
  // Samay Raina
  ig('DLzwCLPCRzS', { cat:'Brand Reels', client:'Samay Raina',  title:'Brand Reel', orientation:'v' }),
  // Urfi Javed (7 reels — "Devil Wears Prada" is one of these; user to confirm which)
  ig('DF1v6VrtsAY', { cat:'Brand Reels', client:'Urfi Javed',   title:'Brand Reel 1', orientation:'v' }),
  ig('DJmKjLWNf28', { cat:'Brand Reels', client:'Urfi Javed',   title:'Brand Reel 2', orientation:'v' }),
  ig('DKZpF8ONbpx', { cat:'Brand Reels', client:'Urfi Javed',   title:'Brand Reel 3', orientation:'v' }),
  ig('DMxYfwFNqJK', { cat:'Brand Reels', client:'Urfi Javed',   title:'Devil Wears Prada', orientation:'v' }),
  ig('DNVhSG6S3M-', { cat:'Brand Reels', client:'Urfi Javed',   title:'Brand Reel 5', orientation:'v' }),
  ig('DNnXdKEtIea', { cat:'Brand Reels', client:'Urfi Javed',   title:'Brand Reel 6', orientation:'v' }),
  ig('DOij00UEu03', { cat:'Brand Reels', client:'Urfi Javed',   title:'Brand Reel 7', orientation:'v' }),
  // Santanu Hazarika (4 reels)
  ig('DGVWzIwI4Ns', { cat:'Brand Reels', client:'Santanu Hazarika', title:'Claude AI', orientation:'v' }),
  ig('DGe1Bk6IZYO', { cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 2', orientation:'v' }),
  ig('DOakmKEksgJ', { cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 3', orientation:'v' }),
  ig('DPGvEcyEh8y', { cat:'Brand Reels', client:'Santanu Hazarika', title:'Brand Reel 4', orientation:'v' }),
  // NPCI Innovators Playground
  yt('KHl8rzSUGWk', { cat:'Podcasts', client:'NPCI',     title:'Innovators Playground · Ep 1' }),
  yt('lwl5v5K_Vco', { cat:'Podcasts', client:'NPCI',     title:'Innovators Playground · Ep 2' }),
  yt('osuR5mV8QGI', { cat:'Podcasts', client:'NPCI',     title:'Innovators Playground · Ep 3' }),
  yt('iqIlbXxfV5g', { cat:'Podcasts', client:'NPCI',     title:'Innovators Playground · Ep 4' }),
  // TATA AIA
  yt('pXotTJIzbXw', { cat:'Podcasts', client:'TATA AIA', title:'Podcast Episode 1' }),
  yt('5ORdSPEHvjI', { cat:'Podcasts', client:'TATA AIA', title:'Podcast Episode 2' }),
  yt('EW76GrxnQU4', { cat:'Podcasts', client:'TATA AIA', title:'Podcast Episode 3' }),
  // Other product / commercial
  yt('ECkslerq9Rk', { cat:'Product',  client:'Parachute', title:'Influencer Holi Reel' }),
];

export const ALL_PROJECTS: Project[] = [...ASHNA, ...AKSHAT, ...EXTERNAL];

export const CATEGORIES = ['All', 'Fashion', 'Product', 'Cinematography', 'Brand Reels', 'Podcasts'] as const;
export const OWNERS = ['All', 'Ashna', 'Akshat', 'External'] as const;

/** Featured 8 for home page — user-requested mix. */
export const FEATURED_HOME: Project[] = [
  ALL_PROJECTS.find(p => p.id === 'ext-ig-DLzwCLPCRzS')!,        // Samay Raina (V)
  ALL_PROJECTS.find(p => p.id === 'akshat-akshat/horizontal/vidssave.com_COMPLAN_kesar_badam_1080P.mp4')!, // Complan (H)
  ALL_PROJECTS.find(p => p.id === 'ext-ig-DMxYfwFNqJK')!,        // Urfi · Devil Wears Prada (V)
  ALL_PROJECTS.find(p => p.id === 'akshat-akshat/horizontal/Bombay_99_Mixers.mp4')!,                       // Bombay 99 (H)
  ALL_PROJECTS.find(p => p.id === 'ext-ig-DGVWzIwI4Ns')!,        // Santanu · Claude AI (V)
  ALL_PROJECTS.find(p => p.id === 'akshat-akshat/horizontal/HSBCv2.mp4')!,                                 // HSBC (H)
  ALL_PROJECTS.find(p => p.id === 'ashna-work/horizontal/11.mp4_-_bubble_shot_.mp4')!,                     // Ashna · Pink bubble shot (H)
  ALL_PROJECTS.find(p => p.id === 'ext-yt-KHl8rzSUGWk')!,        // NPCI Podcast (H)
].filter(Boolean);

/** Embed URL builder for the modal player. */
export function getEmbedUrl(p: Project): string | null {
  if (p.platform === 'youtube') {
    const m = p.link.match(/(?:youtu\.be\/|v=|\/embed\/)([\w-]{6,})/);
    return m ? `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0&modestbranding=1` : null;
  }
  if (p.platform === 'instagram') {
    const m = p.link.match(/instagram\.com\/(?:p|reel|tv)\/([\w-]+)/);
    return m ? `https://www.instagram.com/p/${m[1]}/embed/` : null;
  }
  return null;
}
