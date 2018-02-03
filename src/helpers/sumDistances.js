const sumDistances = (rows) => {
  const summedDistances = [];
  for (let i = 0; i < rows[0].elements.length; i++) {
    const dist1 = rows[0].elements[i].distance.text;
    const dist2 = rows[1].elements[i].distance.text;

    summedDistances.push((Number(dist1.slice(0, dist1.indexOf(' '))) + 
                         Number(dist2.slice(0, dist1.indexOf(' ')))).toFixed(1));
  }
  return summedDistances;
};

// const sampleRows = [
//   {
//     elements: [{ distance: { text: '2.2 miles', value: 2342 } }, { distance: { text: '3.7 miles', value: 2342 } }, { distance: { text: '1.1 miles', value: 2342 } }],
//   },
//   {
//     elements: [{ distance: { text: '6.8 miles', value: 2342 } }, { distance: { text: '3.2 miles', value: 2342 } }, { distance: { text: '2.1 miles', value: 2342 } }],
//   },
// ];
module.exports = sumDistances;
