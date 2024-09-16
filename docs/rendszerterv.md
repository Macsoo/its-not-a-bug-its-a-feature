# Rendszerterv

---

## Tartalomjegyzék:

1. [A rendszer célja](#1-a-rendszer-célja)

2. [Projekt terv](#2-projekt-terv)

3. [Üzleti folyamatok modellje](#3-üzleti-folyamatok-modellje)

4. [Követelmények](#4-követelmények)

5. [Funkcionális terv](#5-funkcionális-terv)

6. [Fizikai környezet](#6-fizikai-környezet)

7. [Absztarkt domain modell](#7-absztarkt-domain-modell)

8. [Architekturális terv](#8-architekturális-terv)

9. [Adatbázis terv](#9-adatbázis-terv)

10. [Implementációs terv](#10-implementációs-terv)

11. [Tesztterv](#11-tesztterv)

12. [Telepítési terv](#12-telepítési-terv)

13. [Karbantartási terv](#13-karbantartási-terv)

---

## 1. A rendszer célja

A rendszer célja, hogy egy webalapú alkalmazást biztosítson a menhely számára, amely hatékonyan kezeli és prezentálja az
örökbefogadható kutyák adatait a potenciális gazdiknak. A rendszer lehetővé teszi a felhasználók számára, hogy
böngésszenek a kutyák között, megismerjék azok alapvető jellemzőit – mint például név, kor, nem –, és online
lefoglalhassák őket örökbefogadásra. Az adminisztrátorok, a menhely dolgozói, hozzáadhatják, szerkeszthetik a kutyák
adatait, és feldolgozhatják az örökbefogadási kérelmeket.

Nem célja a rendszernek, a kutyák állapotának vagy egészségügyi adatainak részletes orvosi nyilvántartása. Az orvosi
adatok
kezelése nem képezi részét az alkalmazás funkcionalitásának.
Nem célja, hogy pénzügyi tranzakciókat vagy adománygyűjtést bonyolítson le a felhasználók és a menhely között. A
rendszer nem tartalmaz online fizetési rendszert vagy adományozási modult.
A rendszer nem biztosít logisztikai szolgáltatásokat, például a kutyák szállításának megszervezését. Az örökbefogadás
folyamata kizárólag a menhely és az örökbefogadó között zajlik.

## 2. Projekt terv

### 2.1 Projekt munkások és felelősségeik

- **Projektvezető: Bagoly Luca**
    - Felelős a projekt egészéért, a határidők betartásáért, az erőforrások elosztásáért és a projekt előrehaladásának
      nyomon követéséért.
    - Biztosítja a kommunikációt a csapattagok között, valamint a megrendelővel való kapcsolattartást.

- **Fejlesztőcsapat vezető: File Tibor**
    - Felügyeli és koordinálja a fejlesztői csapat munkáját, biztosítja, hogy a technikai feladatok megfelelően legyenek
      végrehajtva.
    - A fejlesztési ütemterv betartásáért és a technikai kihívások megoldásáért felel.

- **Frontend fejlesztő: Bagoly Luca**
    - Felelős az alkalmazás felhasználói felületének fejlesztéséért, a reszponzív design megvalósításáért és a
      felhasználói élmény optimalizálásáért.

- **Backend fejlesztő: Bánvölgyi Bence**
    - A szerveroldali logika fejlesztéséért felelős, beleértve az adatbázisok kezelését, az API-k fejlesztését és az
      üzleti logika megvalósítását.

- **UI/UX tervező: Bagoly Luca**
    - Az alkalmazás vizuális megjelenéséért és felhasználói élményének kialakításáért felelős, biztosítva, hogy a
      rendszer intuitív és felhasználóbarát legyen.

- **Tesztelő: Bagoly Luca, File Tibor, Bánvölgyi Bence**
    - Felelős az alkalmazás hibamentességének ellenőrzéséért, különböző funkcionális és nem funkcionális tesztek
      végrehajtásáért, valamint a hibák dokumentálásáért és nyomon követéséért.

- **Rendszeradminisztrátor: File Tibor, Bánvölgyi Bence**
    - Felelős az alkalmazás hosztolásáért, a szerverek és adatbázisok üzemeltetéséért, valamint a biztonsági
      intézkedések alkalmazásáért.

### 2.2 Ütemterv

Az ütemterv a projekt különböző szakaszainak időbeli ütemezését mutatja. Az alábbiakban a főbb fázisok és a hozzájuk
rendelt időintervallumok láthatók:

- **1. Szakasz: Követelményspecifikáció és Funkcionális specifikáció meghatározása** – 2 hét
    - Cél: Az alkalmazás funkcionalitásának részletes meghatározása.

- **2. Szakasz: Rendszerterv elkészítése** – 1 hét
    - Cél: Az alkalmazás rendszertervének meghatározása.

- **3. Szakasz: Fejlesztés/Tesztelés** – 1 hét
    - Cél: Frontend és backend fejlesztés, adatbázis kialakítása. A rendszer hibamentességének ellenőrzése, funkcionális
      és nem funkcionális tesztek.

### 2.3 **Mérföldkövek**

A mérföldkövek olyan fontos szakaszok, amelyeket a projekt során el kell érni:

- **Követelményspecifikáció és funkcionális specifikáció elkészítése** – 1. hét vége
- **Backend API és adatbázis kész** – 3. hét vége
- **Frontend alapfunkciók elkészülése** – 3. hét vége
- **Tesztelés megkezdése** – 3. hét eleje
- **Hibajavítások lezárása** – 3. hét vége


## 3. Üzleti folyamatok modellje

## 4. Követelmények

## 5. Funkcionális terv

## 6. Fizikai környezet

## 7. Absztarkt domain modell

## 8. Architekturális terv

## 9. Adatbázis terv

## 10. Implementációs terv

## 11. Tesztterv

## 12. Telepítési terv

## 13. Karbantartási terv
