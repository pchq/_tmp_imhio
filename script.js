document.querySelector('.js-form').addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const email = evt.target.querySelector('.js-email').value;

    try{
        const res = await emailVerify(email);
        const $resBlock = document.querySelector('.js-res');

        let resText = '';

        for (let key in res) {
            resText += `${key}:${res[key]}<br>`;
        }
        $resBlock.innerHTML = resText;
    }
    catch (e) {
        throw new Error(e);
    }
});


/**
 * Проверяет валидность email
 * 
 * @param {string} email
 * @return {object} ответ сервиса
 */
const emailVerify = async (email) => {
    const _url = '//apilayer.net/api/check';
    const _access_key = 'f176e184d22c0b3443c7a34284561ab7';
    
    const res = await fetch(`${_url}?access_key=${_access_key}&email=${email}`);

    if(!res.ok){
        throw new Error(`Could not fetch ${url}. Status: ${res.status}`)
    }
    
    const data = await res.json();

    if(data.success === false){
        throw new Error(`Error #${data.error.code} (${data.error.type}): ${data.error.info}`)
    }else{
        return data;
    }
};
