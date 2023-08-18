function RandStr(length = 10) {
  const chars = '0123456789abcdefABCDEF';
  const charsLnth = chars.length;
  let randStr = 'a';
  for (let i = 0; i < length - 1; i++) {
    randStr += chars[Math.floor(Math.random() * charsLnth)];
  }
  return randStr;
 }

 export default RandStr;