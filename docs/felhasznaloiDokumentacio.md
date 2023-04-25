## Felhasználói dokumentáció

A dokumentáció használata során az egyes alcímekben fellelhető lesz az *Admin* kifejezés. Ezek olyan programrészek leírását tartalmazzák amelyeket csak az Admin jogosultsággal rendelkező felhasználók érnek el.

### Rendszerkövetelmények

#### Minimális rendszerkövetelmények
- 64-bites processzor és Operációs rendszer
- Processzor: Intel Core i3 2.5 Ghz vagy AMD Phenom II 2.6 Ghz 
- Operációs rendszer: Windows 8.1 vagy *NIX
- Memória: 4GB RAM
- Monitor: 1280×720-as vagy nagyobb felbontás
- Grafikus kártya: 1 GB és AMD 5570 vagy Intel Integrated Graphics 530
- Tárhely: 20GB
- 2MB/s sebességű Internet elérés

#### Ajánlott rendszerkövetelmények
- 64-bites processzor és Operációs rendszer
- Processzor: Intel Core i5 2.5 Ghz vagy AMD FX8350 4.0 Ghz 
- Operációs rendszer: Windows 10/11 vagy *NIX (2018 utáni kiadás)
- Memória: 8GB RAM
- Monitor: 1920x1080-as vagy nagyobb felbontás
- Grafikus kártya: 2GB és AMD 7970 vagy nVidia 770
- Tárhely: 120GB
- 100MB/s sebességű Internet elérés

**Támogatott böngészők:**

- Chrome (64+)
- Edge (79+)
- Firefox (67+)
- Opera (51+)
- Safari (12+)

### A program megnyitása

1. lépés: Nyissa meg a *Rendszerkövetelmények* részben említett böngészők egyikét.

2. lépés: Kattintson a böngésző *címsorába*.

Firefox böngésző címsora:

![Firefox böngésző címsora](images/openingTheProgram/firefoxAdressbar.png)

 Chromium böngésző címsora:

![Chromium böngésző címsora](images/openingTheProgram/chromiumAddressbar.png)

3. lépés: Írja be a következő URL címet: http://localhost:3000 és nyomjon `Enter` billentyűt.

### A program használata

A program 3 "oldalból" áll: 

- Főoldal
- Könyvek
- Profil

A Menüsávon belüli menüpontok használatával tud az oldalak között váltani. (Az utolsó menüpont a programból való Kijelentkezés)

 Egy menüpont fehér háttere jelzi, hogy jelenleg azon az oldalon tartózkodik.

![Aktív menüpont](images/programUse/activeMenuItem.png)

#### Bejelentkezés

1. Írja be email címét
2. Írja be jelszavát
3. Kattintson a Bejelentkezés gombra

![Bejelentkezési lépések](images/programUse/login/Steps.png)



#### Könyvek feltöltése [Admin]

Kattintson a *Főoldal* menüpontra.

1. Kattintson a *Töltsön fel egy tsv fájlt* alcím alatti *Böngészés...* mezőre. (Az eszközén található fájlkezelő fog megjelenni egy felugró ablakban)

![Fájl böngészése](images/programUse/fileUpload/browseFile.png)

2. A fájlkezelőn belül navigáljon a feltöltendő fájlt[^1] tartalmazó mappába és kattintson rá duplán

![Fájl kiválasztása](images/programUse/fileUpload/selectFile.png)

3. Kattintson a *Feltöltés* gombra

![Fájl feltöltése](images/programUse/fileUpload/uploadFile.png)

[^1]: A könyvek adatait tartalmazó `.tsv` kiterjesztésű dokumentum

#### Könyvek böngészése

A könyvek adatai egy lapozható táblázatban vannak megjelenítve. 

1. Az oldalszám mutató mellett elhelyezkedő gombokkal tud lapozni

2. A lenyíló listából választható ki a megjelenítendő könyvek száma oldalanként

3. A táblázat oszlopainak fejlécére való kattintással tudja rendezni a táblázat elemeit. 

   Az ábrán a fejlécre kattintás esete látható, a táblázat a *Raktári jel* alapján került csökkenő sorrendbe (Ismételt kattintás után növekvő sorrendbe kerül).

![Könyvek böngészése](images/programUse/browse/Steps.png)

#### Könyvek keresése

Kattintson a *Könyvek* menüpontra.

1. Kattintson a *Könyvek* főcím alatti kereső mezőbe

![Kereső mező](images/programUse/search/searchBar.png)

2. Írja be a keresni kívánt könyv *címét* vagy *íróját* és nyomja meg az `Enter` billentyűt

#### Könyvek szerkesztése és törlése [Admin]

##### Szerkesztés

1. Kattintson a szerkesztés ikonra

![Könyv szerkesztése ikon](images/programUse/edit/editBook.png)

2. Végezze el a kívánt módosításokat a beviteli mezőkben és kattintson a *Mentés* gombra

![Könyv szerkesztése űrlap](images/books/edit/EditComponent.png)

##### Törlés

1. Kattintson a törlés ikonra

![Könyv törlése](images/programUse/edit/deleteBook.png)

2. Kattintson az *Igen* gombra a könyv törlésének jóváhagyásához

   ![Könyv törlése jóváhagyás](images/books/edit/DeleteComponent.png)



#### Jelszó megváltoztatása

Kattintson a *Profil* menüpontra.

1. Írja be jelenlegi jelszavát
2. Írja be új jelszavát
3. Ismételje meg új jelszavát
4. Kattintson a *Jelszó megváltoztatása* gombra

![Jelszó megváltoztatás űrlap](images/profile/passwordChangeSteps.png)

#### Elfelejtett jelszó visszaállítása

*Amennyiben be van jelentkezve egy másik fiókjával, kérem jelentkezzen ki.*

1. A *Bejelentkezési* oldalon kattintson az *Elfelejtette jelszavát?* link-re. 

   ![Elfelejtett jelszó link](images/programUse/passwordReset/linkPosition.png)

   

2. Adja meg az elfelejtett jelszavához tartozó fiók email címét és kattintson a "Jelszó visszaállítása" gombra

![Jelszó visszaállítása](images/programUse/passwordReset/Component.png)

3. Nyissa meg levelező programját, keresse meg a jelszó visszaállítással kapcsolatos email-t és kattintson rá.

![Jelszó visszaállító email a bejövő üzenetek között](images/programUse/passwordReset/inbox.png)

4. Kattintson az email-ben található *Jelszó visszaállítása* gombra

![Jelszó visszaállító email](images/programUse/passwordReset/email.png)

5. A megnyílt oldalon adja meg új jelszavát és kattintson a *Létrehozás* gombra

![Új jelszó létrehozása űrlap](images/programUse/passwordReset/createPasswordForm.png)

Sikeresen visszaállította jelszavát! Nincs más dolga mint hogy bejelentkezzen új jelszavával.
