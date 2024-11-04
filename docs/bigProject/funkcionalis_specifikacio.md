# Funkcionális specifikáció

---

## Tartalomjegyzék:

1. [Jelenlegi helyzet leírása](#1-jelenlegi-helyzet-leírása)

2. [Vágyálomrendszer leírása](#2-vágyálomrendszer-leírása)

3. [Megfeleltetés a jogi szabályoknak](#3-megfeleltetés-a-jogi-szabályoknak)

4. [Jelenlegi üzleti folyamatok modellje](#4-jelenlegi-üzleti-folyamatok-modellje)

5. [Igényelt üzleti folyamatok modellje](#5-igényelt-üzleti-folyamatok-modellje)

6. [Követelménylista](#6-követelménylista)

7. [Használati esetek](#7-használati-esetek)

8. [Képernyőtervek](#8-képernyőtervek)

9. [Forgatókönyvek](#9-forgatókönyvek)

---

## 1. Jelenlegi helyzet leírása

## 2. Vágyálomrendszer leírása

A jelenlegi webalkalmazást az alábbi funkciókkal tervezzük bővíteni:

### 2.1 Általános funkciók:

- Integrált chatfelület felhasználók és adminok közt, amely lebegő menüként oldalt megnyitható.
- Kétféle kutyaleírás létrehozása: egy rövidebb, amely a listázásnál látható, és egy részletesebb, amely a
  kutya profilján jelenik meg.
- Kutyák szűrése keresésnél kor, nem és fajta szerint.
- Reszponzív webdizájn létrehozása különböző eszközökön: mobil, tablet, számítógép.
- Több fénykép megjelenítése a kutya profilján.

### 2.2 Adminisztrátori funkciók:

- Több adminisztrátor jogosultsággal rendelkező felhasználó hozzáadása.
- Képek feltöltése a kutyák profiljához, kutya profiljában megjelenő kép kiválasztása.
- Felhasználók profiljainak menedzselése: regisztrált fiók törlése a rendszerből.

### 2.3 Felhasználói funkciók:

- Telefonszám megadása/módosítása a profilban.

## 3. Megfeleltetés a jogi szabályoknak

A weboldal a magyar GDPR-szabályoknak megfelelően csak akkor tárol telefonszámokat és e-mail címeket, ha azok gyűjtése
jogos célból történik, és a felhasználó ehhez kifejezetten hozzájárul. A GDPR előírásai szerint az ilyen adatok
személyes adatnak számítanak, és csak akkor gyűjthetők, ha egyértelműen szükségesek, például a felhasználó
megkereséséhez. A weboldal gondoskodik arról, hogy a felhasználók előre tájékozódjanak arról, hogyan használják fel az
adataikat, és gyűjtés előtt hozzájárulásukat adják. Az adatok biztonságát szigorú intézkedések garantálják, és a
felhasználóknak bármikor joguk van kérni az adataikhoz való hozzáférést, azok módosítását vagy törlését. Az adatok
tárolása a GDPR szabályai szerint történik, vagyis a már nem szükséges vagy elavult adatokat biztonságosan törlik.

Regisztrációhoz a GDPR-t el kell fogadni a regisztráció elfogadásához, a Követelményspecifikációban megaddott
Adatvédelmi Tájékoztató elolvasható egy külön ablakban.

```
Ez az adatvédelmi tájékoztató egy egyetemi projekt részeként készült, és nem szolgál valós célokat. 
Csupán egy Mesterséges Intelligencia segítségével generált minta.

Adatvédelmi Tájékoztató

1. Bevezetés
A Lakatos Brendon Menhelye elkötelezett az Ön személyes adatainak védelme mellett. 
Az adatvédelmi tájékoztató célja, hogy részletesen bemutassa, hogyan gyűjtjük, használjuk és védjük az Ön személyes 
adatait, valamint hogy ismertessük az Ön jogait a GDPR (Általános Adatvédelmi Rendelet) alapján.

2. Az általunk gyűjtött adatok
A weboldal használata során a következő személyes adatokat gyűjtjük:

Telefonszám
E-mail cím

3. Adatgyűjtés célja
Személyes adatait az alábbi célokra gyűjtjük és használjuk fel:

Az Ön kérdéseinek és megkereséseinek megválaszolása
Adatainak nyilvántartása az örökbefogadási kérelem kezelése érdekében (ha alkalmazható)
Jogszabályi kötelezettségek teljesítése

4. Az adatkezelés jogalapja
Az Ön személyes adatait kizárólag az alábbi jogalapok alapján kezeljük:

Az Ön hozzájárulása (például regisztráció esetén)
Szerződés teljesítése (például örökbefogadási folyamat során)
Jogos érdekek (például a weboldal működtetése és karbantartása)

5. Adattovábbítás és megosztás
Az Ön személyes adatait harmadik féllel csak az alábbi esetekben osztjuk meg:

Amennyiben az adattovábbítás jogszabályi kötelezettségből ered
Harmadik feleknek, akik a nevünkben végzik az adatfeldolgozást (például IT szolgáltatók)

6. Adatmegőrzési időszak
Az Ön személyes adatait csak addig őrizzük meg, amíg az az adatkezelés céljának eléréséhez szükséges, vagy amíg az Ön 
hozzájárulása érvényben van. A felesleges vagy elavult adatokat biztonságosan töröljük.

7. Az Ön jogai
Az Ön GDPR szerinti jogai a következők:

Hozzáférési jog: Jogában áll tudni, hogy milyen adatokat tárolunk Önről.
Helyesbítési jog: Kérheti adatai módosítását vagy javítását.
Törlési jog: Kérheti személyes adatainak törlését ("elfeledtetéshez való jog").
Adatkezelés korlátozása: Kérheti adatainak kezelésének korlátozását bizonyos esetekben.
Adathordozhatósághoz való jog: Kérheti adatai másik szolgáltatóhoz való továbbítását.
Hozzájárulás visszavonása: Bármikor visszavonhatja a hozzájárulását, ha az adatkezelés jogalapja a hozzájárulás.

8. Biztonsági intézkedések
Minden szükséges technikai és szervezési intézkedést megteszünk annak érdekében, hogy személyes adatait védelemmel 
lássuk el, és megakadályozzuk az adatokhoz való illetéktelen hozzáférést, azok elvesztését vagy jogosulatlan felhasználását.

9. Kapcsolatfelvétel
Amennyiben kérdése vagy kérése van az adatvédelmi szabályzatunkkal kapcsolatban, vagy gyakorolni szeretné a GDPR 
szerinti jogait, kérjük, vegye fel velünk a kapcsolatot az alábbi elérhetőségeken:

Lakatos Brendon Menhelye
1234 Budapest, Kutyus utca 5.
+36 30 123 4567
info@inabiaf.org

11. Panasz benyújtása
Ha úgy érzi, hogy személyes adatait nem megfelelően kezeljük, panaszt tehet a helyi adatvédelmi hatóságnál:

Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH) https://www.naih.hu

12. A szabályzat módosítása
Fenntartjuk a jogot, hogy ezt az adatvédelmi tájékoztatót időről időre frissítsük. Az esetleges változásokat itt 
tesszük közzé, így kérjük, látogasson vissza rendszeresen.

Utolsó módosítás dátuma: 2024.10.12
```

## 4. Jelenlegi üzleti folyamatok modellje

## 5. Igényelt üzleti folyamatok modellje

## 6. Követelménylista

| Modul         | ID  | Név                              | Leírás                                                                                                             |
|---------------|-----|----------------------------------|--------------------------------------------------------------------------------------------------------------------|
| Jogosultság   | P1  | Adminisztrátor hozzáadása        | A rendszerben több adminisztrátori jogosultságú felhasználó legyen létrehozható.                                   |
| Jogosultság   | P2  | Telefonszám frissítése           | A regisztrált felhasználók bármikor frissíthetik a saját profiljukon megadott telefonszámukat.                     |
| Jogosultság   | P3  | Felhasználói fiók törlése        | Az adminisztrátorok törölhetik a felhasználói fiókokat szükség esetén.                                             |
| Kutya         | D1  | Kutyaprofil képfeltöltés         | Az adminisztrátorok képesek legyenek több képet feltölteni az egyes kutyaprofilokhoz, és kiválasztani egy profilképet. |
| Kutya         | D2  | Rövid és részletes leírás        | Minden kutyaprofil kétféle leírással rendelkezzen: egy rövid leírással a listázáshoz és egy részletes leírással a profiloldalon. |
| Kutya         | D3  | Szűrési funkció                  | A felhasználók a kutyákat kor, fajta és nem szerint szűrhetik a megfelelő kutya könnyebb megtalálása érdekében.    |
| Interakció    | I1  | Beépített chat                    | A felhasználók és adminisztrátorok valós idejű üzenetküldő felületen keresztül kommunikálhatnak az örökbefogadási folyamat során. |
| Megjelenítés  | M1  | Reszponzív webdizájn             | A weboldal reszponzív legyen, biztosítva a megfelelő megjelenést és használhatóságot minden eszközön.             |

## 7. Használati esetek

## 8. Képernyőtervek

### 8.1 Teljes weboldal:

Grafikus terveket lásd itt: [8.5 Mellékéet](#85-mellékklet)

A Chat megjelenítése minden aloldara vonatkozik. Számítógépen egy aloldalra való átlépéskor a chat nyitott állapotban
marad, egészen addig, amíg be nem zárjuk.

- **"Chat" gomb:** A jobb alsó gomb segítségével megnyitható a chat funkció.

### 8.2. "Kutyáink" menüpont:

Grafikus terveket lásd itt: [8.5 Mellékéet](#85-mellékklet)

Az oldal tetejéhez egy új fejléc kerül hozzáadásra, amely lehetővé teszi a kutyák közti keresést.

- **Szabad szavas keresőmező:** Lehetővé teszi a kulcsszavas keresést. Kereső funkció amely a kutya nevét és leírását
  vizsgálja.
- **Szűrés funkció:** A szűrést szeretnénk kor, nem és fajta alapján végrehajtani. Ha a checkbox-ot bepipáljuk,
  megjelenik egy legördülő menü, amelyben szereplenek azok a kifejezések, amelyekre szűrhetjük a találatot.
- **"Keresés" gomb:** Megnyomásával újratöltődnek a kutyák az adatbázisból, és a keresésnek/szűrésnek megfelelő
  eredmények
  jelennek meg.

### 8.3. Kutyaprofil:

- A kutya saját profilján egy részletesebb leírás jelenik meg.
- A kutyához tartozó többi kép itt jelenik meg.

#### 8.3.1 Adminisztrátori nézet:

- **"Új kép feltöltése" gomb:** Lehetővé teszi az új képek feltöltését.
- Képeket a "Szerkesztés" gombra kattintva is fel tudunk tölteni, itt állíthatjuk be a kutya elsődleges profilképét.

### 8.4. "Fiókom" menüpont:

#### 8.4.1 Felhasználói nézet:

Az oldalon mostmár látható a fiókhoz eltárolt telefonszám.

- **"Telefonszám szerkesztése" gomb:** Lehetővé teszi, hogy a telefonszám szerkeszthető legyen.

#### 8.4.2 Adminisztrátori nézet:

Megjelenik egy új szekció: **Felhasználók**. A regisztrált felhasználók e-mail cím és telefonszám párosítása itt jelenik meg.
- **"Felhasználó törlése" gomb:** Törli a felhasználó adatait és regisztrációját.

#### 8.5 Mellékklet:

![Chat_bezart.jpg](img/Chat_bezart.jpg)

![Chat_bezart.jpg](img/Chat_nyitott.jpg)


## 9. Forgatókönyvek
