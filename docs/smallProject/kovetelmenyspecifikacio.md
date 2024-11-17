# Követelményspecifikáció

---

## Tartalomjegyzék:
1. [Jelenlegi helyzet leírása](#1-jelenlegi-helyzet-leírása)

2. [Vágyálomrendszer leírása](#2-vágyálomrendszer-leírása)

3. [Megfeleltetés a jogi szabályoknak](#3-megfeleltetés-a-jogi-szabályoknak)

4. [Jelenlegi üzleti folyamatok modellje](#4-jelenlegi-üzleti-folyamatok-modellje)

5. [Igényelt üzleti folyamatok modellje](#5-igényelt-üzleti-folyamatok-modellje)

6. [Követelménylista](#6-követelménylista)

---


## 1. Jelenlegi helyzet leírása

Jelenleg a menhelyen az örökbefogadható kutyák adatainak kezelése és az örökbefogadási folyamat nagyrészt manuálisan,
papír alapon
történik. Az érdeklődők személyesen látogatják meg a menhelyet, hogy új kedvencet válasszanak maguknak, vagy pedig
telefonon,
illetve e-mailben kérnek tájékoztatást. Az örökbefogadási kérelmek feldolgozása hosszadalmas lehet, és
a menhely munkatársai számára jelentős adminisztrációs terhet jelent, hiszen a kutyák előrejelzett adoptálása és
lefoglalása személyesen történik.
A potenciális gazdik számára a jelenleg örökbefogadható kutyákról való tájékozodás és alapvető adatainak megismerése
korlátozott, ami csökkenti az örökbefogadások hatékonyságát és
sebességét.

## 2. Vágyálomrendszer leírása

Szeretnénk, hogy a leendő webalkalmazás lehetővé tegye, hogy a felhasználók online katalógusban böngészhessenek az
örökbefogadható kutyák között. Biztosítani akarjuk, hogy minden kutya alapvető adatai (mint a neve, kora és neme)
könnyen
elérhető legyen. Célunk, hogy a felhasználók jelezni tudják az adoptálási igényt a megfelelő kutyánál, valamint
egyszerűen kapcsolatba tudjanak lépni a menhellyel egy rövid üzenetküldő felületen, ahol telefonszámukat és e-mail
címüket is
megadhatják a kapcsolatfelvételhez.

A rendszer két fő felhasználói szerepkört támogatna:

- **Adminisztrátor:** A menhely dolgozói, akik hozzáadhatják, szerkeszthetik a kutyák adatait, és látják az
  örökbefogadási kérelmeket.
- **Felhasználó:** Az örökbefogadás iránt érdeklődők, akik böngészhetik az elérhető kutyákat, és kezdeményezhetik azok
  lefoglalását örökbefogadásra.

Ez a rendszer automatizálná és digitalizálná a kutyák örökbefogadásának folyamatát, megkönnyítve a menhely és az
örökbefogadók közötti kommunikációt.

## 3. Megfeleltetés a jogi szabályoknak

A magyar GDPR-szabályoknak megfelelően a weboldal nem tárol csak telefonszámokat és e-mail címeket jogos cél és a felhasználó kifejezett hozzájárulása nélkül. A GDPR értelmében az olyan személyes adatok, mint a telefonszámok és az e-mail címek érzékeny adatoknak minősülnek, és csak akkor szabad gyűjteni őket, ha az olyan konkrét, egyértelműen meghatározott célokra szükséges, mint a felhasználói megkeresése. A weboldal biztosítja, hogy a felhasználók tájékoztatást kapjanak arról, hogy az adataikat hogyan fogják felhasználni, és a gyűjtés előtt a hozzájárulást is beszerzik. Ezen túlmenően az adatok védelme érdekében szigorú biztonsági intézkedésekkel történik, és a felhasználóknak jogukban áll bármikor kérni az adataikhoz való hozzáférést, azok módosítását vagy törlését. Az adatmegőrzési politikák megfelelnek a GDPR iránymutatásainak, ami azt jelenti, hogy minden felesleges vagy elavult információt biztonságosan törölnek, miután a céljukat betöltötték.

## 4. Jelenlegi üzleti folyamatok modellje

### 4.1. Örökbefogadható kutyák regisztrálása

A menhelyre amint bekerül egy kutya, az elsődleges egészségügyi eljárásokat követően máris örökbe lehet fogadni,
azaz a regisztrálási folyamat jelenleg egybe van kötve a kutyák behozatalával.

### 4.2. Örökbefogadható kutyák listája

Az örökbefogadható kutyák listjáját személyesen, vagy e-mail esetleg telefonos formában a menhely egy munkatársa
segítségével lehet lekérdezni. A bent lévő kutyák közül amelyikhez nincs fent a "Örökbefogadtak!" felíratú tábla,
azok örökbefogadhatók.

### 4.3 Kutyák leírásai

Az menhely összes kutyájának van egy leírása (kor, nem, stb.), amely a kutyáknál megtalálhatók és elolvashatók
személyesen.

### 4.4 Örökbefogadás

A menhelyen található örökbefogadható kutyák listájából egy vagy több kutya örökbefogadásához a helyszínen kell
megkérni a menhely egy munkatársát, aki segítségével örökbefogadhatót később, vagy akár azonnal.

### 4.5 Kapcsolat

A menhely dolgozóival a kapcsolatot e-mailel vagy telefonon keresztül lehet felvenni. 

## 5. Igényelt üzleti folyamatok modellje

### 5.1 Örökbefogadható kutyák regisztrálása

A menhelyre amint behoznak egy kutyát, az egészségügyi eljárásokat követően az menhely weboldalának
adminisztrátora beregisztrálja azt, így onnantól kezdve örökbefogadható lesz a kutya. A regisztráció
elhagyható, későbbiekben így több funkciót is vállalhat a menhely melyek nem csak gazdátlan kutyákra
vonatkozna.

### 5.2 Örökbefogadható kutyák listája

A menhely weboldalán a beregisztrált örökbefogadható kutyák listája könnyen megtekinthető.

### 5.3 Kutyák leírásai

A weboldalon minden kutyának az adatait és leírásai könnyen megtekinthetők, nincs szükség személyes
megtekintésre.

### 5.4 Örökbefogadás

A menhely weboldalán található kutyákat a felhasználók jelezhetik, hogy szeretnék örökbefogadni.
Más felhasználók láthatják, hogy egy kutyát már valaki örökbe szeretne fogadni. Biztonsági okokból
a menhely gondozói személyesen tisztázzák az örökbefogadást, melyet követően a kutya lekerül a weboldalról.

### 5.5 Kapcsolat

A menhely dolgozóival felvenni a kapcsolatot e-mailel vagy telefonon keresztül lehet felvenni.
A weboldalon ezek az adatok könnyen megtalálhatók.

## 6. Követelménylista

| Modul | ID | Név | Kifejtés |
|-------|----|-----|----------|
| Jogosultság | P1 | Regisztráció | Minden felhasználó számára szükségesnek kell lennie, hogy tudjon regisztrálni. Ezt külön felület segítségével lehessen elérni. Felhasználónév, jelszó segítségével lehessen belépni. |
| Jogosultság | P2 | Belépés | Minden sikeresen regisztrált felhasználónak lehetséges legyen, a felhasználói adatok birtokában belépni. |
| Kutya | D1 | Kutya feltöltés | Az admin jogú felhasználók tudjanak új örökbefogadható kutyákat feltölteni, azok leírásával illetve képek feltöltésével nekik profilt létrehozni. |
| Kutya | D2 | Kutya örökbefogasdási igény jelzése | A felhasználók képesek legyenek az örökbefogadási szándékuk jelzésére bejelentkezés után, és ez megjelenjen a kutya profilján. |
| Értesítés | E1 | Értesítési email | A felhasználó által megadott email címének alapján, örökbefogadási szándékának jelzése után kap extra emailt az örökbefogadás menetéről és egyéb segítő adatokról. |
