// Cartes de révision — générées depuis le vault « Cerveau » (19/11/2026).
// Format : [matière, étape, type, question, réponse, date de la séance "AAAA-MM-JJ"]
// La carte apparaît dans l'appli le lendemain de la séance.
// type : "Rappel" (fait exact) · "Explique" (pourquoi / différence) · "Applique" (mini-cas, comme au partiel)
// Les cartes sont écrites par Claude à la FIN de chaque séance de révision (« fini »),
// à partir de ce qui a été vu ET des erreurs faites pendant la séance.
// Toujours ajouter une carte À LA FIN de son étape (l'id dépend de la position dans l'étape).

const ETAPES = {
  "Probas": {
    1: "Bases de R",
    2: "Ch.1 — conditionnelles, Bayes, indépendance",
    3: "S5 — tests d'hypothèses",
    4: "S6 — tests d'adéquation",
    5: "S6-7 — tests gaussiens",
    6: "S8 — χ² d'indépendance, Fisher exact",
    7: "S8 — tests multiples",
    8: "Ch.3 S1 — DAG, connexions, GS / HC",
    9: "Ch.3 S2 — réseau bayésien, inférence"
  },
  "Python": {
    1: "Cours 1 — modéliser un PL",
    2: "Cours 1 — existence, résolution graphique",
    3: "TD 1.1",
    4: "TD 1.2",
    5: "Cours 2 — transport",
    6: "Cours 2 — simplexe, deux phases",
    7: "Cours 2 — dualité",
    8: "TD 2.1 — linprog"
  },
  "Réseau": {
    1: "Ch.1 — couches, Ethernet, MAC",
    2: "Ch.1 — IPv4, masques, VLSM",
    3: "Ch.1 — routage, ARP, TCP/UDP",
    4: "Ch.2 — HTTP, DNS, sockets",
    5: "TP2 — Wireshark",
    6: "Ch.3 — OSPF, Dijkstra",
    7: "Ch.4 — NAT",
    8: "Ch.4 — IPv6"
  },
  "Virtualisation": {
    1: "Virtualisation, hyperviseurs",
    2: "Conteneurisation",
    3: "Docker : images et conteneurs",
    4: "Dockerfile",
    5: "Docker Compose",
    6: "Kubernetes",
    7: "CI/CD, hyperconvergence, cloud"
  }
};


const CARDS_RAW = [
["Probas",1,"Applique","v <- c(3, 10, 7, 10)\nQue renvoient v[3], v[-1] et v[v == 10] ?","• v[3] → 7 (les positions commencent à 1)\n• v[-1] → 10 7 10 (tout sauf la position 1)\n• v[v == 10] → 10 10 (filtre : garde les valeurs où la condition est TRUE)"],
["Probas",1,"Explique","Tu écris cartes[-1] dans ton script Blackjack. La 1re carte a-t-elle disparu du sabot ? Pourquoi ?","Non. cartes[-1] renvoie une COPIE sans la 1re carte, mais cartes ne change pas.\nPour modifier il faut réaffecter : cartes <- cartes[-1].\n(Et un nom n'existe qu'après un <-.)"],
["Probas",1,"Explique","En R, quelle différence entre == et <- ?","• == compare : renvoie TRUE/FALSE (ex. v == 10).\n• <- (ou =) donne une valeur à un nom (affectation).\nPiège : écrire = dans un filtre au lieu de ==."],
["Probas",1,"Explique","table(x) vs prop.table(table(x)) : que donne chacun ? Combien fait la somme du second ?","• table : les EFFECTIFS (compter chaque valeur).\n• prop.table : les PROPORTIONS ; s'applique au tableau produit par table.\n• La somme de prop.table vaut toujours 1."],
["Probas",1,"Applique","df a deux colonnes : nom et age. Comment obtenir la colonne age ? La valeur ligne 2, colonne 1 ? Les personnes de plus de 20 ans ?","• df$age\n• df[2, 1] (ligne, VIRGULE, colonne)\n• df[df$age > 20, ] (condition sur les lignes, toutes les colonnes)\nRappel : toutes les colonnes d'un data.frame ont la même longueur."],
["Probas",2,"Explique","table(cartes) range les valeurs 2 à 11 (10 cases). Tu veux P(carte > 7) : pourquoi table(cartes)[8:11] est faux ? Quelles positions faut-il ?","• Position = valeur − 1 (la valeur 2 est en position 1).\n• Les valeurs 8 à 11 sont aux positions 7 à 10 → [7:10].\n• [8:11] est décalé et la position 11 n'existe pas (NA).\n• Ne pas confondre une valeur de carte et une position dans le tableau.","2026-11-19"],
["Probas",2,"Applique","Sabot de 52 cartes dont 16 dix. Tu tires deux cartes SANS remise. Calcule P(deux 10) et explique pourquoi P(A) × P(B) ne marche plus.","• P(A) = 16/52.\n• P(B | A) = 15/51 (un 10 et une carte en moins dans le sabot).\n• P(A ∩ B) = P(B | A) × P(A) = 15/51 × 16/52 ≈ 0,0905.\n• Sans remise le sabot change : B dépend de A, donc P(B | A) ≠ P(B). (Avec remise : 0,3077² ≈ 0,0947.)","2026-11-19"],
["Probas",2,"Applique","Deux cartes tirées sans remise. Calcule P(la 2e carte est un 10) sans connaître la 1re. Quels cas, quels dénominateurs ?","Probabilités totales : P(B) = P(B | A)P(A) + P(B | non A)P(non A), avec A = « 1re carte = 10 ».\n• Si 1re = 10 : 15/51 × 16/52.\n• Si 1re ≠ 10 : 16/51 × 36/52 (il reste les 16 dix dans 51 cartes : dénominateur 51, pas 52).\n• Total = 16/52 ≈ 0,3077 : sans information, la 2e carte a la même probabilité que la 1re.","2026-11-19"],
["Probas",2,"Applique","Le joueur a un 10 et un 8 (18), le croupier a un 10. Sabot de 52 au départ. Quelle est la probabilité de dépasser 21 en tirant ? Que décides-tu ?","• 3 cartes vues (10, 10, 8) → il reste 49 cartes.\n• Pour ne pas dépasser 21 il faut une carte ≤ 3 : les 2 et les 3 = 8 cartes → P = 8/49 ≈ 0,1633.\n• P(dépasser 21) = 1 − 0,1633 ≈ 0,8367 → on ne tire pas.\n• Numérateur ET dénominateur sur le même sabot restant.","2026-11-19"],
["Probas",2,"Explique","Probabilité a priori d'un blackjack dès le 1er tirage (sans remise) : quels cas, quelle opération dans chaque cas, comment les combiner ?","• Deux cas : 10 puis 11, et 11 puis 10 (ordres différents, incompatibles).\n• Chaque cas = produit sans remise : 16/52 × 4/51 et 4/52 × 16/51 (dans le cas 2 on retire un 11, pas un 10).\n• On additionne les deux cas : ≈ 0,0483.\n• Test de cohérence : les deux produits sont égaux.","2026-11-19"],
["Probas",2,"Explique","Score High-Low : donne la grille, le score après les cartes 10, 10, 8, et dis qui est favorisé et pourquoi.","• 2 à 6 : +1 (basses) · 7, 8, 9 : 0 · 10 et 11 : −1 (fortes).\n• 10, 10, 8 → −1 −1 + 0 = −2.\n• Score négatif = déficit de cartes fortes dans le sabot : le croupier saute moins souvent (et toi tu fais moins de blackjacks) → casino favorisé.","2026-11-19"],
["Python",1,"Explique","Dans un énoncé de PL, comment distinguer une variable de décision d'une donnée ?","Test : « est-ce que JE peux le changer ? »\n• Oui → variable de décision (quantités à produire…).\n• Non → donnée (prix, stocks, consommations, avec leurs unités kg/g !)."],
["Python",1,"Applique","Un atelier fabrique des bureaux et des bibliothèques.\n• 1 bureau : 2 h de découpe + 1 h d'assemblage, rapporte 40 €.\n• 1 bibliothèque : 1 h de découpe + 2 h d'assemblage, rapporte 30 €.\nCette semaine : 100 h de découpe et 80 h d'assemblage disponibles.\nL'atelier veut gagner le plus possible.\n\nÉcris le programme linéaire : les variables (avec ce qu'elles représentent), la fonction objectif, et TOUTES les contraintes.","Variables : x = nombre de bureaux, y = nombre de bibliothèques.\n\nObjectif : max 40x + 30y (le gain en €)\n\nContraintes (« s.c. » = sous contraintes) :\n• 2x + y ≤ 100 → heures de découpe\n• x + 2y ≤ 80 → heures d'assemblage\n• x ≥ 0, y ≥ 0 → positivité (on l'oublie souvent !)\n\nMéthode : 1 ressource limitée = 1 contrainte ; les prix vont dans l'objectif, jamais dans les contraintes."],
["Python",1,"Explique","« Le budget ne doit pas dépasser 200 € » : ça va dans l'objectif ou dans les contraintes ? Pourquoi ?","Contrainte (… ≤ 200). L'objectif ne contient QUE ce qu'on maximise/minimise, jamais d'inégalité.\nMéthode : essai concret avec des valeurs pour vérifier."],
["Python",1,"Explique","Ces modèles sont-ils linéaires : 3x + 2y ≤ 10 ; x·y ≤ 5 ; x² + y ≥ 1 ; « x ≤ 3 OU y ≤ 2 » ?","Seul 3x + 2y ≤ 10 l'est.\n• x·y : produit de 2 variables → non linéaire\n• x² → non linéaire\n• « ou » entre contraintes → non linéaire\n(Variables entières aussi : on sort du PL continu.)"],
["Python",1,"Explique","Tu cherches le trajet de métro le plus rapide pour aller à l'ESIEA. Le meilleur trajet est « ligne 7 puis ligne 1 » et il dure 35 min.\nLequel est le minimiseur, lequel est le minimum ? Pourquoi ne faut-il pas les confondre ?","• Minimiseur x* = la DÉCISION → « ligne 7 puis ligne 1 ».\n• Minimum f(x*) = la VALEUR → 35 min.\nLe minimum est unique s'il existe, les minimiseurs pas forcément."],
["Python",1,"Rappel","Forme normale d'un PL : écris-la et dis ce que sont x, c, A, b.","max cᵀx s.c. Ax ≤ b (x ≥ 0)\n• x : variables\n• c : coefficients de l'objectif\n• A : une LIGNE par contrainte (mettre les 0 !)\n• b : seconds membres"]
];

const CARDS = (() => {
  const count = {};
  return CARDS_RAW.map(([m, e, t, q, a, d]) => {
    const k = m + "-" + e;
    count[k] = (count[k] || 0) + 1;
    return { id: k + "-" + count[k], m, e, t, q, a, d };
  });
})();
