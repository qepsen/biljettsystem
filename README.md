# Biljettsystem

## Beskrivning

Ett enkelt fullstack-biljettsystem byggt för att öva på CORS mellan en
front end (React) och en back end (Express + better-sqlite3).

Man kan:

- Skapa en ny biljett (får en slumpmässig kod)
- Använda en biljett genom att mata in koden (kan bara göras en gång)
- Radera en biljett som inte är använd
- Lista alla biljetter och se om de är använda eller inte

## Databasdesign

En tabell räcker, det finns bara en typ av data i systemet.
Ingen relation behövs.

```
tickets
┌───────────────┬─────────┬──────────────────────────┐
│ id             │ INTEGER │ Primärnyckel, autoinkr.  │
│ code           │ TEXT    │ Unik biljettkod          │
│ used           │ INTEGER │ 0 = oanvänd, 1 = använd  │
│ created_at     │ TEXT    │ När biljetten skapades    │
│ used_at        │ TEXT    │ När biljetten användes    │
└───────────────┴─────────┴──────────────────────────┘
```

## Säkerhet

DELETE-endpointen är öppen utan autentisering i den här versionen.
I ett produktionssystem skulle radering kräva att användaren är
inloggad och har rätt roll, till exempel via en API-nyckel eller
JWT-token som backend verifierar innan raderingen tillåts.
Det implementerades inte här eftersom fokus i uppgiften låg på
CORS och grundläggande backend-arkitektur, inte autentisering.

## Kom igång

### Backend

```bash
cd backend
npm install
npm run dev
```

Servern startar på `http://localhost:5000` och läser `.env.development`.
Databasfilen `tickets.db` skapas automatiskt vid start.

Kör tester:

```bash
npm test
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Sidan startar på `http://localhost:5173` och läser `.env.development`.

Kör tester:

```bash
npm test
```

### Produktion

Sätt `NODE_ENV=production` för backend och bygg frontend med
`npm run build`. Då används `.env.production` istället, och
CORS tillåter bara produktionsadressen, inte `localhost`.
Kom ihåg att byta ut placeholder-adresserna i `.env.production`
mot era riktiga domäner innan ni deployar.

## Hur "Vanliga misstag" hanteras i det här projektet

- **Portar**: backend har `cors({ origin: allowedOrigin })` med frontendens
  port explicit tillåten, så att `:5173` får prata med `:5000`.
- **Dev vs. prod**: `.env.development` och `.env.production` växlas
  automatiskt via `NODE_ENV`, både i backend och frontend.
- **Preflight (OPTIONS)**: `cors`-paketet hanterar `OPTIONS`-anrop
  automatiskt, så `POST` och `DELETE` fungerar utan extra kod.
- **Slash i adressen**: alla endpoints anropas konsekvent utan
  avslutande `/`, både i backend-routes och i frontendens `api.js`.

## Kodproblem jag stötte på 

**Problem:** Efter `npm install` och `npm run dev` i backend-mappen fick jag
felmeddelandet `'NODE_ENV' is not recognized as an internal or external
command` i PowerShell på Windows.

**Orsak:** Mina npm-scripts satte miljövariabeln så här:
`NODE_ENV=development node --watch server.js`. Den syntaxen fungerar i
bash/zsh (Mac/Linux), men PowerShell och cmd på Windows förstår den inte.

**Lösning:** Installerade paketet `cross-env` som devDependency och
uppdaterade scripten till t.ex. `cross-env NODE_ENV=development node
--watch server.js`. `cross-env` sätter miljövariabeln på ett sätt som
funkar oavsett operativsystem, så samma script körs nu likadant på
Windows, Mac och Linux.