function renderItem(markup, outputClass) {
  document.querySelector(outputClass).insertAdjacentHTML('beforeend', markup);
}

function clearInput(input) {
  input.value = ''
}

function addItemToLS(name, source, params = null) { // {important: false, done: false}
  let items = getItemsFromLS(source);
  let newItem;
  let id = setId();
  if (items.length == 0) {
    newItem = { id: id, name, ...params }; //{ id: 1, name:dfd, important: false, done: false } // { id: 1, name }
  } else {
    newItem = { id, name, ...params };
  }
  items.push(newItem);
  localStorage.setItem(source, JSON.stringify(items));
  return id;
}

function getId() {
  return localStorage.getItem('idCounter') || 0;
}

function setId() {
  let idCounter = +getId();
  idCounter++;
  localStorage.setItem('idCounter', idCounter);
  return idCounter;
}

function getItemsFromLS(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

document.querySelector('.btn-add').addEventListener('click', function (event) {
  const input = event.target.parentElement.querySelector('input');
  const tasks = getItemsFromLS('tasks');
  const id = addItemToLS(input.value, 'tasks', { important: false, done: false });
  const li = `<li data-id="${id}" class="list-group-item d-flex justify-content-between">
  <span>${input.value}</span>
  <div class="btn-actions"><a class="btn-important text-dark" href=""><i class="fs-5 bi bi-exclamation-circle-fill me-1"></i></a>
  <a class="btn-delete text-dark" href=""><i class="fs-5 bi bi-x-circle-fill"></i></a>
  </div>
  </li>`;
  renderItem(li, '.list');
  clearInput(input)
});


document.addEventListener('DOMContentLoaded', function () {
  // idCounter = getId();
  const tasks = getItemsFromLS('tasks');
  tasks.forEach(function (item, ind) {
    // let clazz = '';
    // if (item.done == true) {
    //   clazz = 'done';
    // }
    const li = `<li data-id=${item.id} class="list-group-item d-flex justify-content-between">
  <span class="${item.done == true ? 'done' : ''} ${item.important == true ? 'important' : ''}">${item.name}</span>
  <div class="btn-actions"><a class="btn-important text-dark" href=""><i class="fs-5 bi bi-exclamation-circle-fill me-1"></i></a>
  <a class="btn-delete text-dark" href=""><i class="fs-5 bi bi-x-circle-fill"></i></a>
  </div>
  </li>`;
    renderItem(li, '.list');
  })
})


document.querySelector('.list').addEventListener('click', function (e) {
  e.preventDefault();

  function modifyItemData(param) {
    const tasks = getItemsFromLS('tasks');
    tasks.forEach(function (item, ind) {
      if (e.target.closest('li').dataset.id == item.id) {
        item[param] = !item[param];
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  if (e.target.matches('span')) {
    e.target.classList.toggle('done');
    modifyItemData('done');
  }

  if (e.target.matches('.btn-important,.btn-important>i')) {
    e.target.closest('li').querySelector('span').classList.toggle('important');
    modifyItemData('important');
  }
})


