

function addTask() {
  // let value = document.querySelector('.add input').value;
  // let value = this.previousElementSibling.value;
  // let value = this.parentElement.contains('input');
  let value = this.parentElement.querySelector('input').value;
  let li = `<li class="list-group-item d-flex justify-content-between">
  <span>${value}</span>
  <div class="btn-actions">
    <a class="btn-important text-dark" href=""><i class="fs-5 bi bi-exclamation-circle-fill me-1"></i></a>
    <a class="btn-delete text-dark" href=""><i class="fs-5 bi bi-x-circle-fill"></i></a>
  </div>
  </li>`

  document.querySelector('.list').insertAdjacentHTML('beforeend', li)
}

document.querySelector('.btn-add').addEventListener('click', addTask);

