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
["Python",1,"Explique","Dans un énoncé de PL, comment distinguer une variable de décision d'une donnée ?","Test : « est-ce que JE peux le changer ? »\n• Oui → variable de décision (quantités à produire…).\n• Non → donnée (prix, stocks, consommations, avec leurs unités kg/g !)."],
["Python",1,"Applique","Atelier : bureau = 2 h découpe + 1 h assemblage, 40 € ; bibliothèque = 1 h + 2 h, 30 €. 100 h de découpe, 80 h d'assemblage. Écris le PL.","x = bureaux, y = bibliothèques.\nmax 40x + 30y\ns.c. 2x + y ≤ 100 (découpe)\n     x + 2y ≤ 80 (assemblage)\n     x, y ≥ 0 (positivité, à ne pas oublier)"],
["Python",1,"Explique","« Le budget ne doit pas dépasser 200 € » : ça va dans l'objectif ou dans les contraintes ? Pourquoi ?","Contrainte (… ≤ 200). L'objectif ne contient QUE ce qu'on maximise/minimise, jamais d'inégalité.\nMéthode : essai concret avec des valeurs pour vérifier."],
["Python",1,"Explique","Ces modèles sont-ils linéaires : 3x + 2y ≤ 10 ; x·y ≤ 5 ; x² + y ≥ 1 ; « x ≤ 3 OU y ≤ 2 » ?","Seul 3x + 2y ≤ 10 l'est.\n• x·y : produit de 2 variables → non linéaire\n• x² → non linéaire\n• « ou » entre contraintes → non linéaire\n(Variables entières aussi : on sort du PL continu.)"],
["Python",1,"Explique","Trajet en métro : quel est le minimiseur, quel est le minimum ?","• Minimiseur x* = la DÉCISION (l'itinéraire).\n• Minimum f(x*) = la VALEUR (le temps de trajet).\nLe minimum est unique s'il existe, les minimiseurs pas forcément."],
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
