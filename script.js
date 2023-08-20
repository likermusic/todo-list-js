function renderItem(markup, outputClass) {
  document.querySelector(outputClass).insertAdjacentHTML('beforeend', markup);
}

function clearInput(input) {
  input.value = ''
}

function addItemToLS(name, source, params = null) { // {important: false, done: false}
  let items = getItemsFromLS(source);
  let newItem;
  if (items.length == 0) {
    newItem = { id: 1, name, ...params }; //{ id: 1, name:dfd, important: false, done: false } // { id: 1, name }
  } else {
    const id = items[items.length - 1].id + 1;
    newItem = { id, name, ...params };
  }
  items.push(newItem);
  localStorage.setItem(source, JSON.stringify(items));
}

function getItemsFromLS(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

document.querySelector('.btn-add').addEventListener('click', function (event) {
  const input = event.target.parentElement.querySelector('input');
  const tasks = getItemsFromLS('tasks');
  const id = tasks[tasks.length - 1].id + 1;
  const li = `<li data-id="${id}" class="list-group-item d-flex justify-content-between">
  <span>${input.value}</span>
  <div class="btn-actions"><a class="btn-important text-dark" href=""><i class="fs-5 bi bi-exclamation-circle-fill me-1"></i></a>
  <a class="btn-delete text-dark" href=""><i class="fs-5 bi bi-x-circle-fill"></i></a>
  </div>
  </li>`;
  addItemToLS(input.value, 'tasks', { important: false, done: false });
  renderItem(li, '.list');
  clearInput(input)
});

document.addEventListener('DOMContentLoaded', function () {
  const tasks = getItemsFromLS('tasks');
  tasks.forEach(function (item, ind) {
    const li = `<li data-id=${item.id} class="list-group-item d-flex justify-content-between">
  <span>${item.name}</span>
  <div class="btn-actions"><a class="btn-important text-dark" href=""><i class="fs-5 bi bi-exclamation-circle-fill me-1"></i></a>
  <a class="btn-delete text-dark" href=""><i class="fs-5 bi bi-x-circle-fill"></i></a>
  </div>
  </li>`;
    renderItem(li, '.list');


  })
})




document.querySelector('.list').addEventListener('click', function (e) {
  if (e.target.matches('span')) {
    e.target.classList.toggle('done');


    const tasks = getItemsFromLS('tasks');
    tasks.forEach(function (item, ind) {
      if (e.target.parentElement.dataset.id == item.id) {
        console.log(item);
      }
    });

  }
})





