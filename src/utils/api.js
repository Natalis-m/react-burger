const config = {
  baseUrl: 'https://norma.nomoreparties.space/api/ingredients'
};

export function getResponseData() {
  fetch(config.baseUrl)
    .then(res => res.json())
    // .then(json => setData(json))
    .catch(error => {
      console.error('Error:', error);
    });
}
