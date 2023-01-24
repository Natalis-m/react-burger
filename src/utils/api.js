const config = 'https://norma.nomoreparties.space/api/ingredients';

export function getResponseData(assignData) {
  fetch(config)
    .then(res => res.json())
    .then(json => {
      assignData(json);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
