import type { Lang } from "./types"

type Region = { uk: string; en: string }

export const REGIONS: readonly Region[] = [
  { uk: "м. Київ", en: "Kyiv city" },
  { uk: "Київська", en: "Kyiv" },
  { uk: "Волинська", en: "Volyn" },
  { uk: "Дніпропетровська", en: "Dnipropetrovsk" },
  { uk: "Житомирська", en: "Zhytomyr" },
  { uk: "Запорізька", en: "Zaporizhzhia" },
  { uk: "Івано-Франківська", en: "Ivano-Frankivsk" },
  { uk: "Кіровоградська", en: "Kirovohrad" },
  { uk: "Львівська", en: "Lviv" },
  { uk: "Миколаївська", en: "Mykolaiv" },
  { uk: "Одеська", en: "Odesa" },
  { uk: "Полтавська", en: "Poltava" },
  { uk: "Рівненська", en: "Rivne" },
  { uk: "Сумська", en: "Sumy" },
  { uk: "Харківська", en: "Kharkiv" },
  { uk: "Хмельницька", en: "Khmelnytskyi" },
  { uk: "Черкаська", en: "Cherkasy" },
  { uk: "Чернівецька", en: "Chernivtsi" },
]

const TAIL: Record<Lang, string> = { uk: " області", en: " regions" }

export function regionsText(lang: Lang): string {
  return REGIONS.map((region) => region[lang]).join(", ") + TAIL[lang]
}
