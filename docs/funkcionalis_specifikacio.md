# Funkcionális specifikáció

---

## Tartalomjegyzék:

1. [Jelenlegi helyzet leírása](#1-jelenlegi-helyzet-leírása)

2. [Vágyálomrendszer leírása](#2-vágyálomrendszer-leírása)

3. [Megfeleltetés a jogi szabályoknak](#3-megfeleltetés-a-jogi-szabályoknak)

4. [Jelenlegi üzelti folyamatok modellje](#4-jelenlegi-üzelti-folyamatok-modellje)

5. [Igényelt üzleti folyamatok modellje](#5-igényelt-üzleti-folyamatok-modellje)

6. [Követelménylista](#6-követelménylista)

7. [Használati esetek](#7-használati-esetek)

8. [Képernyőtervek](#8-képernyőtervek)

   8.1. ["Kutyáink" menüpont](#81-kutyáink-menüpont)

   8.2. ["Rólunk" menüpont](#82-rólunk-menüpont)

   8.3. ["Fiókom" menüpont](#83-fiókom-menüpont)

   8.4. [Melléklet](#84-melléklet)

9. [Forgatókönyvek](#9-forgatókönyvek)

10. [Funkció – követelmény megfeleltetés](#10-funkció--követelmény-megfeleltetés)

---

## 1. Jelenlegi helyzet leírása

A menhely jelenlegi működése során az örökbefogadható kutyák adatainak kezelése és az örökbefogadási folyamat alapvetően
manuális és papír alapú történik. Az érdeklődők a kutya kiválasztása érdekében személyesen látogatják meg a menhelyet,
vagy pedig telefonon, illetve e-mailben kérnek tájékoztatást.
A jelenlegi papír alapú rendszer miatt az örökbefogadható kutyák adatainak frissítése és elérhetősége nem mindig
aktuális. Az adatok gyakori frissítése nehézkes, ami miatt az érdeklődők gyakran elavult információkat kapnak.
Az érdeklődők telefonos és e-mailes érdeklődései miatt a menhely munkatársainak sok időt kell fordítaniuk a
kommunikációra, ami csökkenti a feldolgozási hatékonyságot és növeli az adminisztrációs terheket.
Az örökbefogadási kérelmek feldolgozása a fent említett okokból hosszadalmas, és jelentős adminisztrációs terhet jelent
a menhely dolgozóinak, mivel a kutyák előrejelzett adoptálása és lefoglalása személyesen történik.
A potenciális gazdik számára az örökbefogadható kutyákról elérhető információk jelenlegi korlátozottsága hátráltatja az
örökbefogadási folyamatok hatékonyságát és gyorsaságát. Megrendelőnknek ezért igénye lenne egy felületre, ahol az
örökbefogadható kutyák adaitai szabadon elérhetőek.
Az örökbefogadási folyamat során és után a kapcsolattartás és utókövetés nehézkes lehet, mivel a jelenlegi rendszer nem
támogatja hatékonyan az örökbefogadók nyomon követését és támogatását.

## 2. Vágyálomrendszer leírása

A jövőbeni rendszer célja, hogy jelentősen javítsa az örökbefogadási folyamat hatékonyságát és felhasználói élményét a
menhelyen. A rendszer egy teljeskörű digitális megoldást kínál, amely lehetővé teszi az örökbefogadható kutyák
adatainak valós idejű kezelést és könnyű hozzáférést, online platformon keresztül.

Az örökbefogadható kutyák részletes adatainak, beleértve a fényképeket és leírásokat, központi digitális
adatbázisban tárolnánk.

A rendszer két szerepköre:

- **Adminisztrátor:**
    - A menhely dolgozói, akik hozzáadhatják, szerkeszthetik a kutyák adatait, és látják az
      örökbefogadási kérelmeket.

    - Az adatok folyamatosan frissíthetőek adminisztrátorként, így az érdeklődők mindig aktuális információkat kapnak.

- **Felhasználó:**
    - Az érdeklődők online katalógusban böngészhetnek az örökbefogadható kutyák között, kereshetnek
      különböző szűrők (például életkor, méret, fajtajellemzők) alapján, és könnyen megtalálhatják az igényeiknek
      megfelelő
      kedvenceket.

    - Az érdeklődők számára lehetőséget biztosít egy online űrlap kitöltésére, ahol érdeklődést nyújthatnak be, valamint
      kérdéseket tehetnek fel az örökbefogadható kutyákról. Ez gyorsítja a kommunikációs folyamatokat, és csökkenti az
      adminisztrációs terheket.

Ez a rendszer automatizálná és digitalizálná a kutyák örökbefogadásának folyamatát, megkönnyítve a menhely és az
örökbefogadók közötti kommunikációt.Jelentősen csökkenti az adminisztrációs terheket, növeli az örökbefogadási folyamat
hatékonyságát, és javítja az érdeklődők és az örökbefogadók élményét, hozzájárulva ezzel a menhely munkájának
sikerességéhez és hatékonyságához.

## 3. Megfeleltetés a jogi szabályoknak

## 4. Jelenlegi üzelti folyamatok modellje

Jelenleg minden üzleti folyamat manuálian történik.

## 5. Igényelt üzleti folyamatok modellje

### 5.2. Felhasználó regisztrációja

A weboldalon lehetőség van felhasználó beléptetésére, vagy új regisztrálására.
A regisztrációhoz e-mail cím és telefonszám, illetve jelszó megadása szükséges.

### 5.1. Örökbefogadható kutyák regisztrálása

Amennyiben egy adminisztrátor van bejelentkezve, egy "Új kutya regisztrálása" menüpont elérhetővé
válik. Az oldalon megkell adnia az adminisztrátornak a kutya nevét, adatait, leírását és egy képet
kell csatolnia hozzá. Amennyiben ezek mind teljesültek, a kutya regisztrálható a "Regisztrálás"
gombra kattintva.

### 5.2. Örökbefogadható kutyák listája

Bármely felhasználható megtekintheti az örökbefogadható kutyák listáját. A listán minden kutyának
a neve, fényképe és adatai szerepelnek, illetve hogy valaki örökbe szeretné-e már fogadni.

### 5.3. Kutyák leírásai

Az örökbefogadható kutyák listájában egy adott kutya listaelemére kattintva megnyílik annak bővebb
részletei. Itt megtalálható a kutya adatainak részletesebb leírása, a kutya leírása.

### 5.4. Örökbefogadás

Egy örökbefogadható kutyának a részletesebb nézetében megtalálható egy "Örökbefogadom!" gomb.
Amennyiben a felhasználó nincs bejelentkezve, a gomb nem kattintható, és a
"Örökbefogadáshoz jelentkezz be!" felirata van.
Amennyiben a kutyát valaki már szeretné örökbefogadni, a gomb felirata "Örökbefogadnak!",
és nem lehet rákattintani.

Amennyiben örökbefogadás gombra kattint a felhasználó, egy megerősítő dialógust követően a menhely
dolgozói felveszik a kapcsolatot a felhasználóval, és elintézik a szükséges adatkezelési
követelményeket az örökbefogadáshoz.
Amennyiben a felhasználóval nem lehet felvenni a kapcsolatot egy héten belül, a kutya elveszti az
örökbefogadásban lévő állapotát. Amennyiben az örökbefogadás során a menhely dolgozói problémába
ütköznek, a kutya állapotát az adminisztrátor bármikor visszaállíthatja.

## 6. Követelménylista

## 7. Használati esetek

## 8. Képernyőtervek

### 8.1. "Kutyáink" menüpont:

Az oldal központi része a kutyák böngészésére szolgáló felület. A felhasználók itt tekinthetik meg az örökbefogadható
kutyák listáját. A listában minden kutya képe, neve és rövid leírása látható. A felhasználók szűrő- és keresési
lehetőségek segítségével könnyen megtalálhatják az érdeklődésüknek megfelelő kutyát.
Minden kutyának saját adatlapja van, amely tartalmazza a kutya fényképeit, leírását.

#### 8.1.1 Felhasználói nézet:

Grafikus tervet lásd itt: [8.4.1 Melléklet](#841-kutyáink-menüpont---felhasználói-nézet)

- **"Adoptálás" gomb:** Ezen a gombon keresztül a felhasználók elérhetik az örökbefogadási űrlapot. Itt megadhatják
  nevüket, telefonszámukat, e-mail címüket és kérdéseiket. Az űrlap kitöltése után az adatok automatikusan elküldésre
  kerülnek a menhely adminisztrátoraihoz, akik válaszolnak a beérkező kérdésekre.

#### 8.1.2 Adminisztrátori nézet:

Grafikus tervet lásd itt: [8.4.2 Melléklet](#842-kutyáink-menüpont---adminisztrátori-nézet)

- **"Szerkesztés" gomb:** Minden kutya adatlapján található egy "Szerkesztés" gomb, amely lehetővé teszi az
  adminisztrátorok számára, hogy frissítsék a kutyával kapcsolatos információkat, például a leírást, képeket.
- **"Törlés" gomb:** Az "Adoptálás" menüpont alatt egy "Törlés" gomb is elérhető, amely lehetővé teszi az
  adminisztrátorok számára, hogy eltávolítsák a kutyát az adatbázisból, ha például már nem elérhető örökbefogadásra.

### 8.2. "Rólunk" menüpont:

Ez a menüpont tartalmazza a menhely kapcsolattartási adatait, például telefonszámot, e-mail címet és a menhely
címét. A felhasználók itt találhatják meg az információkat, ha közvetlenül szeretnének kapcsolatba lépni a menhellyel.
Adminisztrátorként a tartalom szerkeszthető.

### 8.3. "Fiókom" menüpont:

#### 8.3.1 Felhasználói nézet:

A felhasználók a "Fiókom" gombra kattintva hozzáférhetnek az általuk leadott örökbefogadási kérelmek státuszához. Itt
nyomon követhetik a kéréseik előrehaladását.

#### 8.3.2 Adminisztrátori nézet:

Az adminisztrátorok számára a "Fiókom" gomb alatt egy adminisztrátori panel található, ahol kezelhetik és nyomon
követhetik az összes beérkező örökbefogadási kérelmet. Itt láthatják az összes új
kérelmet, és kezelhetik azok státuszát.

### 8.4 Melléklet:

#### 8.4.1 "Kutyáink" menüpont - Felhasználói nézet:
![felhasznalo.jpg](img%2Ffelhasznalo.jpg)

#### 8.4.2 "Kutyáink" menüpont - Adminisztrátori nézet:
![admin.jpg](img%2Fadmin.jpg)

## 9. Forgatókönyvek

## 10. Funkció – követelmény megfeleltetés
