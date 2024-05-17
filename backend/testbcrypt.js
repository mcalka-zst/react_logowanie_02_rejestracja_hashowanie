const bcrypt = require("bcrypt");

const p1 = 'tajne';
const p2 = 'tajne';

const check = async (p1, p2) => {
  const h1 = await bcrypt.hash(p1, 10);
  const h2 = await bcrypt.hash(p2, 10);
  console.log(h1);
  console.log(h2);
  await compare(p1, h1);
  await compare(p2, h2);
};

const compare = async (p1, h2) => {
  if (await bcrypt.compare(p2, h2)) console.log("Hasła są zgodne");
  else console.log("Hasła nie są zgodne");
};

check(p1, p2);
