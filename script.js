

function renderItem(markup, outputClass) {
  document.querySelector(outputClass).insertAdjacentHTML('beforeend', markup);
}

function clearInput(input) {
  input.value = ''
}

function addItemToLS(name, source, params = null) { // {important: false, done: false}
  let items = JSON.parse(localStorage.getItem(source)) || [];
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


document.querySelector('.btn-add').addEventListener('click', function (event) {
  const input = event.target.parentElement.querySelector('input');
  const li = `<li class="list-group-item d-flex justify-content-between">
  <span>${input.value}</span>
  <div class="btn-actions">
    <a class="btn-important text-dark" href=""><i class="fs-5 bi bi-exclamation-circle-fill me-1"></i></a>
    <a class="btn-delete text-dark" href=""><i class="fs-5 bi bi-x-circle-fill"></i></a>
  </div>
  </li>`;
  addItemToLS(input.value, 'tasks', { important: false, done: false });
  renderItem(li, '.list');
  clearInput(input)
});


