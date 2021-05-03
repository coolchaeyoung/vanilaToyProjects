const aside = document.querySelector("aside");
const main = document.querySelector("main");

let people = [];

const formatNum = (number) => `$${number.toLocaleString("ko-KR")}.00`;

const render = () => {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  people.forEach((person) => {
    const div = document.createElement("div");
    div.className = "person";
    div.innerHTML = `<strong>${person.name}</strong>${formatNum(
      person.wealth
    )}`;
    main.appendChild(div);
  });
};

const handleClick = async (e) => {
  const idName = e.target.id;
  if (idName === "add-user") {
    const { results } = await (
      await fetch("https://randomuser.me/api/")
    ).json();
    const person = {
      name: `${results[0].name.first} ${results[0].name.last}`,
      wealth: parseInt(Math.random() * 999999 + 100000, 10),
    };
    people.push(person);
    render();
  } else if (idName === "double") {
    people = people.map((person) => ({ ...person, wealth: person.wealth * 2 }));
    render();
  } else if (idName === "show-millionaires") {
    people = people.filter((person) => person.wealth >= 1000000);
    render();
  } else if (idName === "sort") {
    people.sort((a, b) => b.wealth - a.wealth);
    render();
  } else if (idName === "calculate-wealth") {
    const sum = people.reduce(function (acu, cur) {
      return acu + cur.wealth;
    }, 0);
    const div = document.createElement("div");
    div.innerHTML = `<h3>Total Wealth: <strong>${formatNum(sum)}</strong></h3>`;
    main.appendChild(div);
  }
};

aside.addEventListener("click", handleClick);
