const waitFor = (selector) => {
  return new Promise((resolve, reject) => { // resolve and rejects are functions if we resolve, then the overall promise will be resolved.
    // if we call reject, the overall promise will be rejected and fail.
    // and that is going to cause an error to be thrown an await
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    }, 30);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, 2000);
  });
};

beforeEach(() => {
  document.querySelector("#target").innerHTML = "";
  createAutoComplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "NOt Avengers" },
        { Title: "Some other movie" },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    }
  });
});

it("Dropdown starts closed", () => {
  const dropdown = document.querySelector(".dropdown");

  //not real
  // assert.strictEquals(dropdown.className, 'dropdown');

  // expect(dropdown.className).to.include("is-active");
});

it("After searching, dropdown opens up", async() => {
  // type something in
  // check dropdown
  const input = document.querySelector('input');
  input.value = 'avengers';
  input.dispatchEvent(new Event('input'));

  await waitFor('.dropdown-item'); // waitFor() function is something that is extremely useful and using on future projects as well.
  const dropdown = document.querySelector(".dropdown");
  // expect(dropdown.className).to.include("is-active");
});

it('After searching, displays some results', async() => {
  const input = document.querySelector('input');
  input.value = 'avengers';
  input.dispatchEvent(new Event('input'));

  await waitFor('.dropdown-item');

  const items = document.querySelectorAll('.dropdown-item');

  // expect(items.length).to.equal(3);
});
