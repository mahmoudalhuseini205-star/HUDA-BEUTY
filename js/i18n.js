/* Translations. Every user-visible string lives here — nothing hard-coded in index.html.
   Service order must match SERVICE_IMAGES in main.js. */

const i18n = {
  tr: {
    htmlLang: 'tr',
    dir: 'ltr',
    langToggleLabel: 'Dili Arapçaya çevir',
    langToggleText: 'عربي',

    'meta.title': 'Huda Görgel Saç — Kuaför & Gelin Güzelliği',
    'meta.description': 'Gelin hazırlığında uzman kuaför. Saç kesimi, boyama, röfle, keratin bakımı ve özel gün saçı. Randevu için WhatsApp.',

    'nav.services': 'Hizmetler',
    'nav.bridal': 'Gelin',
    'nav.gallery': 'Galeri',
    'nav.booking': 'Randevu',
    'nav.contact': 'İletişim',
    'nav.call': 'Telefonla ara',
    'a11y.skip': 'İçeriğe geç',
    'a11y.mainNav': 'Ana menü',
    'a11y.footerNav': 'Alt menü',

    'hero.kicker': 'Kuaför & Gelin Güzelliği',
    'hero.title': 'Huda Görgel Saç',
    'hero.tagline': 'Gelin hazırlığında uzman, saçınıza özenle.',
    'hero.cta': 'Randevu Al',
    'hero.cta2': 'Hizmetleri Gör',
    'hero.alt': 'Uzun, parlak kahverengi saçlı bir kadın',

    'services.title': 'Hizmetlerimiz',
    'services.sub': 'Her saç tipine özen, her randevuda aynı kalite.',
    'services.featured': 'Öne çıkan',
    'theme.toDark': 'Koyu temaya geç',
    'theme.toLight': 'Açık temaya geç',

    services: [
      { name: 'Gelin Hazırlığı', desc: 'Saç, makyaj ve prova dahil, gününüze özel eksiksiz hazırlık.', alt: 'İncili tokalarla toplanmış gelin saçı' },
      { name: 'Saç Kesimi', desc: 'Yüz hatlarınıza ve saç dokunuza göre şekillendirilmiş kesim.', alt: 'Kuaför makasla ıslak saç kesiyor' },
      { name: 'Saç Boyama', desc: 'Kapatma, ton değişimi ve doğal görünümlü renkler.', alt: 'Küllü sarı dalgalı boyalı saç' },
      { name: 'Röfle / Balyaj', desc: 'Yumuşak geçişli ışıltı, folyo veya serbest teknikle.', alt: 'Folyo ile röfle uygulaması' },
      { name: 'Keratin Bakımı', desc: 'Elektriklenmeyi azaltan, parlaklık veren düzleştirici bakım.', alt: 'Yıkama koltuğunda saç bakımı' },
      { name: 'Fön & Şekillendirme', desc: 'Hacimli, uzun süre kalıcı günlük fön ve şekil.', alt: 'Katlı kesim, hacimli fön' },
      { name: 'Topuz / Özel Gün Saçı', desc: 'Nişan, kına ve davetler için zarif topuz ve örgüler.', alt: 'Çiçekli tokalarla yapılmış topuz' },
      { name: 'Saç Bakımı / Maske', desc: 'Yıpranmış saça derinlemesine onarım ve nem.', alt: 'Saça bakım maskesi uygulanıyor' },
      { name: 'Makyaj', desc: 'Gündüz ve gece için doğal ya da belirgin makyaj.', alt: 'Göz makyajı uygulanıyor' }
    ],

    'bridal.kicker': 'Uzmanlık alanımız',
    'bridal.title': 'Gelin Hazırlığı',
    'bridal.body': 'Düğün gününüz tek bir gün — hazırlığı da öyle olmalı. Provadan son tokaya kadar saçınızı, makyajınızı ve zamanlamanızı birlikte planlıyoruz. Salonumuzda gelin ve yakınları için ayrı bir düzen kuruyoruz, böylece gün acele etmeden ilerliyor.',
    'bridal.cta': 'Gelin Randevusu Al',
    'bridal.alt': 'Örgülü, incili gelin saç modeli',

    'gallery.title': 'Galeri',
    'gallery.sub': 'Salonumuzdan çalışmalar.',
    gallery: [
      'Düz, dalgalı ve bukleli üç farklı saç dokusu',
      'Parlak, dalgalı kahverengi saç',
      'Balyaj sonrası taranan dalgalı saç',
      'Kuaför malzemeleri: makas, fırça, renk kartelası',
      'Duvaklı, örgülü taç model gelin saçı',
      'Uzun, düzleştirilmiş parlak saç'
    ],

    'booking.title': 'Randevu Al',
    'booking.sub': 'Formu doldurun, mesajınız WhatsApp üzerinden bize ulaşsın.',
    'booking.name': 'Ad Soyad',
    'booking.namePh': 'Adınız',
    'booking.phone': 'Telefon',
    'booking.phonePh': '05XX XXX XX XX',
    'booking.service': 'Hizmet',
    'booking.servicePh': 'Hizmet seçin',
    'booking.date': 'Tercih ettiğiniz tarih',
    'booking.time': 'Tercih ettiğiniz saat',
    'booking.submit': 'WhatsApp ile Gönder',
    'booking.note': 'Form göndermez — mesajınızı WhatsApp\'ta açar, onaylayıp siz gönderirsiniz.',

    'contact.title': 'İletişim',
    'contact.hours': 'Çalışma Saatleri',
    'contact.hoursValue': 'Pazartesi – Cumartesi: 08:00 – 20:00 · Pazar: Kapalı',
    'contact.phone': 'Telefon / WhatsApp',
    'contact.find': 'Bizi Bulun',
    'contact.maps': 'Google Haritalar\'da aç',
    'contact.mapTitle': 'Huda Görgel Saç salonunun harita üzerindeki konumu',
    'contact.follow': 'Takip Edin',
    'contact.instagram': 'Instagram\'da takip edin',
    'contact.tiktok': 'TikTok\'ta takip edin',

    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.logoAlt': 'Huda Görgel Saç logosu',

    'wa.aria': 'WhatsApp\'tan yazın',
    'wa.greeting': 'Merhaba, salonunuz hakkında bilgi almak istiyorum.',
    waTemplate: (d) =>
      `Merhaba, randevu almak istiyorum.\nAd: ${d.name}\nTelefon: ${d.phone}\nHizmet: ${d.service}\nTarih: ${d.date}\nSaat: ${d.time}`
  },

  ar: {
    htmlLang: 'ar',
    dir: 'rtl',
    langToggleLabel: 'التبديل إلى التركية',
    langToggleText: 'Türkçe',

    'meta.title': 'هدى كولكل للشعر — تصفيف وتجهيز عرائس',
    'meta.description': 'صالون متخصص بتجهيز العرائس. قص وصبغ الشعر، هايلايت، علاج بالكيراتين وتسريحات المناسبات. احجزي عبر واتساب.',

    'nav.services': 'الخدمات',
    'nav.bridal': 'العرائس',
    'nav.gallery': 'المعرض',
    'nav.booking': 'الحجز',
    'nav.contact': 'تواصلي معنا',
    'nav.call': 'اتصلي بنا',
    'a11y.skip': 'تخطي إلى المحتوى',
    'a11y.mainNav': 'القائمة الرئيسية',
    'a11y.footerNav': 'قائمة التذييل',

    'hero.kicker': 'تصفيف الشعر وتجهيز العرائس',
    'hero.title': 'هدى كولكل للشعر',
    'hero.tagline': 'خبرة في تجهيز العرائس، وعناية تليق بشعرك.',
    'hero.cta': 'احجزي موعدك',
    'hero.cta2': 'تصفّحي الخدمات',
    'hero.alt': 'امرأة بشعر بني طويل ولامع',

    'services.title': 'خدماتنا',
    'services.sub': 'عناية تناسب كل نوع شعر، وجودة ثابتة في كل موعد.',
    'services.featured': 'الأبرز',
    'theme.toDark': 'التبديل إلى الوضع الداكن',
    'theme.toLight': 'التبديل إلى الوضع الفاتح',

    services: [
      { name: 'تجهيز العرائس', desc: 'تجهيز كامل ليومك يشمل الشعر والمكياج والبروفة.', alt: 'تسريحة عروس مرفوعة مزيّنة باللؤلؤ' },
      { name: 'قص الشعر', desc: 'قصّة مدروسة تناسب ملامح وجهك وطبيعة شعرك.', alt: 'مصففة تقص شعراً مبللاً بالمقص' },
      { name: 'صبغ الشعر', desc: 'تغطية الشيب وتغيير اللون بدرجات طبيعية.', alt: 'شعر مصبوغ بدرجة أشقر رمادي متموج' },
      { name: 'هايلايت / باليج', desc: 'لمعة بتدرّج ناعم، بالحيدة أو بتقنية الباليج.', alt: 'تطبيق الهايلايت بورق الألمنيوم' },
      { name: 'علاج بالكيراتين', desc: 'علاج مُنعّم يقلّل التطاير ويمنح الشعر لمعاناً.', alt: 'غسل الشعر وعنايته على كرسي الصالون' },
      { name: 'تجفيف وتصفيف', desc: 'سشوار بكثافة وثبات يدوم طويلاً.', alt: 'قصّة مدرجة مع سشوار بكثافة' },
      { name: 'تسريحات المناسبات', desc: 'تسريحات وضفائر أنيقة للخطوبة والحنّة والحفلات.', alt: 'تسريحة مرفوعة بمشابك على شكل زهور' },
      { name: 'حمّامات كريم / ماسك', desc: 'ترطيب وإصلاح عميق للشعر المتضرر.', alt: 'وضع ماسك العناية على الشعر' },
      { name: 'مكياج', desc: 'مكياج ناعم أو قوي، للنهار وللسهرات.', alt: 'تطبيق مكياج العيون' }
    ],

    'bridal.kicker': 'اختصاصنا',
    'bridal.title': 'تجهيز العرائس',
    'bridal.body': 'يوم زفافك يوم واحد، والتحضير له يستحق العناية نفسها. من البروفة حتى آخر دبوس، نخطط معك للشعر والمكياج والتوقيت. ونخصّص في الصالون ركناً للعروس ومرافقاتها ليمرّ اليوم دون استعجال.',
    'bridal.cta': 'احجزي موعد العروس',
    'bridal.alt': 'تسريحة عروس مضفّرة مزيّنة باللؤلؤ',

    'gallery.title': 'المعرض',
    'gallery.sub': 'من أعمال الصالون.',
    gallery: [
      'ثلاثة أنواع شعر: ناعم، متموج، ومجعّد',
      'شعر بني لامع بتموجات',
      'تمشيط شعر متموج بعد الباليج',
      'أدوات التصفيف: مقص وفرشاة وكتالوج ألوان',
      'تسريحة عروس مضفّرة على شكل تاج مع طرحة',
      'شعر طويل ناعم ولامع'
    ],

    'booking.title': 'احجزي موعدك',
    'booking.sub': 'املئي النموذج وستصلنا رسالتك عبر واتساب.',
    'booking.name': 'الاسم الكامل',
    'booking.namePh': 'اسمك',
    'booking.phone': 'رقم الهاتف',
    'booking.phonePh': '05XX XXX XX XX',
    'booking.service': 'الخدمة',
    'booking.servicePh': 'اختاري الخدمة',
    'booking.date': 'التاريخ المفضّل',
    'booking.time': 'الوقت المفضّل',
    'booking.submit': 'أرسلي عبر واتساب',
    'booking.note': 'النموذج لا يُرسل بنفسه — يفتح رسالتك في واتساب لترسليها أنتِ.',

    'contact.title': 'تواصلي معنا',
    'contact.hours': 'ساعات العمل',
    'contact.hoursValue': 'الإثنين – السبت: 08:00 – 20:00 · الأحد: مغلق',
    'contact.phone': 'الهاتف / واتساب',
    'contact.find': 'موقعنا',
    'contact.maps': 'افتحي في خرائط جوجل',
    'contact.mapTitle': 'موقع صالون هدى كولكل على الخريطة',
    'contact.follow': 'تابعينا',
    'contact.instagram': 'تابعينا على إنستغرام',
    'contact.tiktok': 'تابعينا على تيك توك',

    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.logoAlt': 'شعار صالون هدى كولكل',

    'wa.aria': 'راسلينا على واتساب',
    'wa.greeting': 'مرحباً، أود الاستفسار عن خدمات الصالون.',
    waTemplate: (d) =>
      `مرحباً، أود حجز موعد.\nالاسم: ${d.name}\nالهاتف: ${d.phone}\nالخدمة: ${d.service}\nالتاريخ: ${d.date}\nالوقت: ${d.time}`
  }
};
