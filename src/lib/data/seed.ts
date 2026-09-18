import { Article, ScholarProfile, PodcastEpisode, VideoItem, AudioItem, PhotoAlbum, HegereStory, MemberRecord, Advertisement, ErrorReport } from '../types';

export const initialBreakingNews = [
  { id: '1', text: "Konfaransii Dhaabbata Ulamaa'ota Oromiyaa magaalaa Adaamaatti milkaa'inaan xumurame", link: '/news/ulama-oromiya-conference-adama', active: true },
  { id: '2', text: 'Tajaajila Masjiida Al-Aqsaa fi haala yeroo ilaalchisee ibsi miseensota addunyaa Islaamaa bahe', link: '/news/al-aqsa-statement', active: true },
  { id: '3', text: 'Aalam Media sagantaalee barnoota Qur’aanaa fi afaanoota addunyaa babal’isuuf qophii xumure', link: '/news/aalam-media-expansion', active: true },
  { id: '4', text: 'Barnoota Fiqhii fi Aqiidaa yeroo ammayyaa irratti xiyyeeffatu Aalam Podcast irratti dhiyaata', link: '/podcast', active: true }
];

export const initialArticles: Article[] = [
  {
    id: 'art-1',
    slug: 'aalam-media-official-launch-adama',
    category: 'Oduu Biyyoolessaa',
    headline: 'Miidiyaan Aalam Media Magaalaa Adaamaa Irraa Hawaasa Addunyaatiif Tamsaasa Isaa Jalqabe',
    subtitle: 'Madda oduu dhugaa, barnoota Islaamaa ammayyaa fi tajaajila hawaasummaa qulqullina olaanaa qabu kennuuf kutannoon hojiitti gale.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80',
      alt: 'Istaadiyoo Aalam Media Adaamaa',
      caption: 'Istaadiyoo fi wiirtuu odeeffannoo Aalam Media magaalaa Adaamaa',
      credit: 'Aalam Media Studio',
      source: 'Aalam Media Internal Press'
    },
    author: {
      name: 'Misbah Sheikh Husein',
      role: 'CEO & Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-09-15T09:30:00Z',
    updatedAt: '2026-09-15T11:00:00Z',
    content: `Magaalaan Adaamaa handhuura daldalaa, aadaa fi jireenya hawaasummaa Oromiyaa keessatti bakka bu'uuraa qabdi. Har'a Aalam Media bu'uura cimaa fi ammayyaa ta'e qabatee hawaasa bal'aa tajaajiluuf eebbifamee jira.

Dhaabbatichi ergaa isaa guddaa "Addunyaa Islaamummaan Miidhagde" jedhu bu'uureffachuun:
1. Oduu dhugaa fi sirrii ta'e walaba ta'ee gabaasuu
2. Barnoota Islaamaa (Qur'aana, Hadiisa, Fiqhii fi Aqiidaa) qulqullinaan dhiyeessuu
3. Seenaa fi aadaa Oromoo akkasumas seenaa Ulamaa'ota beekamoo dhalootaaf dabarsuu
4. Hawaasummaa fi wal-gargaarsa cimsuu irratti xiyyeeffata.

Hoggantuun dhaabbatichaa Misbah Sheikh Husein akka ibsetti, Aalam Media qulqullina teeknooloojii fi ogummaa oduutiin sadarkaa addunyaalessaatti dorgomaa ta'uuf qophii guutuu taasiseera.`,
    tags: ['AalamMedia', 'Adaamaa', 'OduuBiyyoolessaa', 'BarnootaIslaamaa', 'Miidiyaa'],
    isBreaking: true,
    isFeatured: true,
    language: 'om',
    status: 'PUBLISHED',
    reactions: { like: 142, love: 98, insightful: 45, respect: 88 },
    views: 3420
  },
  {
    id: 'art-2',
    slug: 'stars-of-islam-sheikh-talha-jafar',
    category: 'Seenaa Ulamaa’otaa',
    headline: 'Seenaa fi Gumaacha Sheikh Xalhaa Jaafar: Urjii Beekumsaa fi Falmaa Haqaati',
    subtitle:  "Biyya Wollootti kan dhalatan ulamaa'aan kabajamaan kun qooda guddaa barnoota Islaamaa fi aadaa Oromoof kennan qorannoon dhiyaate.",
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&auto=format&fit=crop&q=80',
      alt:  "Makaatabaa fi Kitaabban Ulamaa'otaa",
      caption: 'Kitaabban wabii fi barreeffamoota harkaa Sheikh Xalhaa Jaafar',
      credit: 'Waajjira Seenaa Aalam Media',
      source: 'Kuusaa Galmee Seenaa'
    },
    author: {
      name: 'Ustaz Ahmed Nur',
      role: 'Senior Islamic Researcher',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-09-14T14:00:00Z',
    updatedAt: '2026-09-14T14:00:00Z',
    content: `Seenaa ulamaa'ota biyya keenyaa keessatti maqaan Sheikh Xalhaa Jaafar akka urjii ifaa addatti calaqqisa. Isaan beekumsa fiqhii, aqiidaa fi afaan Arabaatiin qooda guddaa kan gumaachan yoo ta'u, dhaloota hedduu barsiisanii biyyaaf gumaachaniiru.

Aalam Media qophii addaa "Seenaa Ulamaa'otaa" jedhuun dhaloota ammaa fi seenaa kana wal-barsiisuuf tattaaffii bal'aa taasisaa jira.`,
    tags: ['Ulamaaota', 'Seenaa', 'Wollo', 'Beekumsa', 'AalamMedia'],
    isBreaking: false,
    isFeatured: true,
    language: 'om',
    status: 'PUBLISHED',
    reactions: { like: 210, love: 165, insightful: 82, respect: 195 },
    views: 5120
  },
  {
    id: 'art-3',
    slug: 'islamic-finance-and-halal-economy-growth',
    category: 'Oduu Addunyaalessaa',
    headline: 'Guddinni Faayinaansii Islaamaa Addunyaa Irratti Waggaa Waggaan Dhibbeentaa 12 Dabalaa Jira',
    subtitle:  "Biyyoonni hedduun sirna baankii fi faayinaansii qajeelfama Shari'aatin gaggeeffamu gara dinagdee isaaniitti dabalachaa jiru.",
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      alt: 'Wiirtuu Dinagdee Addunyaa',
      caption: 'Wiirtuu faayinaansii fi daldala addunyaalessaa',
      credit: 'International Financial Center',
      source: 'Global Islamic Economy Report'
    },
    author: {
      name: 'Dr. Faisal Abdulmalik',
      role: 'Economics Editor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-09-13T10:15:00Z',
    updatedAt: '2026-09-13T10:15:00Z',
    content: `Gabaasni dhiyeenya bahe akka mul'isutti, baankii fi inshuraansii daldala haqa qabeessaa fi dhabamsiisa dhala (riba) bu'uureffate daran babal'achaa jira. Kunis namoota amantaa Islaamaa qofa osoo hin taane, dinagdee tasgabbaa'aa fi amansiisaa barbaadaniif filannoo guddaa ta'eera.`,
    tags: ['Addunyaa', 'Faayinaansii', 'Dinagdee', 'Baankii'],
    isBreaking: false,
    isFeatured: false,
    language: 'om',
    status: 'PUBLISHED',
    reactions: { like: 94, love: 41, insightful: 67, respect: 53 },
    views: 2890
  },
  {
    id: 'art-4',
    slug: 'quran-reflection-surah-al-hujurat-unity',
    category: 'Barnoota Islaamaa',
    headline:  "Ilaalcha Qur'aanaa: Suuraa Al-Hujuraat fi Tokkummaa Hawaasa Addunyaa",
    subtitle: 'Nuti qomoo fi saboota adda addaa kan taasifamneef akka wal-beeknuufi wal-kabajnuuf malee akka wal-cunqursinuuf miti.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&auto=format&fit=crop&q=80',
      alt:  "Qur'aana Qulqulluu",
      caption:  "Qur'aana Qulqulluu fi barumsa safuu hawaasummaa",
      credit: 'Aalam Islamic Studio',
      source: 'Tafsiira Aalam Media'
    },
    author: {
      name: 'Sheikh Yusuf Abdi',
      role: 'Tafsir Specialist',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-09-12T08:00:00Z',
    updatedAt: '2026-09-12T08:00:00Z',
    content: `Suuraan Al-Hujuraat heera fi seera safuu hawaasummaa isa guddaadha. Namoota gidduutti wal-kabajuu, hamii dhiisuu, dhugaa qorachuu fi amanamummaa dursa kennuu barsiisa. Aalam Media qophii kanaan dhaloota haaraa amala gaarii fi safuudhaan ijaaruuf carraaqqii godha.`,
    tags: ['BarnootaIslaamaa', 'Tafsiira', 'Quraana', 'Tokkummaa'],
    isBreaking: false,
    isFeatured: false,
    language: 'om',
    status: 'PUBLISHED',
    reactions: { like: 312, love: 280, insightful: 120, respect: 290 },
    views: 6720
  },
  {
    id: 'art-5',
    slug: 'hegere-travel-harar-jugol-historical-wonders',
    category: 'Hegere (Imala)',
    headline: 'Hegere: Imala Misbah Sheikh Husein Gara Magaalaa Seena-Qabeettii Harar Jugol',
    subtitle: 'Dallaawwan seenaa, masjiidota durii dhibba tokkoo ol fi seenaa daldala fi Islaamummaa baha Afrikaa qorachuu.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1200&auto=format&fit=crop&q=80',
      alt: 'Magaalaa Harar Jugol',
      caption: 'Kallattii seenaa magaalaa Harar Jugol fi aadaa daawwannaatiin',
      credit: 'Hegere Media Expedition',
      source: 'Aalam Travel Doc'
    },
    author: {
      name: 'Misbah Sheikh Husein',
      role: 'CEO & Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-09-11T16:20:00Z',
    updatedAt: '2026-09-11T16:20:00Z',
    content: `Magaalaan Harar teessoo dhiifamaa, nagaa fi beekumsa Islaamaati. Sagantaa Hegereen iddoowwan seena qabeeyyii daawwachuun mudannoo fi faayidaa aadaa isaanii dhalootaaf dhiyeessina.`,
    tags: ['Hegere', 'Harar', 'Imala', 'Aadaa', 'Seenaa'],
    isBreaking: false,
    isFeatured: true,
    language: 'om',
    status: 'PUBLISHED',
    reactions: { like: 180, love: 140, insightful: 65, respect: 155 },
    views: 4200
  }
];

export const initialScholars: ScholarProfile[] = [
  {
    id: 'sch-1',
    name: 'Sheikh Xalhaa Jaafar',
    era: '1850 - 1936',
    title: 'Urjii Beekumsa Fiqhii fi Lallaba Islaamaa',
    bio: 'Biyya Wollootti kan dhalatan ulamaa’aa gurguddoo dhaloota hedduu qajeelchan, barreeffamoota harkaa fi qorannoo hedduu kan gumaachan.',
    keyContributions: [
      'Gumaacha sirna barnoota Madrassa ammayyeessuu',
      'Barreeffamoota Fiqhii fi Aqiidaa afaan Oromootiin hiikuu',
      "Nagaa fi tokkummaa hawaasaa bu'uureffachuu"
    ]
  },
  {
    id: 'sch-2',
    name: 'Sheikh Bakrii Saphalo',
    era: '1895 - 1980',
    title: 'Hayyuu Afaanii, Seenaa fi Beekumsa Islaamaa',
    bio: 'Hayyuu beekamaa fi barreessaa Oromoo kan qubee addaa kalaquun seenaa fi barnoota Islaamaa dhalootaaf dhiyeessan.',
    keyContributions: [
      'Kalaqa qubee addaa Oromoof hojjatan',
      'Kitaabban seenaa fi walaloo Islaamaa qindeessuu',
      'Miseensota dhaloota haaraaf daandii beekumsaa saaquu'
    ]
  },
  {
    id: 'sch-3',
    name: 'Sheikh Muhammad Rashaad Abdulle',
    era: '1934 - 2013',
    title:  "Gumaacha Hiika Qur'aanaa Afaan Oromoo Isa Duraa",
    bio:  "Qur'aana Guutuu Afaan Oromooti hiikuun gumaacha seenaa keessatti hin dagatamne kan galmeessan hayyuu addunyaalessaa.",
    keyContributions: [
      "Hiika Qur'aanaa guutuu Afaan Oromootiin maxxansiisuu",
      'Qophii raadiyoo fi barreeffamoota barnoota amantaa',
      "Qorannoo fi bu'uura afaan Oromoo ammayyaa"
    ]
  }
];

export const initialPodcasts: PodcastEpisode[] = [
  {
    id: 'pod-1',
    episodeNumber: 1,
    title: 'Addunyaa Ammayyaa fi Qulqullina Miidiyaa Islaamaa',
    guest: 'Ustaz Jamal Husein (Waliigala Barnoota Islaamaa)',
    host: 'Misbah Sheikh Husein',
    description:  "Miidiyaan ammayyaa akkamitti ergaa qajeelaa fi dhugaa hawaasa addunyaatiif qaqqabsiisuu akka danda'u xiinxala bal'aa dhiyaate.",
    date: '2026-09-14',
    youtubeId: 'AalamMedia-cc8lij',
    duration: '48:20',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
      alt: 'Aalam Podcast Studio',
      caption: 'Istaadiyoo Aalam Podcast Adaamaa',
      credit: 'Aalam Studio',
      source: 'Internal'
    }
  },
  {
    id: 'pod-2',
    episodeNumber: 2,
    title: 'Guddina Hawaasummaa fi Seenaa Aadaa Oromoo',
    guest: 'Obbo Kadiir Elemo (Qorataa Aadaa fi Seenaa)',
    host: 'Misbah Sheikh Husein',
    description: "Aadaan wal-kabajaa fi nagaa Oromoo akkamitti qajeelfama amantaa Islaamaatiin gabbate akka deeme qorannoo waliin laalamu.",
    date: '2026-09-08',
    youtubeId: 'AalamMedia-cc8lij',
    duration: '54:10',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80',
      alt: 'Aalam Podcast Microphone',
      caption: 'Qophii Podcast Aalam Media',
      credit: 'Aalam Studio',
      source: 'Internal'
    }
  }
];

export const initialVideos: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Gabaasa Guutuu: Eebba Dhaabbata Aalam Media Magaalaa Adaamaa',
    category: 'Latest Videos',
    youtubeEmbed: 'https://www.youtube.com/embed/@AalamMedia-cc8lij',
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80',
      alt: 'Eebba Aalam Media',
      caption: 'Sirna eebbaa fi tamsaasa jalqabaa',
      credit: 'Aalam Video Unit',
      source: 'Internal'
    },
    publishedAt: '2026-09-15',
    duration: '18:45'
  },
  {
    id: 'vid-2',
    title:  "Barnoota Qur'aanaa: Qaraatii fi Safuu Hawaasaa",
    category: 'Islamic Videos',
    youtubeEmbed: 'https://www.youtube.com/embed/@AalamMedia-cc8lij',
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=800&auto=format&fit=crop&q=80',
      alt:  "Barnoota Qur'aanaa",
      caption:  "Kutaa barnoota Qur'aanaa idilee",
      credit: 'Aalam Islamic Media',
      source: 'Internal'
    },
    publishedAt: '2026-09-12',
    duration: '26:10'
  },
  {
    id: 'vid-3',
    title: 'Hegere: Qorannoo Seenaa Masjiida Durii Negash',
    category: 'Interviews',
    youtubeEmbed: 'https://www.youtube.com/embed/@AalamMedia-cc8lij',
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&auto=format&fit=crop&q=80',
      alt: 'Masjiida Negash',
      caption: 'Masjiida jalqabaa seenaa Afrikaa Negash',
      credit: 'Hegere Travel Team',
      source: 'Internal'
    },
    publishedAt: '2026-09-05',
    duration: '32:00'
  }
];

export const initialAudios: AudioItem[] = [
  {
    id: 'aud-1',
    title: 'Qajeelfama Jireenya Gaarii fi Amala Safu-Qabeessa',
    category: 'Islamic Lectures',
    speaker: 'Ustaz Ahmed Nur',
    audioUrl: '/uploads/audio-lecture-1.mp3',
    duration: '35:20',
    publishedAt: '2026-09-14'
  },
  {
    id: 'aud-2',
    title: 'Gabaasa Oduu Sagalee: Odeeffannoo Biyyoolessaa fi Addunyaa',
    category: 'News Audio',
    speaker: 'Aalam News Desk',
    audioUrl: '/uploads/audio-news-1.mp3',
    duration: '14:40',
    publishedAt: '2026-09-15'
  },
  {
    id: 'aud-3',
    title:  "Qaraatii Qur'aanaa: Suuraa Yaasiin fi Al-Rahmaan",
    category: 'Qur’anic Recitation',
    speaker: 'Qari Abdurrahmaan Ali',
    audioUrl: '/uploads/audio-quran-1.mp3',
    duration: '22:15',
    publishedAt: '2026-09-10'
  }
];

export const initialAlbums: PhotoAlbum[] = [
  {
    id: 'alb-1',
    title: 'Istaadiyoo fi Garee Miidiyaa Aalam Media Adaamaa',
    event: 'Eebba Istaadiyoo fi Tamsaasa Jalqabaa',
    date: '2026-09-15',
    location: 'Adaamaa, Oromiyaa',
    caption: 'Istaadiyoo fi meeshaalee teeknooloojii ol-aanaa Aalam Media ittiin hojjetu',
    photographer: 'Aalam Media Photo Unit',
    category: 'Media Studio',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
      alt: 'Studio Aalam Media',
      caption: 'Wiirtuu tamsaasa Aalam Media',
      credit: 'Aalam Media Studio',
      source: 'Internal'
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
        alt: 'Istaadiyoo Sagalee fi Viidiyoo',
        caption: 'Istaadiyoo ammayyaa Adaamaa',
        credit: 'Aalam Media',
        source: 'Internal'
      },
      {
        url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
        alt: 'Qophii Podcast',
        caption: 'Bakka waraabbii Podcast',
        credit: 'Aalam Media',
        source: 'Internal'
      },
      {
        url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80',
        alt: 'Kutaa Gulaalaa Oduu',
        caption: 'Garee gulaalaa fi gaazexeessitootaa',
        credit: 'Aalam Media',
        source: 'Internal'
      }
    ]
  },
  {
    id: 'alb-2',
    title: 'Aadaa fi Masjiidota Seena-Qabeeyyii',
    event: 'Imala Daawwannaafi Qorannoo',
    date: '2026-09-10',
    location: 'Baha Oromiyaa',
    caption: 'Ijaarsa bareedina masjiidota fi aadaa Oromoo',
    photographer: 'Hegere Expedition',
    category: 'Aadaa fi Seenaa',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&auto=format&fit=crop&q=80',
      alt: 'Masjiida Bareedaa',
      caption: 'Masjiida seena qabeessa',
      credit: 'Hegere Team',
      source: 'Internal'
    },
    photos: []
  }
];

export const initialHegere: HegereStory[] = [
  {
    id: 'heg-1',
    title: 'Imala Hundeeffamaa: Bakka Seenaa fi Aadaa Oromiyaa Qorachuu',
    destination: 'Harar, Bale fi Adaamaa',
    date: '2026-09-10',
    summary: 'Hundeeffamaan Aalam Media Misbah Sheikh Husein iddoowwan seena qabeeyyii daawwachuun qorannoo fi waraabbii qophii daawwannaa taasise.',
    founderNotes:  "Aadaan keenya gabbataadha; Islaamummaan miidhagina dabalataaf. Bakka hunda deemnee dhugaa jiru hawaasa addunyaaf mul'isuun gahee keenya.",
    coverImage: {
      url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1000&auto=format&fit=crop&q=80',
      alt: 'Imala Hegere Misbah Sheikh Husein',
      caption: 'Misbah Sheikh Husein imala Hegere irratti',
      credit: 'Aalam Hegere Team',
      source: 'Internal'
    },
    gallery: []
  }
];

export const initialAds: Advertisement[] = [
  {
    id: 'ad-1',
    advertiserName: 'Dhaabbata Takaaful fi Inshuraansii Islaamaa',
    placement: 'Homepage',
    image: {
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
      alt: 'Takaaful Inshuraansii',
      caption:  "Inshuraansii haqa qabeessa qajeelfama Shari'aa eeggate",
      credit: 'Takaaful Adama',
      source: 'Sponsored'
    },
    link: '#',
    startDate: '2026-09-01',
    endDate: '2026-10-31',
    status: 'ACTIVE',
    impressions: 4850,
    clicks: 310
  }
];

export const initialMembers: MemberRecord[] = [
  {
    id: 'mem-1',
    fullName: 'Hamza Abdurazak',
    email: 'hamza.abdu@example.com',
    phone: '0911223344',
    city: 'Adaamaa',
    country: 'Itoophiyaa',
    preferredLanguage: 'Afaan Oromoo',
    membershipType: 'Supporting Member',
    areaOfInterest: 'Miidiyaa fi Qorannoo Barnoota Islaamaa',
    message: 'Aalam Media cinaa dhaabbachuun gumaacha kiyya gumaachuun barbaada.',
    status: 'ACTIVE',
    createdAt: '2026-09-15T10:00:00Z'
  },
  {
    id: 'mem-2',
    fullName: 'Sumayya Mohammed',
    email: 'sumayya.m@example.com',
    phone: '0922334455',
    city: 'Finfinnee',
    country: 'Itoophiyaa',
    preferredLanguage: 'English',
    membershipType: 'Volunteer',
    areaOfInterest: 'Gulaallii fi Qophii Viidiyoo',
    message: 'Tola ooltummaan qophii fi sagantaalee gargaaruun fedha.',
    status: 'ACTIVE',
    createdAt: '2026-09-14T15:30:00Z'
  }
];

export const initialErrorReports: ErrorReport[] = [
  {
    id: 'err-1',
    articleId: 'art-1',
    articleTitle: 'Miidiyaan Aalam Media Magaalaa Adaamaa Irraa Hawaasa Addunyaatiif Tamsaasa Isaa Jalqabe',
    reporterName: 'Kadiir Ahmed',
    reporterEmail: 'kadiir@example.com',
    details:  "Qubeeffama jecha tokkoo irratti fooyya'iinsi xiqqoon barbaachisa.",
    status: 'PENDING',
    createdAt: '2026-09-15T12:00:00Z'
  }
];
