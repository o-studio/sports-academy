const toMatrix = (arr, width) => {
  return arr.reduce((rows, key, index) => {
    return (
      (index % width == 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows
    );
  }, []);
}

export default toMatrix;