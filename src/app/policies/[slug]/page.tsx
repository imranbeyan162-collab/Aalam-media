'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, ChevronLeft } from 'lucide-react';

const policiesContent: Record<string, { title: string; desc: string; content: string[] }> = {
  editorial: {
    title: 'Editorial Policy (Heera Gulaalaa)',
    desc: 'Qajeelfama gaazexeessummaa, walabummaa fi dhugaa mirkaneessuu Aalam Media.',
    content: [
      'Aalam Media miidiyaa bilisaa fi qajeelfama ogummaa gaazexeessummaa hordofee hojjetudha.',
      'Gabaasni kamiyyuu osoo hin maxxanfamin dura qulqullina isaa gulaalaa olaanaadhaan mirkanaa\'uu qaba.',
      'Oduun kamiyyuu madda qabatamaa fi amansiisaa qabaachuu qaba; oduu loogii fi sobaa irraa guutummaatti fagaanna.',
      'Ergaan keenya "Addunyaa Islaamummaan Miidhagde" safuu, kabaja hawaasaa fi nagaa bu\'uureffata.'
    ]
  },
  correction: {
    title: 'Correction Policy (Heera Sirreeffama Gabaasaa)',
    desc: 'Dogoggora yoo uumame haala iftoomina qabuun qajeelchuu.',
    content: [
      'Barruu kamiyyuu keessatti dogoggorri qubeeffamaa, lakkoofsaa, ykn yaadaa yoo mul\'ate battalatti sirreeffama ni kennina.',
      'Dubbistoonni kamiyyuu butoona "Report an Error / Sirreeffama Gabaasaa" jedhu fayyadamuun dogoggora argan nuuf erguu danda\'u.',
      'Sirreeffamni godhame hundi galmee sirreeffamaa keessatti ifatti galmaa\'ee taa\'a.'
    ]
  },
  privacy: {
    title: 'Privacy Policy (Heera Eegumsa Odeeffannoo Dhuunfaa)',
    desc: 'Odeeffannoon miseensotaa fi dubbistootaa akkamitti akka eegamu.',
    content: [
      'Odeeffannoo miseensummaa fi tajaajila newsletter keessan eegumsa guutuudhaan qabanna.',
      'Odeeffannoo keessan qaama sadaffaaf dabarsee hin kenninu.',
      'Heera seera qabeessaa fi nageenya sarvaroota keenyaa yeroo yeroon ni haaromsina.'
    ]
  },
  terms: {
    title: 'Terms & Conditions (Heera fi Dambii Tajaajilaa)',
    desc: 'Qajeelfama itti fayyadama weebsaayitii Aalam Media.',
    content: [
      'Qabiyyeen weebsaayitii kana irratti maxxanfamu hunduu mirgi isaa heeraan eegamaadha.',
      'Hayyama malee qabiyyee Aalam Media daldalaaf oolchuun dhowwaadha.',
      'Qabiyyeewwan barnootaa fi da\'awaa maddaa fi liinkii eeruun qooduun eeyyamamaadha.'
    ]
  },
  copyright: {
    title: 'Copyright Policy (Heera Abbaa Qabeenyummaa)',
    desc: 'Mirga waraabbii fi abbummaa qabiyyee.',
    content: [
      'Asxaan mallattoo Aalam Media fi wantoonni istaadiyoo keessatti waraabbaman qabeenya Aalam Media ti.',
      'Suuraalee fi barruuleen mirgi abbummaa isaanii qajeelfama seeraa hordofee eegama.'
    ]
  },
  advertisement: {
    title: 'Advertisement Policy (Heera Beeksisaa)',
    desc: 'Heera fi qajeelfama beeksisa fudhachuu.',
    content: [
      'Beeksisni kamiyyuu heera fi safuu Islaamaa kan hin sarbinee fi daldala haqa qabeessa ta\'uu qaba.',
      'Beeksisni maxxanfamu hundi barruulee oduutiin adda bahee mallattoo "Beeksisa / Sponsored" qabaata.'
    ]
  },
  disclaimer: {
    title: 'Disclaimer (Ibsa Dhimma Qulqullinaa)',
    desc: 'Ibsa waliigalaa qabiyyee fi yaada dhuunfaa ilaalchisee.',
    content: [
      'Yaadonni barreessitoota kutaalee Yaada fi Xiinxala (Opinion) keessatti dhiyaatan ilaalcha barreessaa qofa calaqqisuu danda\'u.',
      'Aalam Media dhugaa mirkaneessuuf tattaaffii hunda godha.'
    ]
  }
};

export default function PolicyPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'editorial';
  const policy = policiesContent[slug] || policiesContent['editorial'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-emerald-400 transition">
        <ChevronLeft className="w-4 h-4" />
        <span>Gara Fuula Duraatti</span>
      </Link>

      <div className="space-y-2 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2 text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs font-mono font-bold uppercase">AALAM MEDIA STANDARDS</span>
        </div>
        <h1 className="text-3xl font-black text-white">{policy.title}</h1>
        <p className="text-xs sm:text-sm text-gray-400">{policy.desc}</p>
      </div>

      <div className="p-8 rounded-3xl bg-gray-950 border border-gray-800 space-y-4">
        {policy.content.map((point, idx) => (
          <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
            <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
              {idx + 1}
            </span>
            <p>{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
