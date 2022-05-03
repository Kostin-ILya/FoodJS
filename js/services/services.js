async function getResourse(url) {
	let res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Ошибочка ${url}, status: ${res.status}`);
	}

	return await res.json();
}

const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: data,
	});
	return await res.json();
};

export { getResourse, postData };
