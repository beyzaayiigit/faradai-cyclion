import type { LucideIcon } from "lucide-react";
import { Battery, Brain, Leaf, Recycle } from "lucide-react";

export const relithContent = {
  label: "RE-LITH",
  title: "Döngüsel Batarya Ekosistemi ve Temiz Dönüşüm",
  subtitle:
    "Bugünün atık bataryalarını, yarının temiz enerji altyapısına dönüştürüyoruz.",
  intro:
    "Elektrikli ulaşımın geleceği sadece şarj istasyonlarında değil, o enerjiyi tutan bataryaların sürdürülebilirliğinde saklı. RE-LITH olarak, ömrünü tamamlamış elektrikli araç, tır ve endüstriyel bataryaları birer atık olarak değil, \"şehir madeni\" olarak görüyoruz. Bataryaları temiz yöntemlerle ayrıştırıyor, içlerindeki kritik hammaddeleri yeniden enerji sektörüne kazandırıyoruz.",
  steps: [
    {
      step: 1,
      title: "AI Battery Diagnostics",
      subtitle: "Akıllı Teşhis",
      icon: Brain as LucideIcon,
      animate: false,
      body: "Her batarya doğrudan geri dönüşüme gitmez. Merkezimize ulaşan bataryalar, yapay zeka destekli algoritmalarımızla SOH (State of Health), iç direnç ve kapasite testlerine tabi tutulur. Hâlâ kullanılabilir durumda olanlar, MobiQ EnergyPack sistemlerinde değerlendirilmek üzere \"İkinci Ömür\" (Second-Life) rotasına ayrılır.",
    },
    {
      step: 2,
      title: "Güvenli Deşarj & Black Mass",
      subtitle: "Siyah Kütle Üretimi",
      icon: Recycle as LucideIcon,
      animate: true,
      body: "Geri kazanıma girmesi kesinleşen bataryalar, önce kontrollü ve güvenli bir şekilde deşarj edilir. Ardından özel güvenlikli kapalı ortamlarda mekanik parçalama işlemine alınarak \"Black Mass\" (Siyah Kütle) elde edilir. Bu kütle; lityum, kobalt, nikel ve manganın ana kaynağıdır.",
    },
    {
      step: 3,
      title: "Green Chemistry",
      subtitle: "Yeşil Kimya Yaklaşımı",
      icon: Leaf as LucideIcon,
      animate: false,
      body: "RE-LITH'i geleneksel geri dönüşümden ayıran en büyük fark kimyasında yatar. Yüksek sıcaklıklı yakma (pirometalurji) veya zararlı ağır kimyasallar yerine, laktik asit bazlı DES (Deep Eutectic Solvents) teknolojisini kullanırız. Bu \"Yeşil Çözücü\" yaklaşımı sayesinde metaller düşük sıcaklıkta, karbon ayak izi minimuma indirilerek ve seçici olarak ayrıştırılır.",
    },
    {
      step: 4,
      title: "Battery-Grade Kazanım",
      subtitle: "Kritik Metal Geri Kazanımı",
      icon: Battery as LucideIcon,
      animate: false,
      body: "Amacımız sadece metal ayrıştırmak değil, yeni batarya üretim standardı olan \"Battery-Grade\" kalitesine ulaşmaktır. Geri kazanılan lityum karbonat, nikel ve kobalt bileşikleri saflaştırılarak, yeni nesil batarya ve enerji depolama sistemlerinin doğrudan hammaddesi haline getirilir.",
    },
  ],
  highlights: [
    {
      title: "%0 Yakma İşlemi",
      body: "Yüksek karbon salınımlı pirometalurjiye son.",
    },
    {
      title: "Tam Döngüsel Ekosistem",
      body: "Atık Batarya → Temiz Hammadde → Yeni Enerji Depolama",
    },
    {
      title: "Stratejik Bağımsızlık",
      body: "Lityum ve kobaltı kendi elektrikli araç ağımızdan geri kazanıyoruz.",
    },
  ],
  bridge: {
    title: "MobiQ × RE-LITH Kapalı Döngü",
    body: "Batarya toplama → temiz geri dönüşüm → akıllı şarj ağı → filo operasyonu. Tek platform, sıfır atık vizyonu.",
  },
};
