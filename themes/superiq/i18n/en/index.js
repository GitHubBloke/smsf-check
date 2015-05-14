export default {
  locales: [ 'en' ],
  messages: {

    home: {
      intro:
        `Welcome to the {brand} SMSF Health Check tool, {name}.
         Compare your current fund to thousands of others SMSFs
         to see how your fund stacks up.`,
      features: {
        safeData: 'Know your data is safe with bank-level security.',
        greatAdvice: 'Provide as much or as little information as you like and still receive great general advice.',
        compare: 'Compare your fund to over 11,000 funds from ATO and SuperIQ databases.',
      },
    },

    'footer': {
      copyright: '© {year} {brand}. All rights reserved.',
      links: {
        terms: 'Terms of Use',
        privacy: 'Privacy',
        signOut: 'Sign Out',
      }
    },

    privacy: {
      title: 'Privacy Policy',
      heading: 'Privacy Policy',
    },

    terms: {
      title: 'Terms of Use',
      heading: 'Terms of Use',
    },

    confirmEmail: {
      title: 'Confirm Your Email Address',
      heading: 'Welcome to {name}',
      subHeading: 'Please select a password for your new account',
      submit: { actionLabel: 'Log In to your Health Check', loadingLabel: 'Please wait...', },
    },

    register: {
    title: 'Register',
      intro:
        `So we can remember who you are, and identify your fund, please enter the details below.
         Your information will never be used for any purposes outside of this helpful tool.`,
      submit: { actionLabel: 'Register', loadingLabel: 'Please wait...', },
      already: { note: 'Already registered?', actionLabel: 'Log In', },
      successful: `Thankyou for signing up. We've sent you an email with instructions on how to log in.`,
    },

    signin: {
      title: 'Log In',
      heading: 'Log In',
      submit: { actionLabel: 'Log In to your Health Check', loadingLabel: 'Please wait...', },
      needAccount: { note: 'Need an account?', actionLabel: 'Register', },
    },

    signout: {
      signingOut: 'Please wait... currently signing you out of {name}.',
      signedOut: 'You are now signed out of {name}.',
    },

    notFound: {
      title: '404 Not Found',
      heading: 'Sorry, the page you tried cannot be found.',
      incorrect: 'You may have typed the address incorrectly or you may have used an outdated link.',
      contactUs: 'If you found a broken link from another site or from our site, please contact us.',
    },

    members: {
      title: 'Member Details',
    },

    shared: {
      fields: {
        user: {
          firstName: { placeholder: 'Enter your first name...' },
          lastName: { placeholder: 'Enter your last name...' },
          email: { placeholder: 'Enter your email address...' },
          password: { placeholder: 'Enter your password...' },
          passwordConfirmation: { placeholder: 'Confirm your password...' },
          fundName: { placeholder: 'The name of your fund...' },
          fundAbn: { placeholder: 'Your fund\'s ABN...' },

          doesConsent: {
            label:
              `I am happy for {brand} to use the information I provide to compare my fund to other funds
               and to provide me with information relevant to me and my fund.`,
          },
        },
      }
    },

  }
};
