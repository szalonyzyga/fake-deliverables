const imionameskie = ['jan','adam','pawel','michal','piotr','lukasz','marcin','mateusz','karol','tomasz','krzysztof','dawid','jakub','rafal','sebastian','daniel','grzegorz','bartek','adrian','patryk'];
const imionazenskie = ['ola','ewa','anna','magda','joanna','basia','asia','beata','aga','monika','katarzyna','marcelina','agnieszka','iwona','emilia','justyna','martyna'];
const nazwiskameskie = ['nowak','kowalczyk','wozniak','mazur','zajac','wieczorek','dudek','duda','stepien','jaskiewicz','sikora','wrobel','michalak','pietrzak','wilk','krupa','szulc','mroz','cieslak','kaczmarczyk','krawczyk','grabowski','krol','jablonski','pawlak','gorski','adamczyk','zielinski','wojcik','kaminski','piotrowski','wojciechowski','kaczmarek','szewczyk','baran','olszewski','stachura','malinowski','sadowski','bielinski'];
const nazwiskazenskie = ['grabowska','jablonska','gorska','zielinska','kaminska','piotrowska','wojciechowska','olszewska','malinowska','sadowska','bielinska','domanska','kowalska','wroblewska','mazurkiewicz','stepien','baranowska','krupinska','szulc','cieslak','kaczmarczyk','krawczyk','adamczyk','wojcik','pawlak','szewczyk','michalak','pietrzak','wilk','duda','wieczorek','zajac','wozniak','mazur','kubiak','lukasik'];
const opcjonalne = ['1979','1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003'];
const domeny = ['interia.pl','int.pl','o2.pl','wp.pl'];
const male = 'abcdefghijklmnopqrstuvwxyz';
const duze = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const cyfry = '0123456789';
const znaki = '!#$%^&-_';
const wszystkie = male + duze + cyfry + znaki;
const min = 9;
const max = 13;
const szalonyzyga1 = document.getElementById('szalonyzyga1');
const generuj = document.getElementById('generuj');
const pole = document.getElementById('poleblikkkkk');
const k = document.getElementById('kopiujwszystkie');
function losowyint(max) {
  if (window.crypto && window.crypto.getRandomValues) {
    const u32 = new Uint32Array(1);
    window.crypto.getRandomValues(u32);
    return u32[0] % max;
  }
  return Math.floor(Math.random() * max);
}
function losowyintzakres(minval, maxval) {
  return minval + losowyint(maxval - minval + 1);
}
function losowyelement(tab) {
  return tab[losowyint(tab.length)];
}
function czysty(t) {
  return String(t).replace(/\s+/g, '').toLowerCase();
}
function mozeopcjonalny() {
  return Math.random() < 0.4;
}
function generujhaslo() {
  const dl = losowyintzakres(min, max);
  const req = [
    male[losowyint(male.length)],
    duze[losowyint(duze.length)],
    cyfry[losowyint(cyfry.length)],
    znaki[losowyint(znaki.length)]
  ];
  const reszta = dl - req.length;
  const arr = req.slice();
  for (let i = 0; i < reszta; i++) arr.push(wszystkie[losowyint(wszystkie.length)]);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = losowyint(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}
function generujemail() {
  const meskie = Math.random() < 0.5;
  let imie, nazwisko;
  if (meskie) {
    imie = czysty(losowyelement(imionameskie));
    nazwisko = czysty(losowyelement(nazwiskameskie));
  } else {
    imie = czysty(losowyelement(imionazenskie));
    nazwisko = czysty(losowyelement(nazwiskazenskie));
  }
  let opcja = '';
  if (mozeopcjonalny()) opcja = czysty(losowyelement(opcjonalne));
  return imie + nazwisko + opcja + '@' + losowyelement(domeny);
}
function generujpar() {
  return generujemail() + ' : ' + generujhaslo();
}
function generujwiele(n) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(generujpar());
  return out;
}
function uruchomgeneruj() {
  const n = Math.max(1, Math.floor(Number(szalonyzyga1.value) || 0));
  pole.value = generujwiele(n).join('\n');
}
generuj.addEventListener('click', uruchomgeneruj);
k.addEventListener('click', () => {
  pole.select();
  try {
    document.execCommand('copy');
    k.textContent = 'Skopiowano!';
    setTimeout(() => k.textContent = 'Kopiuj wszystkie', 1500);
  } catch {
    k.textContent = 'Kopiowanie nie powiodło się';
    setTimeout(() => k.textContent = 'Kopiuj wszystkie', 1500);
  }
});