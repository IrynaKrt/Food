function closeModal(modalSelector) {
    const  modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    modal.style.transition = '0.6s';

    document.body.style.overflow = '';
    document.body.style.marginRight = `0px`;
}

function openModal(modalSelector, modalTimerId) {
    const  modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    modal.style.transition = '0.6s';

    document.body.style.overflow = 'hidden';
    let scroll = calcScroll();
    document.body.style.marginRight = `${scroll}px`;

    if(modalTimerId){
        clearInterval(modalTimerId);
    }
}

function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
}


function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal
  const modalTrigger = document.querySelectorAll(triggerSelector),
  modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
    if (e.target === modal|| e.target.getAttribute('data-close') == '') {
        closeModal(modalSelector);
    }
    });

    document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) { 
        closeModal(modalSelector);
    }
    });

    function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
    }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};