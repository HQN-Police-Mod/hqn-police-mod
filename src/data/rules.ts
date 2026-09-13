import type { RuleCategory } from "@/types";

export const rulesData: RuleCategory[] = [
  {
    id: "general",
    name: "General Rules",
    nameAr: "القواعد العامة",
    icon: "BookOpen",
    rules: [
      {
        id: "g1",
        number: 1,
        title: "Respect All Players",
        titleAr: "احترام جميع اللاعبين",
        description:
          "يجب على جميع اللاعبين احترام بعضهم البعض داخل وخارج السيرفر. الإساءة اللفظية أو التحرش أو الاستفزاز الممنهج يؤدي إلى حظر فوري.",
        severity: "critical",
      },
      {
        id: "g2",
        number: 2,
        title: "No Cheating or Hacking",
        titleAr: "حظر الغش والهكر",
        description:
          "يُمنع منعاً باتاً استخدام أي برامج تعديل أو استغلال ثغرات السيرفر. المخالفة تؤدي إلى حظر دائم بدون تحذير مسبق.",
        severity: "critical",
      },
      {
        id: "g3",
        number: 3,
        title: "Realistic Roleplay",
        titleAr: "الرولبلاي الواقعي",
        description:
          "يجب أن يكون الرولبلاي واقعياً ومنطقياً في جميع الأوقات. لا يجوز خرق قواعد الرولبلاي مثل Metagaming أو Powergaming.",
        severity: "warning",
      },
      {
        id: "g4",
        number: 4,
        title: "No RDM / VDM",
        titleAr: "حظر القتل العشوائي",
        description:
          "Random Death Match وVehicle Death Match محظوران تماماً. يجب أن يكون كل تصادم أو مواجهة مبنياً على سياق رولبلاي واضح.",
        severity: "critical",
      },
    ],
  },
  {
    id: "roleplay",
    name: "Roleplay Rules",
    nameAr: "قواعد الرولبلاي",
    icon: "Users",
    rules: [
      {
        id: "rp1",
        number: 1,
        title: "Stay In Character",
        titleAr: "البقاء في الشخصية",
        description:
          "يجب البقاء في الشخصية في جميع الأوقات خلال السيشن. التحدث خارج الشخصية (OOC) يقتصر على المواقف الضرورية فقط.",
        severity: "warning",
      },
      {
        id: "rp2",
        number: 2,
        title: "No Metagaming",
        titleAr: "حظر الميتاقيمنج",
        description:
          "يُمنع استخدام المعلومات التي تعرفها كلاعب داخل شخصيتك. كل معلومة يجب أن تُكتسب داخل السيرفر عبر رولبلاي حقيقي.",
        severity: "critical",
      },
      {
        id: "rp3",
        number: 3,
        title: "Fear RP",
        titleAr: "قاعدة الخوف",
        description:
          "يجب تمثيل الخوف بشكل واقعي عند التعرض لتهديد حقيقي. لا يجوز تجاهل الأسلحة الموجهة إليك أو التصرف بطريقة غير منطقية تحت التهديد.",
        severity: "warning",
      },
      {
        id: "rp4",
        number: 4,
        title: "No Powergaming",
        titleAr: "حظر البوراقيمنج",
        description:
          "يُمنع إجبار اللاعبين الآخرين على نتائج معينة أو فرض أفعال عليهم بدون إعطائهم فرصة للرد. الرولبلاي يجب أن يكون تشاركياً.",
        severity: "warning",
      },
    ],
  },
  {
    id: "security",
    name: "Security Forces Rules",
    nameAr: "قواعد الأجهزة الأمنية",
    icon: "Shield",
    rules: [
      {
        id: "sf1",
        number: 1,
        title: "Follow Chain of Command",
        titleAr: "اتباع التسلسل القيادي",
        description:
          "يجب على جميع أعضاء الأجهزة الأمنية اتباع التسلسل القيادي في جميع الأوقات. أوامر القيادة ملزمة إلا إذا تعارضت مع قواعد السيرفر.",
        severity: "critical",
      },
      {
        id: "sf2",
        number: 2,
        title: "Uniform & Appearance",
        titleAr: "الزي الرسمي والمظهر",
        description:
          "يجب ارتداء الزي الرسمي المعتمد لكل قطاع خلال المهام الرسمية. المخالفة تعرض العضو للمساءلة الإدارية.",
        severity: "info",
      },
      {
        id: "sf3",
        number: 3,
        title: "Use of Force",
        titleAr: "استخدام القوة",
        description:
          "يجب أن يكون استخدام القوة متناسباً مع التهديد. يُمنع استخدام القوة المفرطة أو إطلاق النار بدون مبرر قانوني واضح.",
        severity: "critical",
      },
      {
        id: "sf4",
        number: 4,
        title: "Reports & Documentation",
        titleAr: "التقارير والتوثيق",
        description:
          "يجب توثيق جميع العمليات والحوادث بتقارير رسمية. التقارير يجب أن تكون دقيقة وكاملة وتُرفع في الوقت المناسب.",
        severity: "info",
      },
    ],
  },
  {
    id: "discord",
    name: "Discord Rules",
    nameAr: "قواعد Discord",
    icon: "MessageSquare",
    rules: [
      {
        id: "d1",
        number: 1,
        title: "Appropriate Language",
        titleAr: "اللغة المناسبة",
        description:
          "يجب استخدام لغة لائقة واحترافية في جميع قنوات Discord. الكلام النابي والإساءة لا تُقبل بأي صورة.",
        severity: "warning",
      },
      {
        id: "d2",
        number: 2,
        title: "No Spam",
        titleAr: "حظر الإزعاج",
        description:
          "يُمنع الإرسال المتكرر للرسائل أو الصور أو اللينكات بصورة تزعج الأعضاء الآخرين.",
        severity: "info",
      },
      {
        id: "d3",
        number: 3,
        title: "Stay On Topic",
        titleAr: "الالتزام بموضوع القناة",
        description:
          "يجب الالتزام بموضوع كل قناة. لكل قناة غرضها المحدد ويجب احترامه.",
        severity: "info",
      },
    ],
  },
];
