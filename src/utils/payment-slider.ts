export default () => {
  let formSubmitted = false;

  document.getElementById('email-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  function isValidEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function displayEmailError(show: boolean): void {
    const emailElement = document.getElementById('Your-Email-2') as HTMLInputElement;
    const errorDiv = document.getElementById('email-error') as HTMLElement | null;

    if (show) {
      emailElement.style.border = '1px solid #cc0000';
      if (!errorDiv) {
        const div = document.createElement('div');
        div.id = 'email-error';
        div.style.color = '#cc0000';
        div.style.paddingTop = '5px';
        div.textContent = 'Please fill a valid email address';
        emailElement.insertAdjacentElement('afterend', div);
      }
    } else {
      emailElement.style.border = '';
      if (errorDiv) errorDiv.remove();
    }
  }

  const emailElement = document.getElementById('Your-Email-2') as HTMLInputElement;

  if (!emailElement) {
    return;
  }

  emailElement.addEventListener('input', function () {
    if (formSubmitted) {
      const email: string = emailElement.value;
      displayEmailError(!isValidEmail(email));
    }
  });

  const myRange = document.getElementById('myRange') as HTMLInputElement | null;
  if (myRange !== null) {
    myRange.addEventListener('input', function () {
      const stepIndex: number = parseInt(this.value, 10);
      const values = [
        {
          gb: 0,
          per_gb: 0,
        },
        {
          gb: 5,
          per_gb: 5,
        },
        {
          gb: 20,
          per_gb: 4,
        },
        {
          gb: 100,
          per_gb: 3,
        },
        {
          gb: 500,
          per_gb: 2,
        },
      ];
      const value = values[stepIndex];
      const gb: number = parseFloat(value.gb.toString());
      const per_gb: number = parseFloat(value.per_gb.toString());
      const total: number = gb * per_gb;

      (document.getElementById('rangeValue') as HTMLElement).textContent = gb.toString();
      (document.getElementById('perGb') as HTMLElement).textContent = per_gb.toString();
      (document.getElementById('Total') as HTMLElement).textContent = total.toString();
    });
  }

  const buttons = document.querySelectorAll('#SliderCardBtn, #SliderCryptoBtn');
  buttons.forEach(function (button: Element) {
    button.addEventListener('click', function (this: HTMLElement) {
      formSubmitted = true;

      const type: string = this.id === 'SliderCardBtn' ? 'CARD' : 'CRYPTO';
      const emailElement = document.getElementById('Your-Email-2') as HTMLInputElement;
      const email: string = emailElement.value;

      if (!isValidEmail(email)) {
        displayEmailError(true);
        return;
      }
      displayEmailError(false);

      const gbValue: number = parseFloat(
        (document.getElementById('rangeValue') as HTMLElement).textContent || '0'
      );

      let planId = '63103059eb3fad951561ca41';

      switch (gbValue) {
        case 5:
          planId = '63103059eb3fad951561ca41';
          break;
        case 20:
          planId = '63103059eb3fad951561ca42';
          break;
        case 100:
          planId = '63103059eb3fad951561ca43';
          break;
        case 500:
          planId = '63103059eb3fad951561ca44';
          break;
      }

      const encodedEmail: string = encodeURIComponent(email);

      const visitorId =
        typeof bentoVisitorId !== 'undefined' ? '?bento_uuid=' + bentoVisitorId() : '';

      const url = `https://dashboard.anyip.io/account${visitorId}#/register?type=${type}&email=${encodedEmail}&plan_id=${planId}&submit=true`;
      window.location.href = url;
    });
  });
};
