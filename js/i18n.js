/* ============================================
   ZAIN WATER HEATERS - i18n ENGINE
   Languages: English (en), Arabic (ar), Kurdish Sorani (ku)
   ============================================ */

'use strict';

const RTL_LANGS = ['ar', 'ku'];

// ===================== STATIC UI STRINGS =====================
const I18N = {
  en: {
    nav_products: 'Products', nav_catalogue: 'Catalogue', nav_about: 'About', nav_location: 'Location',
    hero_tag: '🇮🇶 Made for Iraq', hero_line2: 'HEATERS', hero_line3: 'Industrial Water Heaters',
    hero_sub: 'Premium industrial water heaters engineered for Iraq\'s climate. Two legendary categories — Zain (Galvanized) and Grohee (Glass-lined) — from 50 to 250 litres.',
    hero_btn_explore: 'Explore Products', hero_btn_about: 'About Us →', hero_scroll: 'Scroll',
    cat_label: 'Our Categories', cat_title: 'Two Premium Lines',
    cat_sub: 'Choose between our flagship categories. Each engineered with precision for long-lasting performance in Iraqi households.',
    cat1_badge: 'Category 01', cat1_name: 'ZAIN', cat1_type: 'Galvanized',
    cat1_desc: 'Galvanized steel water heaters, built tough for Iraqi conditions. Available in vertical and horizontal wall-mount configurations.',
    cat1_cta: 'View All Zain Products →',
    cat2_badge: 'Category 02', cat2_name: 'GROHEE KHALEEJ', cat2_type: 'Glass-lined',
    cat2_desc: 'Premium glass-lined water heaters for superior corrosion resistance and longevity. Available in vertical, horizontal and ceiling-mount.',
    cat2_cta: 'View All Grohee Products →',
    tag_vertical: 'Vertical', tag_horizontal: 'Horizontal', tag_ceiling: 'Ceiling ✦',
    catalogue_label: 'Full Catalogue', catalogue_title: 'All Products',
    catalogue_sub: 'Browse our complete range. Filter by brand, capacity, or mounting style.',
    filter_all: 'All Products', filter_zain: 'ZAIN — Galvanized', filter_grohee: 'GROHEE KHALEEJ — Glass-lined',
    filter_vertical: 'Vertical', filter_horizontal: 'Horizontal', filter_ceiling: 'Ceiling',
    about_label: 'About Us', about_title: 'Built for Iraq\'s<br/>Toughest Conditions',
    about_p1: 'Zain is Iraq\'s trusted supplier of industrial water heaters. We carry two premium product lines designed for the demanding requirements of Iraqi households, hotels, and commercial buildings.',
    about_p2: 'Our <strong style="color:var(--accent)">Zain (Galvanized)</strong> range offers galvanized steel tanks in all sizes from 50–250L. Our <strong style="color:var(--grohee-color)">Grohee (Glass-lined)</strong> premium line features glass-lined tanks with superior longevity.',
    stat1_label: 'Available Capacities', stat2_label: 'Premium Product Lines', stat3_label: 'Mounting Options', stat4_label: 'Max Warranty',
    feat1_title: 'High Performance Heating', feat1_desc: 'Engineered for fast heat-up times even in extreme cold, using premium elements.',
    feat2_title: 'Corrosion Resistant', feat2_desc: 'Galvanized and glass-lined interiors protect against Iraq\'s hard water.',
    feat3_title: 'Energy Efficient Insulation', feat3_desc: 'Thick polyurethane foam insulation keeps water hot longer, reducing energy costs.',
    location_label: 'Find Us', location_title: 'Visit Our<br/>Showrooms',
    location_sub: 'Come see our full catalogue in person. Our team is ready to help you choose the right water heater for your needs.',
    loc_address: 'Address', loc_phone: 'Phone', loc_hours: 'Working Hours', loc_email: 'Email',
    map_add_embed: 'Add your Google Maps embed here',
    footer_tagline: 'Iraq\'s trusted industrial water heater supplier. Two premium lines, seven sizes, for every home and business.',
    footer_tagline_sub: 'Industrial Water Heaters — Iraq',
    footer_products_h: 'Products', footer_company_h: 'Company',
    footer_about: 'About Us', footer_showroom: 'Showroom', footer_contact: 'Contact',
    footer_rights: 'ZAIN Water Heaters — Baghdad, Iraq',
    footer_p_zain: 'Zain — Galvanized', footer_p_grohee: 'Grohee — Glass-lined', footer_p_range: '50–250 Litres',
    footer_p_vertical: 'Vertical Units', footer_p_horizontal: 'Horizontal Units', footer_p_ceiling: 'Ceiling Units',
    view_details: 'View Details', spec_capacity: 'Capacity', spec_type: 'Type', spec_mount: 'Mount',
    spec_brand: 'Brand', spec_mounting: 'Mounting', litre: 'Litre',
    price_label: 'Price', price_on_request: 'Price on request', price_starts_from: 'Starting from',
    coming_soon: 'Coming Soon', new_branch: 'New Branch',
    whatsapp_message: "Hi Zain, I'm interested in your water heaters. Can you help me?",
    modal_visit: 'Visit Showroom', modal_back: 'Back',
  },
  ar: {
    nav_products: 'المنتجات', nav_catalogue: 'الكتالوج', nav_about: 'من نحن', nav_location: 'الموقع',
    hero_tag: '🇮🇶 صُنع للعراق', hero_line2: 'سخانات', hero_line3: 'سخانات المياه الصناعية',
    hero_sub: 'سخانات مياه صناعية فاخرة مصممة خصيصاً لمناخ العراق. فئتان أسطوريتان — زين (مغلون) وغروهي (مزجج) — بسعات من 50 إلى 250 لتر.',
    hero_btn_explore: 'استكشف المنتجات', hero_btn_about: 'من نحن ←', hero_scroll: 'تمرير',
    cat_label: 'فئاتنا', cat_title: 'خطان فاخران',
    cat_sub: 'اختر بين فئاتنا الرئيسية. كل منتج مصمم بدقة لأداء طويل الأمد في المنازل العراقية.',
    cat1_badge: 'الفئة 01', cat1_name: 'زين', cat1_type: 'مغلون',
    cat1_desc: 'سخانات مياه من الصلب المغلون، مصممة لتحمل الظروف العراقية. متوفرة بتركيب عمودي وأفقي جداري.',
    cat1_cta: 'عرض جميع منتجات زين ←',
    cat2_badge: 'الفئة 02', cat2_name: 'غروهي الخليج', cat2_type: 'مزجج',
    cat2_desc: 'سخانات مياه فاخرة مزججة بمقاومة تآكل فائقة وعمر افتراضي أطول. متوفرة بتركيب عمودي وأفقي وسقفي.',
    cat2_cta: 'عرض جميع منتجات غروهي الخليج ←',
    tag_vertical: 'عمودي', tag_horizontal: 'أفقي', tag_ceiling: 'سقفي ✦',
    catalogue_label: 'الكتالوج الكامل', catalogue_title: 'جميع المنتجات',
    catalogue_sub: 'تصفح مجموعتنا الكاملة. صنّف حسب الماركة أو السعة أو طريقة التركيب.',
    filter_all: 'جميع المنتجات', filter_zain: 'زين — مغلون', filter_grohee: 'غروهي الخليج — مزجج',
    filter_vertical: 'عمودي', filter_horizontal: 'أفقي', filter_ceiling: 'سقفي',
    about_label: 'من نحن', about_title: 'مصمم لأصعب<br/>ظروف العراق',
    about_p1: 'زين هي المورد الموثوق لسخانات المياه الصناعية في العراق. نوفر خطي إنتاج فاخرين مصممين لتلبية متطلبات المنازل والفنادق والمباني التجارية العراقية.',
    about_p2: 'تقدم فئة <strong style="color:var(--accent)">زين (مغلون)</strong> خزانات من الصلب المغلون بجميع الأحجام من 50 إلى 250 لتر. وتتميز فئة <strong style="color:var(--grohee-color)">غروهي (مزجج)</strong> الفاخرة بخزانات مزججة بعمر افتراضي أطول.',
    stat1_label: 'سعات متوفرة', stat2_label: 'خطوط إنتاج فاخرة', stat3_label: 'طرق تركيب', stat4_label: 'أقصى ضمان',
    feat1_title: 'تسخين عالي الأداء', feat1_desc: 'مصمم لتسخين سريع حتى في البرد الشديد، باستخدام عناصر تسخين فاخرة.',
    feat2_title: 'مقاومة للتآكل', feat2_desc: 'الأسطح المغلونة والمزججة تحمي من مياه العراق العسرة.',
    feat3_title: 'عزل موفر للطاقة', feat3_desc: 'عزل فوم بولي يوريثان سميك يحافظ على حرارة الماء لفترة أطول، مما يقلل استهلاك الطاقة.',
    location_label: 'موقعنا', location_title: 'زوروا<br/>صالات العرض',
    location_sub: 'تعالوا لمشاهدة كتالوجنا الكامل عن قرب. فريقنا جاهز لمساعدتكم في اختيار السخان المناسب لاحتياجاتكم.',
    loc_address: 'العنوان', loc_phone: 'الهاتف', loc_hours: 'ساعات العمل', loc_email: 'البريد الإلكتروني',
    map_add_embed: 'أضف رابط خرائط غوغل هنا',
    footer_tagline: 'المورد الموثوق لسخانات المياه الصناعية في العراق. خطان فاخران وسبعة أحجام، لكل منزل ومنشأة تجارية.',
    footer_tagline_sub: 'سخانات المياه الصناعية — العراق',
    footer_products_h: 'المنتجات', footer_company_h: 'الشركة',
    footer_about: 'من نحن', footer_showroom: 'صالة العرض', footer_contact: 'اتصل بنا',
    footer_rights: 'سخانات زين — بغداد، العراق',
    footer_p_zain: 'زين — مغلون', footer_p_grohee: 'غروهي الخليج — مزجج', footer_p_range: '50–250 لتر',
    footer_p_vertical: 'وحدات عمودية', footer_p_horizontal: 'وحدات أفقية', footer_p_ceiling: 'وحدات سقفية',
    view_details: 'عرض التفاصيل', spec_capacity: 'السعة', spec_type: 'النوع', spec_mount: 'التركيب',
    spec_brand: 'الماركة', spec_mounting: 'طريقة التركيب', litre: 'لتر',
    price_label: 'السعر', price_on_request: 'السعر عند الطلب', price_starts_from: 'يبدأ من',
    coming_soon: 'قريباً', new_branch: 'فرع جديد',
    whatsapp_message: 'مرحباً زين، أنا مهتم بسخانات المياه لديكم. هل يمكنكم مساعدتي؟',
    modal_visit: 'زيارة صالة العرض', modal_back: 'رجوع',
  },
  ku: {
    nav_products: 'بەرهەمەکان', nav_catalogue: 'کاتالۆگ', nav_about: 'دەربارەمان', nav_location: 'شوێن',
    hero_tag: '🇮🇶 بۆ عێراق دروستکراوە', hero_line2: 'گەرمکەرەکان', hero_line3: 'گەرمکەری ئاوی پیشەسازی',
    hero_sub: 'گەرمکەری ئاوی پیشەسازی بەکوالیتی بەرز، گونجاو لەگەڵ کەشوهەوای عێراق. دوو پۆلی ناودار — زەین (گالڤانایز) و گروهی (شووشەیی) — لە 50 بۆ 250 لیتر.',
    hero_btn_explore: 'بەرهەمەکان ببینە', hero_btn_about: 'دەربارەمان ←', hero_scroll: 'خلیسکاندن',
    cat_label: 'پۆلەکانمان', cat_title: 'دوو هێڵی تایبەت',
    cat_sub: 'یەکێک لە پۆلە سەرەکییەکانمان هەڵبژێرە. هەریەکە بە وردی دیزاین کراوە بۆ کارایی درێژخایەن لە ماڵی عێراقی.',
    cat1_badge: 'پۆلی 01', cat1_name: 'زەین', cat1_type: 'گالڤانایز',
    cat1_desc: 'گەرمکەری ئاو لە پۆڵای گالڤانایز، بۆ بەرگری لە بارودۆخی عێراق. بە شێوازی ڕاوەستاو و شاخدار بەردەستە.',
    cat1_cta: 'هەموو بەرهەمەکانی زەین ببینە ←',
    cat2_badge: 'پۆلی 02', cat2_name: 'گروهی خەلیج', cat2_type: 'شووشەیی',
    cat2_desc: 'گەرمکەری ئاوی شووشەیی تایبەت، بەرگری بەهێز لە زەنگاربوون و تەمەنێکی درێژتر. بە شێوازی ڕاوەستاو، شاخدار و بەخانوو بەردەستە.',
    cat2_cta: 'هەموو بەرهەمەکانی گروهی خەلیج ببینە ←',
    tag_vertical: 'ڕاوەستاو', tag_horizontal: 'شاخدار', tag_ceiling: 'بەخانوو ✦',
    catalogue_label: 'کاتالۆگی تەواو', catalogue_title: 'هەموو بەرهەمەکان',
    catalogue_sub: 'کۆمەڵە بەرهەمە تەواوەکانمان ببینە. بەپێی مارک، بۆشایی یان شێوازی دانان فلتەری بکە.',
    filter_all: 'هەموو بەرهەمەکان', filter_zain: 'زەین — گالڤانایز', filter_grohee: 'گروهی خەلیج — شووشەیی',
    filter_vertical: 'ڕاوەستاو', filter_horizontal: 'شاخدار', filter_ceiling: 'بەخانوو',
    about_label: 'دەربارەمان', about_title: 'دروستکراوە بۆ سەختترین<br/>بارودۆخەکانی عێراق',
    about_p1: 'زەین دابینکەری متمانەپێکراوی گەرمکەری ئاوی پیشەسازی لە عێراقە. دوو هێڵی بەرهەمی تایبەتمان هەیە کە بۆ پێداویستی ماڵ، هۆتێل و بیناکانی بازرگانی عێراقی دیزاین کراون.',
    about_p2: 'هێڵی <strong style="color:var(--accent)">زەین (گالڤانایز)</strong> تانکی پۆڵای گالڤانایز دابین دەکات بە هەموو قەبارەکان لە 50 بۆ 250 لیتر. هێڵی تایبەتی <strong style="color:var(--grohee-color)">گروهی (شووشەیی)</strong> تانکی شووشەیی بە تەمەنێکی درێژتر پێشکەش دەکات.',
    stat1_label: 'قەبارەی بەردەست', stat2_label: 'هێڵی بەرهەمی تایبەت', stat3_label: 'شێوازی دانان', stat4_label: 'زۆرترین گەرەنتی',
    feat1_title: 'گەرمکردنی کارا', feat1_desc: 'بۆ گەرمکردنی خێرا تەنانەت لە سەرمای زۆریش، بە بەکارهێنانی ئیلیمێنتی تایبەت.',
    feat2_title: 'بەرگری لە زەنگار', feat2_desc: 'ڕووکاری گالڤانایز و شووشەیی بەرگری لە ئاوی سەختی عێراق دەکات.',
    feat3_title: 'دابینکردنی وزە', feat3_desc: 'دەوری فۆمی پۆلی یوریتان ئەستوور گەرمی ئاو درێژتر دەپارێزێت و خەرجی وزە کەم دەکاتەوە.',
    location_label: 'شوێنمان', location_title: 'سەردانی<br/>شوورومەکانمان بکە',
    location_sub: 'وەرن و کاتالۆگی تەواومان بە چاوی خۆتان ببینن. تیمەکەمان ئامادەیە یارمەتیتان بدات گەرمکەری گونجاو هەڵبژێرن.',
    loc_address: 'ناونیشان', loc_phone: 'ژمارەی مۆبایل', loc_hours: 'کاتژمێری کارکردن', loc_email: 'ئیمەیل',
    map_add_embed: 'لینکی گووگڵ مابس لێرە زیاد بکە',
    footer_tagline: 'دابینکەری متمانەپێکراوی گەرمکەری ئاوی پیشەسازی لە عێراق. دوو هێڵی تایبەت و حەوت قەبارە، بۆ هەموو ماڵ و بازرگانییەک.',
    footer_tagline_sub: 'گەرمکەری ئاوی پیشەسازی — عێراق',
    footer_products_h: 'بەرهەمەکان', footer_company_h: 'کۆمپانیا',
    footer_about: 'دەربارەمان', footer_showroom: 'شوورووم', footer_contact: 'پەیوەندی',
    footer_rights: 'گەرمکەری زەین — بەغدا، عێراق',
    footer_p_zain: 'زەین — گالڤانایز', footer_p_grohee: 'گروهی خەلیج — شووشەیی', footer_p_range: '50–250 لیتر',
    footer_p_vertical: 'یەکەی ڕاوەستاو', footer_p_horizontal: 'یەکەی شاخدار', footer_p_ceiling: 'یەکەی بەخانوو',
    view_details: 'وردەکاری ببینە', spec_capacity: 'بۆشایی', spec_type: 'جۆر', spec_mount: 'دانان',
    spec_brand: 'مارک', spec_mounting: 'شێوازی دانان', litre: 'لیتر',
    price_label: 'نرخ', price_on_request: 'نرخ لەسەر داواکاری', price_starts_from: 'دەستپێدەکات لە',
    coming_soon: 'بەم زووانە', new_branch: 'لقی نوێ',
    whatsapp_message: 'سڵاو زەین، ئەمن حەزم لە گەرمکەرەکانتان هەیە. دەتوانن یارمەتیم بدەن؟',
    modal_visit: 'سەردانی شوورووم بکە', modal_back: 'گەڕانەوە',
  },
};

// ===================== BRAND / ORIENTATION LABEL HELPERS =====================
const BRAND_NAME = { en: { zain: 'ZAIN', grohee: 'GROHEE KHALEEJ' }, ar: { zain: 'زين', grohee: 'غروهي الخليج' }, ku: { zain: 'زەین', grohee: 'گروهی خەلیج' } };
const BRAND_TYPE = { en: { zain: 'Galvanized', grohee: 'Glass-lined' }, ar: { zain: 'مغلون', grohee: 'مزجج' }, ku: { zain: 'گالڤانایز', grohee: 'شووشەیی' } };
const ORIENT_LABEL = {
  en: { vertical: 'Vertical', horizontal: 'Horizontal', ceiling: 'Ceiling' },
  ar: { vertical: 'عمودي', horizontal: 'أفقي', ceiling: 'سقفي' },
  ku: { vertical: 'ڕاوەستاو', horizontal: 'شاخدار', ceiling: 'بەخانوو' },
};
const MOUNT_LABEL = {
  en: { vertical: 'Floor', horizontal: 'Wall', ceiling: 'Ceiling' },
  ar: { vertical: 'أرضي', horizontal: 'جداري', ceiling: 'سقفي' },
  ku: { vertical: 'زەوی', horizontal: 'دیوار', ceiling: 'خانوو' },
};

// Feature bullet sets shared across all sizes of a brand+orientation combo
const FEATURE_SETS = {
  zain: {
    vertical: {
      en: ['Premium heat insulation', 'High-grade galvanized tank', 'Superior corrosion resistance', '5-year warranty'],
      ar: ['عازل حرارة متميز', 'صهر مغلون عالي الجودة', 'مقاومة تآكل فائقة', 'ضمان 5 سنوات'],
      ku: ['دەوری گەرمی تایبەت', 'تانکی گالڤانایزی کوالیتی بەرز', 'بەرگری بەهێز لە زەنگار', '5 ساڵ گەرەنتی'],
    },
    horizontal: {
      en: ['Easy wall mounting', 'High-grade galvanized tank', 'Space-saving design', '5-year warranty'],
      ar: ['تركيب جداري سهل', 'صهر مغلون عالي الجودة', 'موفر للمساحة', 'ضمان 5 سنوات'],
      ku: ['دانانی دیواری ئاسان', 'تانکی گالڤانایزی کوالیتی بەرز', 'دیزاینی بۆشایی کەم', '5 ساڵ گەرەنتی'],
    },
  },
  grohee: {
    vertical: {
      en: ['Premium glass-lined coating', 'Superior corrosion resistance', 'Excellent heat insulation', '7-year warranty'],
      ar: ['طلاء زجاجي فاخر', 'مقاومة تآكل فائقة', 'عازل حرارة ممتاز', 'ضمان 7 سنوات'],
      ku: ['ڕووکاری شووشەیی تایبەت', 'بەرگری بەهێز لە زەنگار', 'دەوری گەرمی نایاب', '7 ساڵ گەرەنتی'],
    },
    horizontal: {
      en: ['Premium glass-lined coating', 'Easy wall mounting', 'Space-saving design', '7-year warranty'],
      ar: ['طلاء زجاجي فاخر', 'تركيب جداري سهل', 'موفر للمساحة', 'ضمان 7 سنوات'],
      ku: ['ڕووکاری شووشەیی تایبەت', 'دانانی دیواری ئاسان', 'دیزاینی بۆشایی کەم', '7 ساڵ گەرەنتی'],
    },
    ceiling: {
      en: ['Ceiling-suspended mount', 'Premium glass-lined coating', 'Modern design', '7-year warranty'],
      ar: ['تعليق من السقف', 'طلاء زجاجي فاخر', 'تصميم حديث', 'ضمان 7 سنوات'],
      ku: ['هەڵواسراو لە خانوو', 'ڕووکاری شووشەیی تایبەت', 'دیزاینی مۆدێرن', '7 ساڵ گەرەنتی'],
    },
  },
};

// Language resolution order: explicit ?lang= in the URL (so the hreflang
// URLs in <head> actually serve different content, not just point at
// the same default render) > a returning visitor's saved choice > English.
function getLangFromURL() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('lang');
  return (fromUrl && I18N[fromUrl]) ? fromUrl : null;
}
let currentLang = getLangFromURL() || localStorage.getItem('zain_lang') || 'en';

const SEO_META = {
  en: { title: 'ZAIN — Industrial Water Heaters Iraq | سخانات المياه زين', description: 'Zain Water Heaters Iraq — Premium galvanized and glass-lined industrial water heaters. Zain & Grohee Khaleej brands, 50–250 litre capacity. Baghdad showroom.' },
  ar: { title: 'زين — سخانات المياه الصناعية في العراق', description: 'زين لسخانات المياه في العراق — سخانات مياه صناعية مغلونة ومزججة فاخرة. ماركتا زين وغروهي الخليج، من 50 إلى 250 لتر. صالة عرض بغداد.' },
  ku: { title: 'زەین — گەرمکەری ئاوی پیشەسازی لە عێراق', description: 'زەین بۆ گەرمکەری ئاو لە عێراق — گەرمکەری ئاوی پیشەسازی گالڤانایز و شووشەیی تایبەت. مارکی زەین و گروهی خەلیج، لە 50 بۆ 250 لیتر. شوورومی بەغدا.' },
};

function applySEOMeta() {
  const meta = SEO_META[currentLang] || SEO_META.en;
  document.title = meta.title;
  const descTag = document.querySelector('meta[name="description"]');
  if (descTag) descTag.setAttribute('content', meta.description);
}

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || '';
}

function applyStaticTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (!val) return;
    if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
    else el.textContent = val;
  });
  document.documentElement.lang = currentLang;
  document.documentElement.dir = RTL_LANGS.includes(currentLang) ? 'rtl' : 'ltr';
  document.body.classList.toggle('lang-rtl', RTL_LANGS.includes(currentLang));

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
  });
  applySEOMeta();
}

function setLanguage(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  localStorage.setItem('zain_lang', lang);
  // Reflect the choice in the URL (without adding a back-button entry for
  // every click) so the page is shareable/bookmarkable per language and
  // matches the hreflang URLs declared in <head>.
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url);
  applyStaticTranslations();
  // Re-render dynamic content that depends on language
  if (typeof buildProductCards === 'function') buildProductCards();
  if (typeof renderLocations === 'function') renderLocations();
  if (typeof renderCategoryPrices === 'function') renderCategoryPrices();
  if (typeof updateWhatsAppLink === 'function') updateWhatsAppLink();
  if (typeof initFilters === 'function') initFilters();
  document.dispatchEvent(new CustomEvent('zain:langchange', { detail: { lang } }));
}

function setupLangSwitcher() {
  document.querySelectorAll('[data-lang-switcher] .lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupLangSwitcher();
  applyStaticTranslations();
});
