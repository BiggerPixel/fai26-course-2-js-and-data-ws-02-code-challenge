# Lösningsförslag

Här följer vi en möjlig lösning från objektets data till det färdiga gränssnittet. Vi löser först returreglerna. Sedan kopplar vi ihop funktionerna, hittar felet i funktionsanropet och visar resultatet på sidan.

Med startvärdena ska lösningen visa:

- Kunden `Johan`.
- Produkten `Trådlösa hörlurar`.
- Statusen `Returperioden har gått ut`.
- Återbetalningen `0 kr`.

## Steg 1: Läs returärendet

Objektet `returnRequest` samlar all data om ett returärende. Varje värde är en egenskap i objektet.

```javascript title="solution/script.js"
const returnRequest = {
  customerName: "Johan",
  productName: "Trådlösa hörlurar",
  productPrice: 899,
  daysSincePurchase: 45,
  hasReceipt: true,
};
```

Vi använder punktnotation när vi senare behöver ett värde. `returnRequest.hasReceipt` ger exempelvis värdet `true` och `returnRequest.daysSincePurchase` ger värdet `45`.

Detta steg tränar objekt och egenskaper. Objektet blir programmets gemensamma datakälla, så vi behöver inte skriva samma värden på flera platser.

## Steg 2: Kontrollera om kvitto saknas

Vi börjar funktionen `getReturnStatus` med regeln som kan avsluta kontrollen direkt: en retur utan kvitto godkänns inte.

```javascript title="solution/script.js"
const getReturnStatus = (hasReceipt, daysSincePurchase) => {
  console.log("getReturnStatus fick:", hasReceipt, daysSincePurchase);

  if (hasReceipt === false) {
    return "Kvitto saknas";
  }
```

Parametrarna `hasReceipt` och `daysSincePurchase` är namn på de värden som funktionen ska ta emot. Villkoret jämför `hasReceipt` med `false`.

Om jämförelsen blir `true` returnerar funktionen texten `"Kvitto saknas"`. `return` skickar tillbaka resultatet och avslutar funktionen. Därför behöver vi inte kontrollera antalet dagar i detta fall.

Utskriften med `console.log` låter oss se vilka värden som faktiskt hamnar i parametrarna. Den returnerar inte returstatusen.

Detta steg tränar parametrar, villkor, `return` och spårning i Console.

## Steg 3: Kontrollera returperioden

Om kvitto finns fortsätter funktionen till nästa villkor. Här jämför vi antalet dagar med returgränsen på `30` dagar.

```javascript title="solution/script.js"
  // 45 dagar är mer än returgränsen på 30 dagar.
  if (daysSincePurchase <= 30) {
    return "Retur godkänd";
  } else {
    return "Returperioden har gått ut";
  }
};
```

Operatorn `<=` betyder mindre än eller lika med. Det gör att ett köp som är exakt `30` dagar gammalt fortfarande kan returneras.

Med startvärdet `45` blir jämförelsen:

```javascript
45 <= 30
```

Resultatet är `false`. JavaScript hoppar därför över `if`-grenen och kör `else`-grenen. Funktionen returnerar `"Returperioden har gått ut"`.

Funktionen kan nu ge alla tre möjliga resultat:

- `"Kvitto saknas"` när kvitto saknas.
- `"Retur godkänd"` när kvitto finns och högst `30` dagar har gått.
- `"Returperioden har gått ut"` när kvitto finns men mer än `30` dagar har gått.

Detta steg tränar hur `if` och `else` väljer en gren utifrån objektets data.

## Steg 4: Räkna ut återbetalningen

Nästa arrow function tar emot returstatusen och produktpriset. Hela priset betalas bara tillbaka när statusen är `"Retur godkänd"`.

```javascript title="solution/script.js"
const calculateRefund = (status, productPrice) => {
  if (status === "Retur godkänd") {
    return productPrice;
  } else {
    return 0;
  }
};
```

När villkoret är `true` returneras parametern `productPrice`. Annars returneras `0`.

Vår status är `"Returperioden har gått ut"`. Jämförelsen mot `"Retur godkänd"` blir därför `false`, så `else`-grenen returnerar `0`.

Detta steg tränar hur ett returvärde från en funktion kan styra vad nästa funktion returnerar.

## Steg 5: Hitta argumentfelet

Funktionerna är nu färdiga, men startkoden skickar argumenten i fel ordning:

```javascript
getReturnStatus(
  returnRequest.daysSincePurchase,
  returnRequest.hasReceipt,
);
```

Funktionens parametrar står i ordningen `hasReceipt, daysSincePurchase`. Argumenten måste följa samma ordning. I startkoden får `hasReceipt` värdet `45` och `daysSincePurchase` värdet `true`, vilket inte stämmer med vad parametrarna ska innehålla.

Console-raden inne i funktionen gör felet synligt. Före rättningen visar den:

```plaintext
getReturnStatus fick: 45 true
```

Vi rättar anropet genom att först skicka kvittovärdet och sedan antalet dagar:

```javascript title="solution/script.js"
// Argumentens ordning följer parametrarna hasReceipt och daysSincePurchase.
const status = getReturnStatus(
  returnRequest.hasReceipt,
  returnRequest.daysSincePurchase,
);
```

Efter rättningen visar Console:

```plaintext
getReturnStatus fick: true 45
```

Nu får `hasReceipt` värdet `true` och `daysSincePurchase` värdet `45`. Funktionen kan därför välja rätt gren.

Detta steg tränar skillnaden mellan parametrar och argument samt hur vi använder Console för att följa värden genom ett funktionsanrop.

## Steg 6: Skicka statusen till nästa funktion

Det returnerade värdet från `getReturnStatus` sparas i variabeln `status`. Sedan skickar vi det värdet vidare till `calculateRefund`.

```javascript title="solution/script.js"
const refundAmount = calculateRefund(status, returnRequest.productPrice);
```

Anropet kan följas med de konkreta värdena:

```javascript
calculateRefund("Returperioden har gått ut", 899);
```

Statusen är inte `"Retur godkänd"`, så funktionen returnerar `0`. Det värdet sparas i `refundAmount`.

Dataflödet är nu:

1. Objektet ger `true` och `45` till `getReturnStatus`.
2. `getReturnStatus` returnerar `"Returperioden har gått ut"`.
3. Statusen och priset `899` skickas till `calculateRefund`.
4. `calculateRefund` returnerar `0`.

Detta steg tränar ett sammanhängande dataflöde där ett returvärde används som argument i nästa del av programmet.

## Steg 7: Kontrollera värdena i Console

Vi skriver ut de två beräknade värdena innan de visas i gränssnittet.

```javascript title="solution/script.js"
console.log("Returstatus:", status);
console.log("Återbetalning:", refundAmount);
```

Console ska nu visa:

```plaintext
getReturnStatus fick: true 45
Returstatus: Returperioden har gått ut
Återbetalning: 0
```

Utskrifterna hjälper oss att kontrollera dataflödet. Värdena har redan returnerats och sparats innan `console.log` körs.

## Steg 8: Visa resultatet i gränssnittet

Till sist hämtar vi de förberedda HTML-elementen med `document.querySelector`. Egenskapen `textContent` ersätter elementens text.

```javascript title="solution/script.js"
document.querySelector("#customer-name").textContent =
  returnRequest.customerName;
document.querySelector("#product-name").textContent = returnRequest.productName;
document.querySelector("#return-status").textContent = status;
document.querySelector("#refund-amount").textContent = `${refundAmount} kr`;
```

Kundnamnet och produktnamnet kommer direkt från objektet. Statusen och återbetalningen kommer från funktionernas returvärden.

`${refundAmount} kr` använder en template literal för att kombinera värdet `0` med texten `kr`. Därför visar sidan `0 kr` i stället för bara `0`.

Detta steg tränar hur objektets data och funktionernas resultat visas i ett förberett gränssnitt.

## Kontroll av den färdiga lösningen

När vi öppnar `solution/index.html` ska gränssnittet visa `Johan`, `Trådlösa hörlurar`, `Returperioden har gått ut` och `0 kr`.

Vi kontrollerar också att:

- Console visar `getReturnStatus fick: true 45`.
- Console visar rätt status och återbetalning.
- Console inte visar några felmeddelanden.
- `getReturnStatus` kan returnera alla tre statusar enligt returreglerna.
- `calculateRefund` bara returnerar produktpriset för en godkänd retur.

Om något inte stämmer följer vi värdena i samma ordning igen: objekt, argument, parametrar, vald gren, returvärde och gränssnitt.
