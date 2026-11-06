import { SOON_DEVICES, SUPPORTED_DEVICE } from "./devices"
import { regionsText } from "./regions"
import type { Copy } from "./types"

const SUPPORT = "https://lapin7771n.github.io/marstek_analytics/support/"
const PRIVACY = "https://lapin7771n.github.io/marstek_analytics/privacy/"

export const en: Copy = {
  lang: "en",
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
    shotSrc: "/img/home-en.jpg",
    shotAlt:
      "Battery ETA home screen: 49 % charge, 620 W discharge, empty in 2 h 50 min, lasts until 18:00",
  },
  devices: {
    title: "Supported devices",
    supportedNote: "Firmware V150 or later, Local API on.",
    soonBadge: "soon",
  },
  features: {
    title: "What the app shows",
    cards: [
      {
        title: "Empty in, full in",
        body: "How long the battery lasts until your reserve at the current load. While it charges, the time until full. And how long it would last if the grid went down now.",
      },
      {
        title: "Widgets and Lock Screen",
        body: "Charge and time left on the Home Screen and the Lock Screen.",
      },
      {
        title: "Today and week",
        body: "A chart of the charge and hourly power. Energy charged and used, and time on battery, for today and the last 7 days.",
      },
      {
        title: "Read-only",
        body: "The app never changes a battery setting. Modes, reserve and schedules stay in the Marstek app.",
      },
    ],
  },
  useful: {
    title: "Useful features",
    outage: {
      title: "Will it last until the power is back",
      body: "Add an address. From the outage schedule the app answers \"Lasts until 18:00, 2 h 05 min to spare\" or \"Runs out at 16:40, 40 min short\" and says how many watts to cut.",
      regionsLead: "Outage schedule integration for:",
    },
    notifications: {
      title: "Alerts",
      body: "A notification 30 minutes before a scheduled outage if the battery will not last. Also when less than 30 minutes are left and when the battery reaches the reserve.",
    },
    liveActivity: {
      title: "Live Activity",
      body: "During an outage a Live Activity shows the charge, the power and the time the battery runs out.",
    },
  },
  runtime: {
    title: "How long a full Venus E 3.0 lasts",
    intro:
      "The Venus E 3.0 holds 5.12 kWh. This is what the Battery ETA formula gives with a 12 % reserve and an allowance for conversion losses:",
    headers: { load: "Load", full: "100 % charge", half: "50 % charge" },
    rows: [
      { load: "100 W (router, lights, chargers)", full: "≈ 41 h 20 min", half: "≈ 17 h 51 min" },
      { load: "300 W", full: "≈ 13 h 47 min", half: "≈ 5 h 57 min" },
      { load: "500 W", full: "≈ 8 h 16 min", half: "≈ 3 h 34 min" },
      { load: "1000 W", full: "≈ 4 h 8 min", half: "≈ 1 h 47 min" },
    ],
    note: "These assume a steady load. Switch on a kettle and the time changes. The app recalculates it with every new reading from the battery.",
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
        "The app talks to the battery directly on your home network through the Marstek Open API (UDP) and sends only read requests. It needs no Marstek cloud, no Home Assistant and no account. Battery readings never leave your device. Details: ",
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
        q: "Which cities have outage schedules?",
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
    more: {
      before: "All limits: ",
      link: { label: "support page", href: `${SUPPORT}#limits` },
      after: ".",
    },
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
