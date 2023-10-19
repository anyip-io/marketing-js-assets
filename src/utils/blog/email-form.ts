export default () => {
  const form = document.getElementById('email-form-3') as HTMLFormElement;

  form.addEventListener(
    'submit',
    function (evt: Event) {
      evt.preventDefault();
      const visitorId: string =
        typeof bentoVisitorId !== 'undefined' ? '&bento_uuid=' + bentoVisitorId() : '';
      window.location.href =
        'https://dashboard.anyip.io/account${visitorId}#/register?email=' +
        (form.querySelector('#Blog-Email') as HTMLInputElement).value;
      return false;
    },
    true
  );
};
