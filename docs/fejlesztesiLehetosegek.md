## Fejlesztési lehetőségek

### A könyvek adatainak feldolgozása

1. Jelenleg a könyvek adatainak feldolgozását végző kód nem kellően átlátható.

   *Megoldás:* A feldolgozást végző forráskód egészét egy külön függvénybe szervezni

2. A feldolgozás a kliens oldalon megy végbe.

   *Megoldás:* API végpont létrehozása, amely a szerver oldalon végzi el az adat feldolgozást

### A feltöltött könyvek számát ábrázoló grafikon

1. Az egy dátumhoz tartozó könyv feltöltések nem dátum szerint csoportosítva jelennek meg.

​		*Megoldás:* A könyv feltöltések dátum szerinti csoportosítása az adatbázis lekérdezése során

### Könyv kölcsönzés

- Lehetséges legyen hozzárendelni egy felhasználóhoz azokat a könyveket amelyeket kiakar kölcsönözni.

- A könyvek táblázatában jelenjen meg minden egyes könyv mellett annak állapota (elérhető/kikölcsönzve)
  - Az *admin* jogosultságú felhasználók számára látható legyen a kölcsönző neve is

## Összegzés

A program fejlesztése során sok nehézségbe ütköztem hiszen az alkalmazásban használt keretrendszerrel, könyvtárakkal és adatbázissal még nem dolgoztam ilyen átfogóan, így elmondható, hogy a program írása a felsorolt technológiák tanulásának folyamat is volt egyben.

A nehézségek közül említésre méltó a könyvek megjelenítésére szolgáló táblázatot, amit az összes komponens közül a legtöbbször írtam át. Minden komponens könyvtár váltás során (3-4 alkalom) a komponens könyvtár által biztosított táblázatot használtam a programban, azonban kis idő elteltével áttértem a daisyUI TailwindCSS plugin-ra ami nem rendelkezik önálló táblázat komponenssel, ezért keresnem kellett egy olyan táblázatot ami könnyen személyre szabható mind kinézetben mind működésben. Így találtam rá a végső megoldást jelentő TanStack Table-re.

Összeségében az alkalmazás iránti elvárásokat sikerült megvalósítani, azonban úgy gondolom, hogy a program közel sem teljes. Számtalan, még fel nem vetett fejlesztési lehetőség van, amely hasznos részét képezné a programnak. Minden ötletet szívesen fogadok az email címemre: [matraattila2004@gmail.com](mailto:matraattila2004@gmail.com)

## Hivatkozás jegyzék

- https://stackoverflow.com
- https://mongoosejs.com
- https://mongodb.com/docs
- https://react.dev
- https://tanstack.com/table/v8
- https://daisyui.com
- https://tailwindcss.com
- https://apexcharts.com
- https://www.youtube.com
- https://github.com