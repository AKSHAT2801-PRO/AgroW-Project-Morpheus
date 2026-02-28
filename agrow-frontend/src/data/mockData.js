// Mock data for AgroW demo - 15 communities, 5 joined, rich posts

export const ALL_COMMUNITIES = [
    // JOINED (5)
    {
        id: 'c1', name: 'Maharashtra Cotton Farmers', isJoined: true,
        members: 3247, posts: 412,
        desc: 'A hub for cotton growers across Maharashtra — crop advice, mandi prices and peer support.',
        state: 'Maharashtra', tags: ['Cotton', 'Kharif', 'Vidarbha'],
        rules: 'Be respectful. No spam. Verified farmers only.',
        about: 'Maharashtra\'s largest cotton-farming community sharing real-time field data and market insights.',
    },
    {
        id: 'c2', name: 'Sugarcane Growers - Kolhapur', isJoined: true,
        members: 1894, posts: 287,
        desc: 'Kolhapur\'s sugarcane community — crushing seasons, FRP rates and water management.',
        state: 'Maharashtra', tags: ['Sugarcane', 'Kolhapur', 'FRP'],
        rules: 'Share verified data. Tag posts with season/year.',
        about: 'Kolhapur district sugarcane growers discussing FRP, factory schedules and irrigation.',
    },
    {
        id: 'c3', name: 'Pune Dairy and Livestock Tech', isJoined: true,
        members: 2103, posts: 344,
        desc: 'Modern dairy practices, cattle health and cooperative milk pricing for Pune-region farmers.',
        state: 'Maharashtra', tags: ['Dairy', 'Livestock', 'Milk'],
        rules: 'Only original field photos. No re-selling posts.',
        about: 'Connecting dairy farmers in Pune and Satara with vets, cooperatives and tech solutions.',
    },
    {
        id: 'c4', name: 'Organic Farming India', isJoined: true,
        members: 5820, posts: 903,
        desc: 'All-India organic farming community — certifications, natural pest control and premium market access.',
        state: 'All India', tags: ['Organic', 'Natural Farming', 'PGS'],
        rules: 'Chemical-free discussion only. Cite sources for claims.',
        about: 'India\'s most active organic farming group — seeds, certification and direct-to-consumer channels.',
    },
    {
        id: 'c5', name: 'Nashik Grape and Wine Growers', isJoined: true,
        members: 987, posts: 156,
        desc: 'Premium grape cultivation, export quality standards and agro-tourism for Nashik valley farmers.',
        state: 'Maharashtra', tags: ['Grapes', 'Nashik', 'Export'],
        rules: 'No political posts. Focus on agronomy and markets.',
        about: 'Nashik valley grape farmers sharing variety trials, pruning schedules and export market data.',
    },
    // NOT JOINED (10)
    {
        id: 'c6', name: 'Vidarbha Soybean Network', isJoined: false,
        members: 2671, posts: 388,
        desc: 'Soybean cultivation, MSP monitoring, and weather alerts for Vidarbha farmers.',
        state: 'Maharashtra', tags: ['Soybean', 'Vidarbha', 'Kharif'],
        rules: 'Regional focus only. English or Marathi.',
        about: 'Vidarbha soybean farmers discussing seed varieties and MSP policy.',
    },
    {
        id: 'c7', name: 'Rajasthan Wheat Growers', isJoined: false,
        members: 4102, posts: 521,
        desc: 'Wheat cultivation, rabi crop management and APMC mandi rates for Rajasthan farmers.',
        state: 'Rajasthan', tags: ['Wheat', 'Rabi', 'Rajasthan'],
        rules: 'Mandi data must be sourced.',
        about: 'Large network of Rajasthan wheat growers sharing MSP updates.',
    },
    {
        id: 'c8', name: 'Karnataka Coffee and Spice Hub', isJoined: false,
        members: 1340, posts: 199,
        desc: 'Robusta and Arabica cultivation, spice intercropping and estate management for Coorg-Chikmagalur farmers.',
        state: 'Karnataka', tags: ['Coffee', 'Spice', 'Coorg'],
        rules: 'No MLM or agri-input promotions.',
        about: 'Plantation crop farmers in Coorg and Chikmagalur.',
    },
    {
        id: 'c9', name: 'Punjab Paddy Community', isJoined: false,
        members: 6384, posts: 1123,
        desc: 'Rice cultivation tech, stubble management solutions and kharif market for Punjab farmers.',
        state: 'Punjab', tags: ['Paddy', 'Rice', 'Punjab'],
        rules: 'No burning promotion posts.',
        about: 'Punjab\'s largest paddy farmer group.',
    },
    {
        id: 'c10', name: 'Agri-Drone and Precision Tech', isJoined: false,
        members: 3119, posts: 476,
        desc: 'Drone spraying, IoT soil sensors, satellite imagery and digital agri tools for progressive farmers.',
        state: 'All India', tags: ['Technology', 'Drone', 'Precision'],
        rules: 'Must have hands-on experience to post reviews.',
        about: 'India\'s precision agriculture innovation community.',
    },
    {
        id: 'c11', name: 'Onion Farmers - Nashik', isJoined: false,
        members: 2208, posts: 317,
        desc: 'Onion price tracking, storage tips and export market insights for Nashik and Solapur farmers.',
        state: 'Maharashtra', tags: ['Onion', 'Nashik', 'Export'],
        rules: 'Price data must include date and market name.',
        about: 'Real-time onion market alerts for Nashik region.',
    },
    {
        id: 'c12', name: 'Floriculture and Horticulture India', isJoined: false,
        members: 1567, posts: 234,
        desc: 'Rose, marigold, polyhouse vegetables and exotic flower cultivation across India.',
        state: 'All India', tags: ['Flowers', 'Polyhouse', 'Horticulture'],
        rules: 'Include climate zone in crop posts.',
        about: 'Flower and protected cultivation farmers across India.',
    },
    {
        id: 'c13', name: 'Andhra Chilli and Spice Growers', isJoined: false,
        members: 1877, posts: 289,
        desc: 'Guntur and Byadgi chilli variety management, drying and export for AP and Telangana farmers.',
        state: 'Andhra Pradesh', tags: ['Chilli', 'Spice', 'Andhra'],
        rules: 'Only verified price data from APMCs.',
        about: 'Chilli farmers in Guntur belt.',
    },
    {
        id: 'c14', name: 'Farmer Producer Organisations India', isJoined: false,
        members: 4431, posts: 612,
        desc: 'FPO formation, government schemes, collective bargaining and market linkage for farmer groups.',
        state: 'All India', tags: ['FPO', 'Cooperative', 'Policy'],
        rules: 'No individual scheme applications — only FPO-level discussion.',
        about: 'Supporting FPO leaders and members across India.',
    },
    {
        id: 'c15', name: 'Kisan Credit and Insurance Help', isJoined: false,
        members: 7102, posts: 892,
        desc: 'KCC, PMFBY crop insurance, bank loan guidance and financial literacy for all farmers.',
        state: 'All India', tags: ['Finance', 'Insurance', 'KCC'],
        rules: 'No unofficial lending promotions.',
        about: 'Helping farmers navigate credit and insurance systems.',
    },
];

export const JOINED_COMMUNITIES = ALL_COMMUNITIES.filter(c => c.isJoined);

// Mock posts for the 5 joined communities
export const MOCK_POSTS = [
    // c1: Maharashtra Cotton
    {
        id: 'post_1',
        author: { name: 'Ramesh Patil', username: 'ramesh.patil', credibility: 84 },
        community: { id: 'c1', name: 'Maharashtra Cotton Farmers' },
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        title: 'Pink bollworm pressure rising in Wardha — act before flowering',
        category: 'Information',
        tags: ['Cotton', 'Pest', 'Wardha'],
        body: 'Seeing 4-5 pink bollworm larvae per plant in my Wardha field. Spraying chlorpyriphos 20% EC at 2ml/L gave 78% control in one week. Anyone else observing similar in Amravati belt? Share your pheromone trap counts below.',
        likes: 47, dislikes: 3, isSaved: false,
        isLikedByUser: false, isDislikedByUser: false, isOwn: false,
        comments: [
            { id: 'cm1', author: 'Suresh Wankhede', text: 'Same here in Amravati. Trap count crossed 8 last week. Switched to spinosad.', likes: 12, isLikedByUser: false },
            { id: 'cm2', author: 'Priya Deshmukh', text: 'Adding NPV spray at evening helps a lot — reduced larva count by 60%.', likes: 8, isLikedByUser: false },
        ],
    },
    {
        id: 'post_2',
        author: { name: 'Anita Kulkarni', username: 'anita.k', credibility: 91 },
        community: { id: 'c1', name: 'Maharashtra Cotton Farmers' },
        date: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
        title: 'Cotton at Akola APMC — Rs.7,340/quintal today',
        category: 'Information',
        tags: ['Cotton', 'Mandi', 'Price'],
        body: 'Akola APMC closing rate: Superior grade Rs.7,340, medium Rs.6,980. Arrivals slightly lower at 4,200 quintal. Trend: steady for next 3 days, rain forecast may dip arrivals.',
        likes: 112, dislikes: 1, isSaved: false,
        isLikedByUser: false, isDislikedByUser: false, isOwn: false,
        comments: [
            { id: 'cm3', author: 'Manoj Jadhav', text: 'Yeotmal slightly higher at Rs.7,410 today.', likes: 6, isLikedByUser: false },
        ],
    },
    {
        id: 'post_3',
        author: { name: 'Dnyaneshwar Borde', username: 'dnyaneshwar', credibility: 76 },
        community: { id: 'c1', name: 'Maharashtra Cotton Farmers' },
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        title: 'Doubt: Why is my cotton developing hollow bolls?',
        category: 'Doubt',
        tags: ['Cotton', 'Boll', 'Doubt'],
        body: 'Saw 15-20% hollow bolls in my BT cotton plot. Irrigation done on time, soil test was perfect. Applied boron at 0.3% foliar 20 days ago. Any idea what is causing this?',
        likes: 23, dislikes: 0, isSaved: false,
        isLikedByUser: false, isDislikedByUser: false, isOwn: false,
        comments: [
            { id: 'cm4', author: 'Anita Kulkarni', text: 'Check your neem seed cake application — boron deficiency is common with excess N.', likes: 9, isLikedByUser: false },
            { id: 'cm5', author: 'Ramesh Patil', text: 'Also check for thrips damage at boll-setting stage.', likes: 7, isLikedByUser: false },
            { id: 'cm6', author: 'Kavitha Rao', text: 'I faced same issue — calcium foliar spray at 0.5% in 2 rounds solved it.', likes: 14, isLikedByUser: false },
        ],
    },
    // c2: Sugarcane
    {
        id: 'post_4',
        author: { name: 'Santosh Shelke', username: 'santosh.shelke', credibility: 88 },
        community: { id: 'c2', name: 'Sugarcane Growers - Kolhapur' },
        date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        title: 'Shahu Sugar Factory FRP confirmed at Rs.315/quintal — crush from Nov 20',
        category: 'Information',
        tags: ['Sugarcane', 'FRP', 'Kolhapur'],
        body: 'Shahu Sugar Factory Kolhapur has confirmed FRP of Rs.315/quintal for the 2025-26 season. Crushing begins Nov 20. Slot booking open at factory portal. Carry your 7/12 and Aadhaar.',
        likes: 89, dislikes: 2, isSaved: false,
        isLikedByUser: false, isDislikedByUser: false, isOwn: false,
        comments: [
            { id: 'cm7', author: 'Vijay Patil', text: 'Rajaram factory is offering Rs.316 for early delivery.', likes: 11, isLikedByUser: false },
        ],
    },
    {
        id: 'post_5',
        author: { name: 'Meena Mane', username: 'meena.mane', credibility: 72 },
        community: { id: 'c2', name: 'Sugarcane Growers - Kolhapur' },
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        title: 'My ratoon yield jumped 18% with trash mulching — sharing my experience',
        category: 'Story',
        tags: ['Sugarcane', 'Ratoon', 'Mulching'],
        body: 'After harvesting last November, I left the dry trash on the field instead of burning. Did 2-row gap filling and applied urea split 3 times. Ratoon yield went from 42 to 50 tonne/acre. Savings on irrigation too — 2 rounds less than previous year.',
        likes: 136, dislikes: 4, isSaved: false,
        isLikedByUser: false, isDislikedByUser: false, isOwn: false,
        comments: [
            { id: 'cm8', author: 'Santosh Shelke', text: 'Great results Meena! Did you use any biostimulant after harvest?', likes: 5, isLikedByUser: false },
            { id: 'cm9', author: 'Arun Gaikwad', text: 'How much urea total? I usually do 2 splits.', likes: 3, isLikedByUser: false },
        ],
    },
    // c3: Dairy
    {
        id: 'post_6',
        author: { name: 'Praful Jadhav', username: 'praful.j', credibility: 80 },
        community: { id: 'c3', name: 'Pune Dairy and Livestock Tech' },
        date: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
        title: 'Gir cow vs HF cross — milk fat comparison from my 18-month trial',
        category: 'Information',
        tags: ['Dairy', 'Gir Cow', 'Milk Fat'],
        body: 'I ran an 18-month comparison: 6 Gir cows avg 9L/day at 5.2% fat. 6 HF crosses avg 18L/day at 3.6% fat. For A2 premium market, Gir gives 40% better revenue per litre. For cooperative bulk supply, HF cross wins. Depends on your market linkage.',
        likes: 79, dislikes: 5, isSaved: false,
        isLikedByUser: false, isDislikedByUser: false, isOwn: false,
        comments: [
            { id: 'cm10', author: 'Sunita Thorat', text: 'Excellent analysis Praful! What feed mixture for Gir?', likes: 17, isLikedByUser: false },
            { id: 'cm11', author: 'Dr. Rahul Vaidya', text: 'Consider Sahiwal also — similar fat% but better disease resistance in hot climate.', likes: 22, isLikedByUser: false },
        ],
    },
    {
        id: 'post_7',
        author: { name: 'Sunita Thorat', username: 'sunita.t', credibility: 68 },
        community: { id: 'c3', name: 'Pune Dairy and Livestock Tech' },
        date: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
        title: 'Mastitis outbreak in my shed — what worked for us',
        category: 'Story',
        tags: ['Dairy', 'Mastitis', 'Animal Health'],
        body: '3 cows in my 15-cow herd got clinical mastitis last month. Vet prescribed Amoxicillin + anti-inflammatory for 5 days. Also did teat dipping with iodine 0.5% after every milking. All 3 recovered with no dry-up needed. Key: early detection using CMT paddle.',
        likes: 54, dislikes: 1, isSaved: false,
        isLikedByUser: false, isDislikedByUser: false, isOwn: false,
        comments: [
            { id: 'cm12', author: 'Praful Jadhav', text: 'CMT paddle is a must-have. Costs Rs.120 and saves lakhs.', likes: 9, isLikedByUser: false },
        ],
    },
    // c4: Organic
    {
        id: 'post_8',
        author: { name: 'Kavitha Rao', username: 'kavitha.r', credibility: 95 },
        community: { id: 'c4', name: 'Organic Farming India' },
        date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        title: 'PGS-India certification — complete process step-by-step (2025 update)',
        category: 'Information',
        tags: ['Organic', 'PGS', 'Certification'],
        body: '1. Register on pgsindia.net — free, takes 10 min.\n2. Form a local group of 5+ farmers.\n3. Peer inspection every 6 months — use official checklist.\n4. Submit group certificate application with inspection reports.\n5. Get PGS-Green certificate in 45-60 days.\nBenefit: NAFED and e-NAM recognise this. No Rs.50,000 third-party cost!',
        likes: 203, dislikes: 2, isSaved: false,
        isLikedByUser: false, isDislikedByUser: false, isOwn: false,
        comments: [
            { id: 'cm13', author: 'Ravi Naik', text: 'Can a single farmer apply or group mandatory?', likes: 14, isLikedByUser: false },
            { id: 'cm14', author: 'Kavitha Rao', text: 'Minimum 5 farmers in a local group. But can apply individually under NPOP.', likes: 18, isLikedByUser: false },
            { id: 'cm15', author: 'Amar Singh', text: 'Sharing this to our FPO WhatsApp. Thank you Kavitha!', likes: 7, isLikedByUser: false },
        ],
    },
    {
        id: 'post_9',
        author: { name: 'Ravi Naik', username: 'ravi.naik', credibility: 77 },
        community: { id: 'c4', name: 'Organic Farming India' },
        date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        title: 'Jeevamrut recipe that doubled my earthworm count in 60 days',
        category: 'Information',
        tags: ['Organic', 'Jeevamrut', 'Soil Health'],
        body: 'Recipe per 200L drum:\n- 10kg fresh cow dung\n- 5-10L cow urine\n- 2kg jaggery\n- 2kg besan\n- Handful of soil from banyan tree root\nFill with water. Stir daily for 7 days. Dilute 1:10 and drip irrigate.\nEarthworm count went from 8 to 19 per 30x30cm plot in 60 days.',
        likes: 178, dislikes: 3, isSaved: false,
        isLikedByUser: false, isDislikedByUser: false, isOwn: false,
        comments: [
            { id: 'cm16', author: 'Kavitha Rao', text: 'I add 500g neem powder too — helps with nematodes.', likes: 21, isLikedByUser: false },
        ],
    },
    // c5: Nashik Grapes
    {
        id: 'post_10',
        author: { name: 'Arun Gaikwad', username: 'arun.g', credibility: 86 },
        community: { id: 'c5', name: 'Nashik Grape and Wine Growers' },
        date: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        title: 'Grapes export to Netherlands — documentation checklist 2025',
        category: 'Information',
        tags: ['Grapes', 'Export', 'Nashik'],
        body: 'For Netherlands market (most common for Nashik grapes):\n- Phytosanitary certificate from APEDA\n- MRL residue test report (NABL lab, 7-10 days)\n- Cold chain pre-cooling to 0-1 degree C before loading\n- Grading: 16-22mm, 50g+ bunches\n- Pack in 500g clamshell or 4.5kg master carton\nTimeline: 22-24 days by sea.',
        likes: 91, dislikes: 1, isSaved: false,
        isLikedByUser: false, isDislikedByUser: false, isOwn: false,
        comments: [
            { id: 'cm17', author: 'Neha Tupe', text: 'Which NABL lab do you use near Nashik?', likes: 8, isLikedByUser: false },
            { id: 'cm18', author: 'Arun Gaikwad', text: 'NIFTEM Nashik or SGS Pune — both accepted by EU.', likes: 12, isLikedByUser: false },
        ],
    },
    {
        id: 'post_11',
        author: { name: 'Neha Tupe', username: 'neha.t', credibility: 74 },
        community: { id: 'c5', name: 'Nashik Grape and Wine Growers' },
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        title: 'First kniffen-trained plot — 3-year journey and lessons',
        category: 'Story',
        tags: ['Grapes', 'Nashik', 'Training System'],
        body: 'Switched from traditional bower to kniffen system on 0.8 acre in 2022. Year 1: setup cost Rs.85,000. Year 2: 30% lower spray due to better aeration, yield 7.2 tonne. Year 3 (current): 9.1 tonne, export grade 68%. Total ROI positive by year 3. Happy to share layout diagrams.',
        likes: 67, dislikes: 0, isSaved: false,
        isLikedByUser: false, isDislikedByUser: false, isOwn: false,
        comments: [
            { id: 'cm19', author: 'Arun Gaikwad', text: 'Please share the layout! Very impressive results.', likes: 6, isLikedByUser: false },
        ],
    },
];

// Saved posts - persisted in sessionStorage
const SAVED_KEY = 'agrow_saved_posts';

export function getSavedIds() {
    try { return JSON.parse(sessionStorage.getItem(SAVED_KEY) || '[]'); }
    catch { return []; }
}

export function toggleSaved(postId) {
    const saved = getSavedIds();
    const idx = saved.indexOf(postId);
    if (idx === -1) saved.push(postId); else saved.splice(idx, 1);
    sessionStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    return saved.includes(postId);
}

export function isSaved(postId) {
    return getSavedIds().includes(postId);
}
