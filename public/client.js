
const rollCharacters = function() {
   let element = document.getElementById("turnAction");
   while (element.firstChild) {
      element.removeChild(element.firstChild);
   }
   loadCharacters(allCharacters());
}

const getDeck = function(deck) {
   if(deck === 'deckAssassin') return deckAssassin;
   if(deck === 'deckBerserk') return deckBerserk;
   if(deck === 'deckMagician') return deckMagician;
   if(deck === 'deckPaladin') return deckPaladin;
   if(deck === 'deckWebSamurai') return deckWebSamurai;
}

const getDiscardPile = function(deck) {
   if(deck === 'deckAssassin') return discardPileAssassin;
   if(deck === 'deckBerserk') return discardPileBerserk;
   if(deck === 'deckMagician') return discardPileMagician;
   if(deck === 'deckPaladin') return discardPilePaladin;
   if(deck === 'deckWebSamurai') return discardPileWebSamurai;
}

const shuffle = function(deck) {
   let deckShuffle = [];
   deckShuffle = deck.sort(function() {return Math.random() - 0.5});
   return deckShuffle;
}

const draw = function(deck) {
   const cards = document.getElementById(deck.id + "Cards");
   while (cards.firstChild) { //limpia la mano cada vez que se roba
      cards.removeChild(cards.firstChild);
   }
   let discardPile = getDiscardPile(deck.id),
      deckReference = shuffle(getDeck(deck.id)),
      shuffleDeck = deckReference.slice();

   const len = deckReference.length;

   if(len >= 4) {
      showCards(shuffleDeck, deckReference, discardPile, cards);
   } else {
      const restoreDeck = shuffle(discardPile).slice();
      discardPile.length = 0;
      restoreDeck.forEach(element => {
         shuffleDeck.push(element);
         deckReference.push(element);
      });
      showCards(shuffleDeck, deckReference, discardPile, cards);
   }
}

const showCards = function(shuffleDeck, deckReference, discardPile, cards){
   for(let i = 0; i < 4; i++) {
      let li = document.createElement('li'),
         atributeLi = document.createAttribute('class');
      atributeLi.value = 'list-group-item';
      li.setAttributeNode(atributeLi);
      li.innerHTML = `<b>${shuffleDeck[i].name}</b> <br> ${shuffleDeck[i].effect}`;
      cards.appendChild(li);
      discardPile.push(shuffleDeck[i]);
      deckReference.shift();
   }
}

const loadCharacters = function(allCharacters) {
   const turnAction = document.getElementById("turnAction");

   allCharacters.forEach(c => {
      let li = document.createElement('li'),
         atributeLi = document.createAttribute('class');
      atributeLi.value = 'list-group-item';
      li.setAttributeNode(atributeLi);

      var div = document.createElement('div'),
         atributeDiv = document.createAttribute('class');
      atributeDiv.value = 'row';
      div.setAttributeNode(atributeDiv);

      for(let i = 0; i < 3; i++) {
         let span = document.createElement('span'),
            atributeSpan = document.createAttribute('class');
         atributeSpan.value = 'col-sm';
         span.setAttributeNode(atributeSpan);
         if(i===0) span.innerHTML = c.class;
         if(i===1) span.innerHTML = c.health;
         if(i===2) span.innerHTML = c.movement;
         div.appendChild(span)
      }

      li.appendChild(div)
      turnAction.appendChild(li);
   });
}

const allCharacters = function() {
   const allCharacters = characters.concat(enemies);
   allCharacters.forEach(a => {
      a.position = a.initiative + Math.floor((Math.random() * 100) + 1); // TODO range to roll
   });
   allCharacters.sort(function (a, b) {
      if (a.position > b.position) {
        return -1;
      }
      if (a.position < b.position) {
        return 1;
      }
      return 0; // a must be equal to b
    });
   return allCharacters;
}

const characters = [
   {
      "class": "Assassin Creed",
      "health": 35,
      "initiative": 7,
      "movement": 6
   },
   {
      "class": "Berserk",
      "health": 45,
      "initiative": 5,
      "movement": 5
   },
   {
      "class": "Magician",
      "health": 35,
      "initiative": 4,
      "movement": 4
   },
   {
      "class": "Paladin",
      "health": 50,
      "initiative": 3,
      "movement": 4
   },
   {
      "class": "Weeb Samurai",
      "health": 40,
      "initiative": 4,
      "movement": 5
   },
];

const enemies = [
   {
      "class": "Archer",
      "health": 30,
      "initiative": 4,
      "movement": 4
   },
   {
      "class": "Assassin",
      "health": 30,
      "initiative": 6,
      "movement": 5
   },
   {
      "class": "Bones",
      "health": 35,
      "initiative": 7,
      "movement": 6
   },
   {
      "class": "Bones",
      "health": 35,
      "initiative": 7,
      "movement": 6
   },
   {
      "class": "Brawler",
      "health": 40,
      "initiative": 6,
      "movement": 4
   },
   {
      "class": "Brawler",
      "health": 40,
      "initiative": 6,
      "movement": 4
   },
   {
      "class": "Wolfs",
      "health": 35,
      "initiative": 7,
      "movement": 6
   },
   {
      "class": "Wolfs",
      "health": 35,
      "initiative": 7,
      "movement": 6
   },
   {
      "class": "Wolfs",
      "health": 35,
      "initiative": 7,
      "movement": 6
   },
];

//MAZOS Y PILAS DE DESCARTE
const deckAssassin = [
   {
      "id": 0,
      "name": "Basic Attack",
      "hurt": 5,
      "effect": "Hace 5 de daño"
   },
   {
      "id": 1,
      "name": "Basic Attack",
      "hurt": 5,
      "effect": "Hace 5 de daño"
   },
   {
      "id": 2,
      "name": "Sword Dance",
      "hurt": 0,
      "effect": "Ganan 1 de movimiento y roba una carta."
   },
   {
      "id": 3,
      "name": "Sword Dance",
      "hurt": 0,
      "effect": "Ganan 1 de movimiento y roba una carta."
   },
   {
      "id": 4,
      "name": "Sword Dance",
      "hurt": 0,
      "effect": "Ganan 1 de movimiento y roba una carta."
   },
   {
      "id": 5,
      "name": "Stab",
      "hurt": 6,
      "effect": "Muevete hasta 2 espacios, haz 6 de daño de corte, muevete hasta 2 espacios."
   },
   {
      "id": 6,
      "name": "Final Strike",
      "hurt": 6,
      "effect": "Hace 6 de daño por cada carta jugada este turno. Tu turno termina inmediatamente."
   },
   {
      "id": 7,
      "name": "ThrowKnife",
      "hurt": 5,
      "effect": "Hace 5 de daño a un personaje a 3 espacios de distancia, si esta stuneado, 5 mas."
   },
   {
      "id": 8,
      "name": "Run Forest",
      "hurt": 0,
      "effect": "Recupera todos tus puntos de movimiento"
   }
]
const discardPileAssassin = [];

const deckBerserk = [
   {
      "id": 0,
      "name": "Basic Attack",
      "hurt": 5,
      "effect": "Hace 5 de daño"
   },
   {
      "id": 1,
      "name": "Basic Attack",
      "hurt": 5,
      "effect": "Hace 5 de daño"
   },
   {
      "id": 2,
      "name": "Basic Attack",
      "hurt": 5,
      "effect": "Hace 5 de daño"
   },
   {
      "id": 3,
      "name": "Basic Attack",
      "hurt": 5,
      "effect": "Hace 5 de daño"
   },
   {
      "id": 4,
      "name": "Basic Attack",
      "hurt": 5,
      "effect": "Hace 5 de daño"
   },
   {
      "id": 5,
      "name": "Battle Cry",
      "hurt": 0,
      "effect": "Descarta todos los miedos de tu mano y mazo. Gana 50% de daño y dos de movimiento. "
         + "Los aliados a 3 de distancia o menos tienen 30% de probabilidad de recibir un miedo. Baraja en tu mazo un exhausto."
   },
   {
      "id": 6,
      "name": "Inmortal",
      "hurt": 0,
      "effect": "Tu HP no pude bajar a menos de 1 hasta el comienzo de tu proximo turno. "
        + " Gana 25% de daño en tu proximo turno, 100% al comienzo del mismo si tu hp es 5 o menos. Pon 2 exhausto en tu descarte."
   },
   {
      "id": 7,
      "name": "Me stronk",
      "hurt": 6,
      "effect": "Solo puedes usar esta carta si es la primera en tu turno, muevete a uno de los enemigos mas cercano usando todos tus movimientos y haces 6 de daño de embote."
   },
   {
      "id": 8,
      "name": "Spin to Win",
      "hurt": 4,
      "effect": "Hace 4 de daño a todos los personajes adyacentes."
   }
]
const discardPileBerserk = [];

const deckMagician = [
   {
      "id": 0,
      "name": "Healing",
      "hurt": 7,
      "effect": "Cura 7 un aliado a 4 de distancia."
   },
   {
      "id": 1,
      "name": "Healing",
      "hurt": 7,
      "effect": "Cura 7 un aliado a 4 de distancia."
   },
   {
      "id": 2,
      "name" : "Healing",
      "hurt": 7,
      "effect": "Cura 7 un aliado a 4 de distancia."
   },
   {
      "id": 3,
      "name": "Fireball",
      "hurt": 8,
      "effect": "Hace 8 de daño a un caracter a 4 de distancia. Luego 4 a todos los caracteres alrededor."
   },
   {
      "id": 4,
      "name": "Calm",
      "hurt": 0,
      "effect": "Remueve hasta 2 miedos del mazo o poso de descarte de un aliado."
   },
   {
      "id": 5,
      "name": "Max Healing",
      "hurt": 12,
      "effect": "Cura 12 a un personaje a 4 de distancia. Cura todas sus condiciones."
   },
   {
      "id": 6,
      "name": "Thunderbolt",
      "hurt": 4,
      "effect": "Hace 4 de daño a un enemigo a 4 de distancia. Luego 3 de daño a un enemigo diferente a 3 de distancia del anterior. "
         + "Luego 3 de daño a un enemigo diferente a los dos anteriores"
   },
  {
      "id": 7,
      "name": "Wind",
      "hurt": 5,
      "effect": "Aumenta la iniciativa de todos los aliados en 2. Aumenta los movimientos de todos los aliados en 2. "
         + "Los aliados pueden moverse un espacio al final de su turno. Persiste hasta que causes daño."
   }
]
const discardPileMagician = [];

const deckPaladin = [
   {
      "id": 0,
      "name": "Basic Attack",
      "hurt": 5,
      "effect": "Hace 5 de daño a un enemigo adyacente."
   },
   {
      "id": 1,
      "name": "Basic Attack",
      "hurt": 5,
      "effect": "Hace 5 de daño a un enemigo adyacente."
   },
   {
      "id": 2,
      "name": "Basic Attack",
      "hurt": 5,
      "effect": "Hace 5 de daño a un enemigo adyacente."
   },
   {
      "id": 3,
      "name": "Basic Attack",
      "hurt": 5,
      "effect": "Hace 5 de daño a un enemigo adyacente."
   },
   {
      "id": 4,
      "name": "Shield Smash",
      "hurt": 12,
      "effect": "Muevete hasta 4 espacios y haces 12 de daño a un enemigo adyacente y empujalo a 1 de distancia. Si la distancia recorrida es 0 lo stuneas."
   },
   {
      "id": 5,
      "name": "Holy Ground",
      "hurt": 0,
      "effect": "Tu tus aliados adyacentes se curan 3 de HP al final de cada uno de tus turnos. El efecto persiste hasta que abandones el area o juegues otro holly ground."
   },
   {
      "id": 6,
      "name": "Indestructible",
      "hurt": 0,
      "effect": "Reduce todo el daño recibido en 4. Eres inmune a efectos de empujar o atraer."
   },
  {
      "id": 7,
      "name": "Justice",
      "hurt": 5,
      "effect": "5 de daño de embotado. Si el enemigo te daño en su turno anterior recibe 10 mas de daño."
   },
   {
      "id": 8,
      "name": "For the Glory",
      "hurt": 0,
      "effect": "Todos los aliados a 3 de distancia reciclan toda carta de miedo y ganan 3 de movimiento hasta el comienzo de tu proximo turno."
   }
]
const discardPilePaladin = [];

const deckWebSamurai = [
   {
      "id": 0,
      "name": "Basic Attack",
      "hurt": 4,
      "effect": "Hace 4 de daño si tu espada esta desenfundada."
   },
   {
      "id": 1,
      "name": "Basic Attack",
      "hurt": 4,
      "effect": "Hace 4 de daño si tu espada esta desenfundada."
   },
   {
      "id": 2,
      "name": "Basic Attack",
      "hurt": 4,
      "effect": "Hace 4 de daño si tu espada esta desenfundada."
   },
   {
      "id": 3,
      "name": "Basic Attack",
      "hurt": 4,
      "effect": "Hace 4 de daño si tu espada esta desenfundada."
   },
   {
      "id": 4,
      "name": "Precise Strike",
      "hurt": 10,
      "effect": "Solo puedes usarla si tu espada esta enfundada, haces 10 de daño y desenfunda la espada."
   },
   {
      "id": 5,
      "name": "Spear Sword",
      "hurt": 15,
      "effect": "Solo puedes usarla con la espada desenfundada. Lanza tu espada a un enemigo a 3 de distancia y haces 15 de daño, quedas desarmado hasta que la recuperes."
   },
   {
      "id": 6,
      "name": "Quick Dash",
      "hurt": 7,
      "effect": "Solo puedes usarla con tu espada enfundada. Embiste a un enemigo a 4 de distancia, desenfunda tu espada y has 7 de daño, muevete 2 espacios extra."
   },
  {
      "id": 7,
      "name": "Serenity",
      "hurt": 0,
      "effect": "Solo puedes usarla con tu espada desenfundada. Enfunda tu espada y remueve todos los miedos de tu mano."
   },
   {
      "id": 8,
      "name": "Serenity",
      "hurt": 0,
      "effect": "Solo puedes usarla con tu espada desenfundada. Enfunda tu espada y remueve todos los miedos de tu mano."
    }
]
const discardPileWebSamurai = [];