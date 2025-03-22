import posthog from 'posthog-js';

import { trackEvent } from './posthog';

export default () => {
  let formSubmitted = false;

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

  function handleButtonClick(event: Event | null, type?: string): void {
    formSubmitted = true;

    if (event !== null) {
      const buttonElement = event.currentTarget as HTMLElement;
      type = buttonElement.id === 'SliderCardBtn' ? 'CARD' : 'CRYPTO';
    } else {
      type = 'CARD';
    }

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
    const pricePerGb: number = parseFloat(
      (document.getElementById('perGb') as HTMLElement).textContent || '0'
    );
    const total: number = parseFloat(
      (document.getElementById('Total') as HTMLElement).textContent || '0'
    );

    // Register super properties
    posthog.register({
      email,
      signup_method: type,
    });

    // Track the purchase event before redirecting with profile properties
    trackEvent('purchase_with_card_crypto_clicked', {
      gigabyte: gbValue,
      total,
      price_per_gb: pricePerGb,
      cta_clicked: `purchase with ${type.toLowerCase()}`,
      before_or_after_sign_up: 'Before',
      $set: {
        email,
        signup_method: type,
      },
    });

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

    const url = `https://anyip.io/account${visitorId}#/register?email=${encodedEmail}&submit=true`;
    window.location.href = url;
  }

  function handleFormSubmit(event: Event): false {
    event.preventDefault();
    handleButtonClick(null, 'CARD');
    return false;
  }

  const emailElement = document.getElementById('Your-Email-2') as HTMLInputElement;

  if (!emailElement) {
    return;
  }

  $('#email-form').submit(handleFormSubmit);

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
  buttons.forEach((button: Element) => {
    button.addEventListener('click', (event) => handleButtonClick(event));
  });
};
