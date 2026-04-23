<div align="left">

# Vizsgaremek Backend

Backend szolgáltatás a vizsgaremek projekthez, NestJS + Prisma alapokon.

</div>

---

## Telepítés és indítás

Klónozd a repository-t, majd telepítsd a függőségeket:

```bash
git clone https://github.com/SzofiaKaszas/vizsgaremek_backend.git
cd vizsgaremek_backend
npm install
```

---

## Környezeti változók

Hozz létre egy `.env` fájlt a projekt gyökerében az alábbi tartalommal:

```env
PORT=3000
DATABASE_URL="mysql://root@localhost:3306/kezzy"
```

---

## Adatbázis beállítás

1. Indítsd el a helyi szervert (pl. Laragon vagy XAMPP)
2. Hozd létre az adatbázist: `kezzy`
3. Futtasd a Prisma migrációt:

```bash
npx prisma db push
```

4. Seedeld az adatbázist teszt adatokkal:

```bash
npx tsx ./prisma/seed.ts
```

---

## Szerver indítása

```bash
npm run start
```

A backend alapértelmezetten a következő címen érhető el:
http://localhost:3000

---

## Használt technológiák

*  NestJS
*  Prisma ORM
*  Faker (adatgenerálás)
*  class-validator

---

## Hibakezelés

* Győződj meg róla, hogy a MySQL fut
* Ellenőrizd a `.env` fájl helyességét
* Ha hiba van Prisma-nál:

  ```bash
  npx prisma generate
  ```
* Ha seed nem fut:

  ```bash
  npm install tsx
  ```

---

## Megjegyzés

* Laragon vagy XAMPP szükséges a lokális adatbázishoz
* Ha port ütközés van, módosítsd a `PORT` értékét a `.env` fájlban

---

</div>
