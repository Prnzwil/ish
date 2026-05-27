// All content + image references for Ish Hair & Beauty Salon
// Images via Unsplash (hot-link, stable IDs)

const IMG = {
  // Hero / interior
  heroSalon: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=2200&q=80&auto=format&fit=crop",
  salonInterior: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1600&q=80&auto=format&fit=crop",
  salonChair: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80&auto=format&fit=crop",
  // Services
  hairStyling: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=80&auto=format&fit=crop",
  hairColor: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80&auto=format&fit=crop",
  hairTreatment: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1200&q=80&auto=format&fit=crop",
  hairExtensions: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&q=80&auto=format&fit=crop",
  bridal: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=1200&q=80&auto=format&fit=crop",
  beauty: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80&auto=format&fit=crop",
  // Portraits / team
  stylist1: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80&auto=format&fit=crop",
  stylist2: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=800&q=80&auto=format&fit=crop",
  stylist3: "https://images.unsplash.com/photo-1592621385612-4d7129426394?w=800&q=80&auto=format&fit=crop",
  stylist4: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop",
  // Gallery
  g1: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1000&q=80&auto=format&fit=crop",
  g2: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1000&q=80&auto=format&fit=crop",
  g3: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=1000&q=80&auto=format&fit=crop",
  g4: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=1000&q=80&auto=format&fit=crop",
  g5: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=1000&q=80&auto=format&fit=crop",
  g6: "https://images.unsplash.com/photo-1610992015734-2bbf2ad12fcb?w=1000&q=80&auto=format&fit=crop",
  g7: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1000&q=80&auto=format&fit=crop",
  g8: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1000&q=80&auto=format&fit=crop",
  g9: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1000&q=80&auto=format&fit=crop",
  g10: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=1000&q=80&auto=format&fit=crop",
  g11: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&q=80&auto=format&fit=crop",
  g12: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1000&q=80&auto=format&fit=crop",
  // Lifestyle / textures
  products: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80&auto=format&fit=crop",
  detail: "https://images.unsplash.com/photo-1614368724989-29c6f0fbb37f?w=1600&q=80&auto=format&fit=crop",
  before: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=1200&q=80&auto=format&fit=crop",
  after: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=80&auto=format&fit=crop",
  // Blog
  blog1: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=1200&q=80&auto=format&fit=crop",
  blog2: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=1200&q=80&auto=format&fit=crop",
  blog3: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80&auto=format&fit=crop",
  blog4: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80&auto=format&fit=crop",
};

const SERVICES = [
  {
    id: "styling",
    name: "Hair Styling",
    label: "Signature Style",
    desc: "Effortless blowouts, sculpted updos, and modern cuts tailored to your features and lifestyle.",
    long: "From sleek silk-press finishes to romantic Hollywood waves, our stylists craft looks designed to move with you. Every appointment begins with a consultation so the final shape feels unmistakably yours.",
    img: IMG.hairStyling,
    duration: "60–90 min",
    from: "$65",
    benefits: ["Personalized consultation", "Heat-protected finish", "Long-lasting hold", "Aftercare guidance"],
  },
  {
    id: "color",
    name: "Hair Coloring",
    label: "Custom Colour",
    desc: "From sunlit balayage to rich brunette dimension — colour formulated to flatter your skin and grow out beautifully.",
    long: "Our colourists blend on the spot, layering tones with hand-painted precision. We use ammonia-free systems wherever possible so your hair stays soft, shiny, and healthy.",
    img: IMG.hairColor,
    duration: "2–4 hrs",
    from: "$140",
    benefits: ["Hand-painted balayage", "Bond-building protection", "Tone-matched gloss", "30-day refresh"],
  },
  {
    id: "treatment",
    name: "Hair Treatment",
    label: "Restorative Care",
    desc: "Deep-conditioning masks, scalp rituals, and bond-repair treatments that restore softness and shine.",
    long: "Heat, colour, and styling take a toll. Our in-salon treatments rebuild bonds, soothe the scalp, and lock in moisture — leaving hair visibly stronger after a single session.",
    img: IMG.hairTreatment,
    duration: "45–75 min",
    from: "$85",
    benefits: ["Bond repair", "Scalp ritual massage", "Deep moisture infusion", "Visible shine boost"],
  },
  {
    id: "extensions",
    name: "Hair Extensions",
    label: "Length & Volume",
    desc: "Premium hand-tied wefts and tape-ins — colour-matched, expertly placed, and undetectable.",
    long: "Length you can run your fingers through. We carry ethically sourced, 100% human hair and use placement techniques that protect your natural strands while giving you fullness that lasts.",
    img: IMG.hairExtensions,
    duration: "2.5–4 hrs",
    from: "$320",
    benefits: ["100% human hair", "Undetectable placement", "Custom colour match", "Maintenance plan"],
  },
  {
    id: "bridal",
    name: "Bridal Styling",
    label: "Your Wedding Day",
    desc: "Trial sessions, day-of styling, and bridal-party services — luxury care for one of life's biggest days.",
    long: "We treat your wedding morning like a private suite experience. Trial appointments help us perfect your look in advance, and on the day we'll come to you or host your party in-salon.",
    img: IMG.bridal,
    duration: "Half / full day",
    from: "$280",
    benefits: ["Trial run included", "On-location available", "Bridal party rates", "Touch-up kit included"],
  },
  {
    id: "beauty",
    name: "Beauty Services",
    label: "Complete Glow",
    desc: "Brow shaping, lash lifts, facials, and makeup — finishing touches for an effortless, polished look.",
    long: "Our beauty room rounds out the salon visit with treatments designed to complement your hair. Walk out feeling head-to-toe radiant.",
    img: IMG.beauty,
    duration: "30–90 min",
    from: "$45",
    benefits: ["Brow design", "Lash lift & tint", "Facial treatments", "Special-occasion makeup"],
  },
];

const TESTIMONIALS = [
  {
    text: "Absolutely amazing service. I left feeling confident and beautiful — the kind of transformation that lifts your whole week.",
    name: "Priya M.",
    role: "Bridal Client",
    init: "P",
  },
  {
    text: "Professional, welcoming, and the results were incredible. My colour has never looked this dimensional, and the after-care advice was thoughtful.",
    name: "Jessica R.",
    role: "Colour & Cut",
    init: "J",
  },
  {
    text: "The best salon experience I have had. Every detail — from the consultation to the head massage — felt considered. I'm a forever client.",
    name: "Alanna T.",
    role: "Treatment & Style",
    init: "A",
  },
];

const TEAM = [
  {
    name: "Ishika Patel",
    role: "Founder · Lead Stylist",
    spec: "Precision cutting · Modern styling",
    bio: "Founder of Ish with 12 years across Toronto and London salons. Known for sculpted cuts that grow out as beautifully as they begin.",
    img: IMG.stylist1,
  },
  {
    name: "Maya Chen",
    role: "Colour Director",
    spec: "Balayage · Dimensional colour",
    bio: "Maya specializes in lived-in colour with seamless grow-out. Her hand-painted balayage is the most-requested service in the salon.",
    img: IMG.stylist2,
  },
  {
    name: "Sienna Ross",
    role: "Bridal Specialist",
    spec: "Updos · Wedding day styling",
    bio: "Trained in editorial and bridal across two continents. Sienna has styled over 300 weddings and treats each one like her own.",
    img: IMG.stylist3,
  },
  {
    name: "Lana Okafor",
    role: "Beauty & Treatment Lead",
    spec: "Brows · Lashes · Hair restoration",
    bio: "Lana finishes the look — brows, lashes, skin — and leads our restorative treatment program for damaged and chemically-stressed hair.",
    img: IMG.stylist4,
  },
];

const WHY = [
  { t: "Professional Stylists", d: "A team trained across Toronto, New York, and London salons." },
  { t: "Premium Products", d: "Curated lines from Davines, Olaplex, Oribe, and K18." },
  { t: "Personalized Service", d: "Every visit begins with a detailed one-on-one consultation." },
  { t: "Comfortable Environment", d: "A calm, light-filled space designed to feel like a retreat." },
  { t: "High Satisfaction", d: "A 4.9-star average rating across 33+ verified reviews." },
  { t: "Trusted By Clients", d: "Generations of Oshawa clients who keep returning year after year." },
];

const PROCESS = [
  { t: "Book", d: "Reserve online or by phone in under a minute.", num: "i" },
  { t: "Consult", d: "Sit down for a one-on-one chat about your vision.", num: "ii" },
  { t: "Treatment", d: "Relax while we deliver your service with care.", num: "iii" },
  { t: "Style", d: "Final styling with photography-ready finish.", num: "iv" },
  { t: "Glow", d: "Leave feeling absolutely amazing.", num: "v" },
];

const FAQ = [
  { q: "Do appointments require booking?", a: "We strongly recommend booking ahead — especially for colour, extensions, and bridal services. Walk-ins are accommodated based on availability." },
  { q: "How long do treatments take?", a: "Most services run between 60 and 90 minutes. Colour, extensions, and bridal styling can take 2–4 hours. We'll confirm your timing during booking." },
  { q: "What hair products do you use?", a: "We work exclusively with Davines, Oribe, Olaplex, and K18 — premium product lines selected for results and hair health." },
  { q: "Do you offer bridal services?", a: "Yes. We provide trial sessions, day-of styling, on-location service, and bridal party packages. Book a complimentary bridal consultation to start." },
  { q: "Can I walk in?", a: "Walk-ins are welcome when our schedule allows, but we recommend reserving in advance — particularly for weekends and evenings." },
  { q: "What's your cancellation policy?", a: "We ask for 24 hours notice for cancellations and rescheduling. Late cancellations may be subject to a partial service charge." },
];

const VALUES = [
  { t: "Excellence", d: "We hold ourselves to the highest standard, every appointment." },
  { t: "Beauty", d: "A celebration of individuality, not a single ideal." },
  { t: "Trust", d: "Honest consultation and pricing — no surprises." },
  { t: "Care", d: "Every guest leaves cared for, head to toe." },
  { t: "Satisfaction", d: "Your confidence in the chair is the goal." },
];

const PRICING = [
  {
    label: "Essentials",
    name: "Signature",
    desc: "Everything you need for a polished, regular look.",
    price: "$120",
    unit: "Starting",
    features: ["Consultation & cut", "Wash & blow-dry", "Style finish", "Take-home product sample"],
    featured: false,
  },
  {
    label: "Most Popular",
    name: "Refresh",
    desc: "Add colour and care to your signature service.",
    price: "$240",
    unit: "Starting",
    features: ["Everything in Signature", "Single-process colour", "Gloss & tone", "Bond-repair treatment", "Complimentary scalp ritual"],
    featured: true,
  },
  {
    label: "The Full Suite",
    name: "Transformation",
    desc: "A complete hair & beauty experience.",
    price: "$480",
    unit: "Starting",
    features: ["Cut, colour & style", "Full balayage or correction", "Treatment + scalp ritual", "Brow shaping & lash lift", "Touch-up product kit"],
    featured: false,
  },
];

const HOURS = [
  ["Monday", "Closed"],
  ["Tuesday", "10:00 – 7:00"],
  ["Wednesday", "10:00 – 7:00"],
  ["Thursday", "10:00 – 8:00"],
  ["Friday", "10:00 – 8:00"],
  ["Saturday", "9:00 – 6:00"],
  ["Sunday", "10:00 – 5:00"],
];

const BLOG_POSTS = [
  {
    title: "The five-step routine that keeps colour-treated hair shining all season",
    excerpt: "Our colour director Maya walks through the after-care that protects investment colour — from the day you leave the chair to your next gloss.",
    img: IMG.blog1,
    cat: "Colour Care",
    read: "6 min read",
    featured: true,
  },
  {
    title: "Bridal hair, demystified: what to ask at your trial",
    excerpt: "A trial isn't just a styling rehearsal — it's how we lock in the right neckline, accessories, and longevity for the big day.",
    img: IMG.blog2,
    cat: "Bridal",
    read: "4 min read",
  },
  {
    title: "Why bond-builders changed everything",
    excerpt: "K18, Olaplex, and the science of repairing what styling takes away. A clear-eyed look at what actually works.",
    img: IMG.blog3,
    cat: "Treatment",
    read: "5 min read",
  },
  {
    title: "Finding the right brow shape for your face",
    excerpt: "Lana's framework for brows that flatter — without losing your signature.",
    img: IMG.blog4,
    cat: "Beauty",
    read: "3 min read",
  },
];

const GALLERY_ITEMS = [
  { src: IMG.g1, cat: "Hairstyles" },
  { src: IMG.g2, cat: "Bridal" },
  { src: IMG.g11, cat: "Hair Coloring" },
  { src: IMG.g3, cat: "Hairstyles" },
  { src: IMG.g12, cat: "Salon Environment" },
  { src: IMG.g4, cat: "Transformations" },
  { src: IMG.g5, cat: "Hairstyles" },
  { src: IMG.g6, cat: "Hair Coloring" },
  { src: IMG.g7, cat: "Transformations" },
  { src: IMG.g8, cat: "Salon Environment" },
  { src: IMG.g9, cat: "Bridal" },
  { src: IMG.g10, cat: "Hairstyles" },
];

const GALLERY_CATS = ["All", "Hairstyles", "Hair Coloring", "Bridal", "Transformations", "Salon Environment"];

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "team", label: "Team" },
  { id: "gallery", label: "Gallery" },
  { id: "pricing", label: "Pricing" },
  { id: "blog", label: "Journal" },
  { id: "contact", label: "Contact" },
];

Object.assign(window, {
  IMG, SERVICES, TESTIMONIALS, TEAM, WHY, PROCESS, FAQ, VALUES, PRICING, HOURS, BLOG_POSTS,
  GALLERY_ITEMS, GALLERY_CATS, NAV_LINKS,
});
