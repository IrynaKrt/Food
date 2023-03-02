import {closeModal} from './modal';
import {openModal} from './modal';
import {postData} from '../services/services.js';

function forms (formSelector, modalTimerId) {
    //Forms

    const forms = document.querySelectorAll(formSelector);
    const message = {
    loading: 'img/form/spinner.svg',
    success: "Спасибо! Мы скоро с вами свяжемся",
    failure: 'Что-то пошло не так =('

    };
    forms.forEach(item =>{
    bindPostData(item);
    });

function bindPostData (form){
  form.addEventListener('submit', (e) => { //при попытке отправки формы
    e.preventDefault();

    const statusMess = document.createElement('img');
    statusMess.src = message.loading; //добавление спинера загрузки
    statusMess.style.cssText = ` 
    display:block;
    margin: o auto; 
    `;
    form.insertAdjacentElement('afterend', statusMess); //спинер будет под формой

      
    const formData = new FormData(form);
    // r.setRequestHeader('Content-type', 'multipart/form-data'); -//ЕСЛИ ЭТА СТРОКА БУДЕТ, НА СЕРВЕР НИЧЕГО НЕ ПРИДЕТ!
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

  postData('http://localhost:3000/requests', json)
    .then(r => {
      console.log(r);
        showThanksModal(message.success);
        statusMess.remove();
  }).catch(() => {
      showThanksModal(message.failure);
  }).finally(()=> {
      form.reset();
  });

});
}
    
  
function showThanksModal (message) {
    const prevModalDialog =document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('.modal__dialog');
    thanksModal.innerHTML= `
    <div class="modal__content">
      <div class="modal__close" data-close>×</div>
      <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector('.modal').append(thanksModal); // добавление окна на стр
    setTimeout(() => { //удаление и очищение формы
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal('.modal');
    }, 4000);
  }
}

export default forms;