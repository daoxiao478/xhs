// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

function base36encode(
  number,
  alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
) {
  if (typeof number !== "number" || number % 1 !== 0) {
    throw new TypeError("number must be an integer");
  }

  let base36 = "";
  let sign = "";

  if (number < 0) {
    sign = "-";
    number = -number;
  }

  if (0 <= number && number < alphabet.length) {
    return sign + alphabet[number];
  }

  while (number !== 0) {
    const i = number % alphabet.length;
    number = Math.floor(number / alphabet.length);
    base36 = alphabet[i] + base36;
  }

  return sign + base36;
}

function base36decode(number) {
  return parseInt(number, 36);
}

export function get_search_id() {
  const e = BigInt(Date.now()) << 64n;
  const t = BigInt(Math.floor(Math.random() * 2147483646));
  return base36encode(Number(e + t));
}
