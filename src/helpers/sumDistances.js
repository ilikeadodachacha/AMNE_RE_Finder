const sumDistances = (rows) => {
  return rows[0].elements.map((row, i) => parseInt(row.distance.text) + parseInt(rows[1].elements[i].distance.text));
};

module.exports = sumDistances;
