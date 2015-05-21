export default {
  locales: [ 'en' ],
  messages: {

    home: {
      hero: {
        intro:
          `Welcome to the {brand} SMSF Health Check tool, {name}.
           Compare your current fund to thousands of others SMSFs
           to see how your fund stacks up.`,
        signup: { actionLabel: 'Sign up' },
      },
      features: {
        safeData: 'Know your data is safe with bank-level security.',
        greatAdvice: 'Provide as much or as little information as you like and still receive great general advice.',
        compare: 'Compare your fund to over 11,000 funds from ATO and {name} databases.',
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
      heading: 'Begin your {name} journey',
      subHeading: 'Select a password for your account below and start comparing your fund to 11,000 others.',
      submit: { actionLabel: 'Create my {name} password', loadingLabel: 'Please wait...', },
    },

    register: {
      title: 'Register',
      intro:
        `So we can remember who you are, and identify your fund, please enter the details below.<br>
         Your information will never be used for any purposes outside of this helpful tool.`,
      submit: { actionLabel: 'Register', loadingLabel: 'Please wait...', },
      already: { note: 'Already registered?', actionLabel: 'Log In', },
      successful: `Thank you for signing up. We've sent you an email with instructions on how to log in.`,
    },

    signin: {
      title: 'Log In',
      heading: 'Log In to your Health Check',
      subHeading: 'Please enter the details below to access your {name} account.',
      submit: { actionLabel: 'Log In Now', loadingLabel: 'Please wait...', },
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
      longTitle: 'Your SMSF Member Details',
      question: 'Tell us a little about the members of your fund.',

      gender: { label: 'Gender' },
      preRetirementAnnualIncome: { label: 'Pre-retirement Annual Income' },
      currentMemberBalance: { label: 'Current Member Balance' },
      isRetired: {
        label: 'Is the member retired?',
        options: { yes: 'Yes', no: 'No' },
      },

      add: { actionLabel: 'Add a member' },
      delete: { confirmation: 'Are you sure you would like to remove this member?' },
    },

    trust: {
      title: 'Trust Structure',
      longTitle: 'Your SMSF Trust Structure',

      trusteeType: {
        question: 'What type of trustee does your fund have?',
        options: { individuals: 'Individuals as Trustee', corporate: 'Corporate trustee' },
      },
      deedSupplier: { question: 'Who supplied the trust deed for you fund?' },
      yearLastUpdated: { question: 'In which year was your trust fund last updated?' },
    },

    shared: {
      navbar: {
        signin: { actionLabel: 'Log In' },
        save: { actionLabel: 'Save', disabledLabel: 'Saved', loadingLabel: 'Saving...' },
      },

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
      },

      actions: {
        skipStep: { actionLabel: 'Skip this step' },
        prevStep: { actionLabel: 'Previous' },
        nextStep: { actionLabel: 'Next Step', loadingLabel: 'Please wait...' },
      },
    },

  }
};
