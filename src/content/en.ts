import { SOON_DEVICES, SUPPORTED_DEVICE } from "./devices"
import { regionsText } from "./regions"
import type { Copy } from "./types"

const SUPPORT = "https://lapin7771n.github.io/marstek_analytics/support/"
const PRIVACY = "https://lapin7771n.github.io/marstek_analytics/privacy/"

export const en: Copy = {
  lang: "en",
  head: {
    title: "Battery ETA: how long your Marstek Venus E 3.0 lasts, on iPhone",
    description:
      "An iPhone and iPad app with widgets that shows how long a Marstek Venus E 3.0 lasts at the current load. Reads the battery over home Wi‑Fi through the Local API, without the Marstek cloud.",
    ogTitle: "How long will your Marstek Venus E 3.0 last?",
    ogDescription:
      "Time left at the current load, on iPhone, in widgets and on the Lock Screen. Reads the battery over home Wi‑Fi, read-only, without the Marstek cloud.",
    ogImageAlt: "Battery ETA home screen: 58 % charge, empty in 3 h 30 min",
    ogLocale: "en_US",
    ogLocaleAlternate: "uk_UA",
    appAlternateName: "Battery ETA: Home Backup",
    appDescription:
      "An iPhone and iPad app that shows how long a Marstek Venus E 3.0 lasts at the current load. It reads the battery through the Local API on the home Wi‑Fi network and never changes a setting.",
    appOperatingSystem: "iOS 17 or later, iPadOS 17 or later",
    appStoreUrl: "https://apps.apple.com/app/id6822926943",
  },
  homeHref: "/en/",
  otherLang: { label: "Українською", href: "/", lang: "uk" },
  brand: "Battery ETA",
  hero: {
    titleBefore: "How long will your ",
    titleHighlight: "Marstek",
    titleAfter: " last in a power cut?",
    lead: "Battery ETA reads your battery and works out how long the current charge will last.",
    badgeAlt: "Download on the App Store",
    badgeSrc: "/img/app-store-badge-en.svg",
  },
  screens: {
    descriptions: {
      home: "Battery ETA home screen: 58 % charge, empty in 3 h 30 min, lasts until 22:00",
      charging: "Battery ETA home screen while charging: 68 %, full in 1 h 50 min, +900 W",
      verdict: "Battery ETA home screen: runs out at 16:24, 36 min short, cut about 140 W",
      activity: "Lock Screen with the Live Activity: runs out at 16:24, 64 %, −820 W, grid 17:00",
      notification: "Lock Screen notification: outage at 12:00, 37 min short",
      week: "Battery ETA week screen: 25.4 kWh charged, 25.1 kWh used",
    },
    home: {
      hoursUnit: "h",
      minutesUnit: "min",
      change: "Change",
      today: "Today",
      week: "Week",
      range: "low 41 % · high 88 %",
      axisStart: "00",
      axisMiddle: "06",
      axisNow: "now",
      totals: [
        { label: "Charged", value: "2.4", unit: "kWh" },
        { label: "Used", value: "2.1", unit: "kWh" },
        { label: "On battery", value: "1 h 25" },
      ],
      lasts: {
        statusTime: "20:33",
        percent: 58,
        label: "EMPTY IN",
        hours: 3,
        minutes: 30,
        power: "−620 W",
        updated: "Updated 20:32",
        verdict: {
          tone: "good",
          label: "LASTS",
          text: "Lasts until 22:00, 1 h 43 min to spare.",
        },
        schedule: "Group 3.1 · off 17:00–22:00",
      },
      charging: {
        statusTime: "14:10",
        percent: 68,
        label: "FULL IN",
        hours: 1,
        minutes: 50,
        power: "+900 W",
        updated: "Updated 14:09",
        verdict: null,
        schedule: "Group 3.1 · off 17:00–22:00",
      },
      short: {
        statusTime: "13:25",
        percent: 64,
        label: "EMPTY IN",
        hours: 2,
        minutes: 59,
        power: "−820 W",
        updated: "Updated 13:25",
        verdict: {
          tone: "bad",
          label: "RUNS OUT 16:24",
          text: "Runs out at 16:24, 36 min short.",
          cut: "Cut about 140 W to last until 17:00.",
        },
        schedule: "Group 19.1 · off 12:00–17:00",
      },
    },
    lock: {
      date: "Friday 23 October",
      time: "13:25",
      app: "Battery ETA · outage",
      code: "RUNS OUT 16:24",
      emptyLabel: "Empty at",
      emptyTime: "16:24",
      usage: "64 % · −820 W",
      grid: "Grid 17:00",
      notificationTitle: "Outage at 12:00, 37 min short",
      notificationTime: "11:30",
      notificationBody:
        "By the schedule: off 12:00–17:00. You usually use about 750 W at those hours, so the battery runs out near 16:23. Cut about 90 W to last. Forecast from your usage.",
    },
    week: {
      statusTime: "13:25",
      now: "Now",
      today: "Today",
      week: "Week",
      charged: "Charged",
      used: "Used",
      days: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Today"],
      totals: [
        { label: "Charged", value: "25.4", unit: "kWh" },
        { label: "Used", value: "25.1", unit: "kWh" },
        { label: "On battery", value: "31 h" },
      ],
      rows: [
        { day: "Thu 22 Oct", charged: "+3.4", used: "−3.6 kWh" },
        { day: "Wed 21 Oct", charged: "+4.1", used: "−3.8 kWh" },
        { day: "Tue 20 Oct", charged: "+2.9", used: "−3.2 kWh" },
        { day: "Mon 19 Oct", charged: "+4.8", used: "−4.4 kWh" },
      ],
    },
  },
  og: { line1: "How long will", line2: "your Marstek last?" },
  devices: {
    title: "Supported devices",
    supportedNote: "Firmware V150 or later, Local API on.",
    soonBadge: "soon",
  },
  features: {
    steps: [
      {
        screen: "charging",
        title: "Empty in, full in",
        body: "How long the battery lasts until your reserve at the current load. While it charges, the time until full. And how long it would last if the grid went down now.",
      },
      {
        screen: "verdict",
        title: "Will it last until the power is back",
        body: "Add an address. From the outage schedule the app answers \"Lasts until 18:00, 2 h 05 min to spare\" or \"Runs out at 16:40, 40 min short\" and says how many watts to cut.",
        regionsLead: "Outage schedule integration for:",
      },
      {
        screen: "activity",
        title: "Widgets, Lock Screen and Live Activity",
        body: "Charge and time left on the Home Screen and the Lock Screen. During an outage a Live Activity shows the charge, the power and the time the battery runs out.",
      },
      {
        screen: "notification",
        title: "Alerts",
        body: "A notification 30 minutes before a scheduled outage if the battery will not last. Also when less than 30 minutes are left and when the battery reaches the reserve.",
      },
      {
        screen: "week",
        title: "Today and week",
        body: "A chart of the charge and hourly power. Energy charged and used, and time on battery, for today and the last 7 days.",
      },
    ],
  },
  setup: {
    title: "Set up",
    steps: [
      "In the Marstek app, check the firmware (V150 or later) and turn on Local API.",
      "Open Battery ETA, tap Find battery and allow local network access.",
      "Add a widget to the Home Screen or the Lock Screen. To see outage schedules, enter your address.",
    ],
    note: {
      before:
        "The app only reads data and changes nothing on the battery. The app talks to the battery directly on your home network through the Marstek Open API (UDP) and sends only read requests. It needs no Marstek cloud, no Home Assistant and no account. Battery readings never leave your device. Details: ",
      link: { label: "privacy policy", href: PRIVACY },
      after: ".",
    },
  },
  faq: {
    title: "Questions",
    items: [
      {
        q: "How long does a Marstek Venus E 3.0 last in a power cut?",
        a: "It depends on the load. By the Battery ETA formula, a full battery with a 12 % reserve lasts about 13 h 47 min at 300 W and 4 h 8 min at 1000 W. Battery ETA calculates it from your current load.",
      },
      {
        q: "Is there an iPhone widget for the Marstek Venus E 3.0?",
        a: "Yes. Battery ETA has Home Screen and Lock Screen widgets with the charge and the time left. It is an independent app; the official Marstek app is separate.",
      },
      {
        q: "Does it work without the internet or the Marstek cloud?",
        a: "Yes. It reads the battery over your home Wi‑Fi through the Local API, with no internet and no cloud. The router must have power: during an outage it has to run from the battery or another backup. The outage schedule needs the internet.",
      },
      {
        q: "Can I check the battery away from home?",
        a: "No. There is no cloud and no remote access. Away from home the app and widgets show the last readings taken at home.",
      },
      {
        q: "Which Marstek models are supported?",
        a: `Supported: Marstek ${SUPPORTED_DEVICE} with firmware V150 or later. Coming soon: ${SOON_DEVICES.join(", ")}.`,
      },
      {
        q: "How do I turn on the Local API on a Venus E 3.0?",
        a: "In the Marstek app, open the battery, go to its settings and turn on Local API. Check the firmware version on the same screen: it must be V150 or later.",
      },
      {
        q: "Does the app change battery settings?",
        a: "No. Battery ETA only reads the battery status. Modes, reserve and schedules stay in the Marstek app.",
      },
      {
        q: "Which regions have outage schedules?",
        a: `Outage schedule integration for: ${regionsText("en")}. Elsewhere the app shows the battery time left without the "will it last" answer.`,
      },
      {
        q: "Is there an Android version?",
        a: "Not yet. Coming soon to Google Play.",
      },
      {
        q: "Is this an official Marstek app?",
        a: "No. Battery ETA is an independent app, not made by, endorsed by or affiliated with Marstek. Mykyta Lapin, a Venus E 3.0 owner in Ukraine, made it.",
      },
    ],
  },
  closing: {
    title: "Know how long your battery lasts",
    linkLabel: "Open Battery ETA on the App Store",
  },
  limits: {
    title: "Limits",
    items: [
      "Your phone must be on the same network as your Marstek device.",
      "On the App Store now. Coming soon to Google Play.",
    ],
  },
  footer: {
    support: { label: "Support", href: SUPPORT },
    privacy: { label: "Privacy", href: PRIVACY },
    author:
      "I'm Mykyta. I have a Marstek Venus E 3.0 at home in Ukraine and wrote Battery ETA to know how long it lasts during power cuts.",
    disclaimer:
      "Battery ETA is an independent app, not affiliated with Marstek. Apple, App Store, iPhone and iPad are trademarks of Apple Inc.",
  },
}
