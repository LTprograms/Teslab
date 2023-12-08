function getCombinationsBoolean(n) {
  const matrix = new Array(Math.pow(2, n));
  let num = parseInt(Math.pow(2,n)/2);
  for (let i = 0; i < matrix.length; i++) {
      matrix[i] = new Array(n);
  }
  for (let i = 0; i < n; i++) {
      let cont = 0;
      let x = 0
      for (let j = 0; j < Math.pow(2, n); j++) {
          if (cont<num) {
              matrix[j][i] = x;
              cont++;
          }
          if (cont === num) {
              cont = 0;
              x = x==0 ? 1 : 0;
          }
      }      
     num = parseInt(num/2);     
  }
  return matrix;
}

console.log(getCombinationsBoolean(parseInt(prompt("n: "))));