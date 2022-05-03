function closeModal(modalSelctor) {
	const modal = document.querySelector(modalSelctor);

	modal.classList.add('hide');
	modal.classList.remove('show');
	document.querySelector('.modal__dialog').classList.remove('hide');
	document.body.style.overflow = '';
}
function openModal(modalSelctor, modalTimerId) {
	const modal = document.querySelector(modalSelctor);

	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';

	if (modalTimerId) {
		clearTimeout(modalTimerId);
	}
}

function modal(triggerSelector, modalSelctor, modalTimerId) {
	const modalTrigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelctor);

	function openModalByScroll() {
		if (
			window.scrollY + document.documentElement.clientHeight >=
			document.documentElement.offsetHeight
		) {
			openModal(modalSelctor, modalTimerId);
			window.removeEventListener('scroll', openModalByScroll);
		}
	}

	window.addEventListener('scroll', openModalByScroll);
	openModalByScroll();

	modalTrigger.forEach((btn) => {
		btn.addEventListener('click', () => openModal(modalSelctor, modalTimerId));
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.dataset.close == '') {
			closeModal(modalSelctor);
		}
		// e.target.getAttribute('data-close') == ''
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelctor);
		}
	});
}

export default modal;
export { openModal, closeModal };
