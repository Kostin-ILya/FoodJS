function modal() {
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	// const timerModal = setTimeout(openModal, 50000);

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.querySelector('.modal__dialog').classList.remove('hide');
		document.body.style.overflow = '';
	}
	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		// clearTimeout(timerModal);
	}
	function openModalByScroll() {
		if (
			window.scrollY + document.documentElement.clientHeight >=
			document.documentElement.offsetHeight
		) {
			openModal();
			window.removeEventListener('scroll', openModalByScroll);
		}
	}

	window.addEventListener('scroll', openModalByScroll);
	openModalByScroll();

	modalTrigger.forEach((btn) => {
		btn.addEventListener('click', () => {
			openModal();
		});
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.dataset.close == '') {
			closeModal();
		}
		// e.target.getAttribute('data-close') == ''
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});
}

export default modal;
