import { openModal, closeModal } from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId) {
	// ============================ Forms (XMLHttpRequest) Fetch

	const forms = document.querySelectorAll(formSelector);
	const messages = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Ожидайте, мы с Вами свяжемся',
		failure: 'Что-то пошло не так',
	};

	forms.forEach((item) => {
		bindPostData(item);
	});

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			// const r = new XMLHttpRequest();
			const formData = new FormData(form);

			const statusMessage = document.createElement('img');
			statusMessage.src = messages.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.after(statusMessage);
			// Вставка в виде HTML
			// form.insertAdjacentHTML(
			// 	'afterend',
			// 	`<img src='${messages.loading}' style ='display: block; margin: 0 auto;'>`
			// );
			// отправка на сервер JSON
			// если нужна отправка FormData, то надо удалить [r.setRequestHeader] и поменять в r.send(formData). XMLHttpRequest и FormData => не нужны HTTP заголовки, они проставляются авто

			// МЕТОДЫ ПАРСИНГА FORMDATA В JSON
			// const obj = {};
			// formData.forEach((value, key) => {
			// 	obj[key] = value;
			// });
			// const json = JSON.stringify(obj);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			// fetch('http://localhost:3000/requests', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-type': 'application/json',
			// 	},
			// 	body: JSON.stringify(obj),
			// })
			// 	.then((response) => response.text())
			postData('http://localhost:3000/requests', json)
				.then((data) => {
					console.log(data);
					showThanksModal(messages.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(messages.failure);
				})
				.finally(() => {
					form.reset();
				});
			// r.open('POST', 'server.php');
			// r.setRequestHeader('Content-type', 'application/json');
			// r.send(json);

			// r.addEventListener('load', () => {
			// 	if (r.status === 200) {
			// 		console.log(json);
			// 		showThanksModal(messages.success);
			// 		form.reset();
			// 		statusMessage.remove();
			// 	} else {
			// 		showThanksModal(messages.failure);
			// 	}
			// });
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			closeModal('.modal');
		}, 2000);
	}

	// fetch('https://jsonplaceholder.typicode.com/todos/67')
	// 	.then((data) => {
	// 		console.dir(data);
	// 		return data;
	// 	})
	// 	.then((response) => response.json())
	// 	.then((json) => {
	// 		console.log(json);
	// 	});
}

export default forms;
