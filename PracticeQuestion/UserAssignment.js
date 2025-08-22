function assignUsers(records, previousState) {
  const groups = { A: [], B: [], ControlGroups: [] };
  const groupsCount = { A: 0, B: 0, ControlGroups: 0 };

  const shuffled = records.sort(() => Math.random() - 0.5);

  for (let user of shuffled) {
    const lastAssignedGroup = previousState[user.id];

    const possibleGroups = ["A", "B", "ControlGroups"].filter(
      (g) => g != lastAssignedGroup
    );

    possibleGroups.sort(() => Math.random() - 0.5);
    let assignedGroup = possibleGroups[0];

    groups[assignedGroup].push(user);
    groupsCount[assignedGroup]++;
    previousState[user.id] = assignedGroup;
  }

  return groups;
}

let prev = {};

const records = [...Array(10).keys()].map((i) => ({
  id: i + 1,
  name: `User${i + 1}`,
}));

console.log("Run 1");
const run1 = assignUsers(records, prev);
console.log(run1);

console.log("Run2");
const run2 = assignUsers(records, prev);
console.log(run2);

console.log("Run3");
const run3 = assignUsers(records, prev);
console.log(run3);
