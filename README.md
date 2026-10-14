# Mål

Vi bygger en returkontroll för en webbshop. Programmet ska läsa ett returärende, avgöra om returen godkänns och visa hur mycket kunden får tillbaka.

När programmet är färdigt finns ett avsiktligt fel kvar i startkoden. Vi använder Console för att hitta och rätta just det felet.

# Startpunkt

Vi arbetar självständigt efter workshopen med dessa filer:

- `index.html` innehåller det färdiga gränssnittet och laddar Tailwind CSS v4.
- `script.js` innehåller objektet `returnRequest`, två påbörjade funktioner och kod som visar resultatet.

Vi öppnar `index.html` i webbläsaren och har DevTools Console synlig. Ingen installation behövs.

# Returregler

- Om kvitto saknas blir statusen `Kvitto saknas`.
- Om kvitto finns och köpet är högst `30` dagar gammalt blir statusen `Retur godkänd`.
- Annars blir statusen `Returperioden har gått ut`.
- En godkänd retur ger tillbaka hela produktpriset.
- En retur som inte godkänns ger `0` kronor tillbaka.

Med startvärdena ska returkontrollen visa:

- Kunden `Johan`.
- Produkten `Trådlösa hörlurar`.
- Statusen `Returperioden har gått ut`.
- Återbetalningen `0 kr`.

# Del 1: Avgör returstatus

1. Läs objektet `returnRequest`.
2. Färdigställ `getReturnStatus`. Funktionen tar emot `hasReceipt` och `daysSincePurchase`.
3. Använd `if` och `else` för att returnera rätt status enligt returreglerna.

# Del 2: Räkna ut återbetalningen

1. Färdigställ `calculateRefund`. Funktionen tar emot `status` och `productPrice`.
2. Returnera `productPrice` när statusen är `Retur godkänd`.
3. Returnera annars `0`.

# Del 3: Hitta det avsiktliga felet

När funktionerna är färdiga visar sidan fel status och återbetalning. Funktionslogiken behöver inte skrivas om.

1. Läs Console-raden som börjar med `getReturnStatus fick:`.
2. Jämför värdenas ordning med parametrarna i `getReturnStatus`.
3. Rätta det enda felaktiga funktionsanropet.
4. Ladda om sidan.

Efter ändringen ska Console visa `true 45` för parametrarna. Gränssnittet ska visa `Returperioden har gått ut` och `0 kr`.

# Del 4: Förklara lösningen

Skriv två korta kommentarer i `script.js`:

- En kommentar som förklarar varför `45` dagar inte godkänns.
- En kommentar som förklarar varför argumentens ordning måste följa parametrarnas ordning.

# Om resultatet inte stämmer

Om statusen fortfarande blir fel kontrollerar vi att funktionerna använder `return`, att gränsen är `30` och att argumenten har samma ordning som parametrarna.

# Kontroll när vi är klara

Vi är klara när:

- Objektet `returnRequest` levererar all data till programmet.
- `getReturnStatus` använder `if` och `else` för de tre returresultaten.
- `calculateRefund` returnerar rätt belopp från status och produktpris.
- Det felaktiga funktionsanropet är rättat.
- Gränssnittet visar `Johan`, `Trådlösa hörlurar`, `Returperioden har gått ut` och `0 kr`.
- Console visar inga felmeddelanden.
