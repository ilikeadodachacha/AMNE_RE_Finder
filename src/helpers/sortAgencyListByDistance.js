const sortAgencyListByDistance = (agencyList, distances) => {
  const copy = agencyList.slice();
  for (let i = 0; i < agencyList.length; i += 1) {
    copy[i].distance = distances[i];
  }
  return copy.sort((a, b) => {
    return a.distance - b.distance;
  });
};

module.exports = sortAgencyListByDistance;
