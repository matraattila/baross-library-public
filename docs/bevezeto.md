## Bevezető

### Dolgozatom témája és célja
Dolgozatom témájának egy webes alapú könyvtár kezelő alkalmazást választottam. Az alkalmazás ötlete egy beszélgetés során jött napvilágra, az iskola könyvtárosával, amiben felvetődött, hogy a könyvtári szoftver amit használ lassan 15 éves, ezért gondoltam szívesen vállalkoznék egy ilyesmi program megírására.

A programom célja az iskolai könyvtáros munkájának megkönnyítése. Mégpedig azzal, hogy megtudja tekinteni a raktáron lévő könyvek adatait egy könnyen átlátható táblázat formájában, ami rendezhető is az egyes oszlopok alapján (*cím*, *raktári jel*, stb.). Mindezek mellett lehetősége van keresni a könyvek adatai közt (*cím* és *szerző* alapján), módosítani egy könyv adatait vagy eltávolítani azt. 

### Program követelmények

- Felhasználó alapú rendszer kétféle jogosultsággal (*admin*, *user*)
- Munkafolyamat kezelése `Cookie`-val
- Jelszó változtatás/visszaállítás lehetősége
- Könyvek adatainak
  - feltöltése egy `tsv` kiterjesztésű fájlból és a feltöltött könyvek számának vizuális megjelenítése
  - keresése *cím* és *szerző* alapján
  - megjelenítése egy táblázatban (szerkeszthető cellákkal)
