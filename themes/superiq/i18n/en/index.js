import _ from 'lodash';

export default {
  locales: [ 'en' ],
  messages: {

    home: {
      hero: {
        intro:
          `Welcome to the {brand} SMSF Health Check tool, <strong>{name}</strong>.
           Compare your current fund to thousands of others SMSFs
           to see how your fund stacks up.`,
        signup: { actionLabel: 'Sign up' },
      },
      features: {
        safeData: 'Know your data is safe <br class="visible-md visible-lg" /> with bank-level <br class="visible-md visible-lg"/> security.',
        greatAdvice: 'Provide as much or as little information as you like and still receive great general advice.',
        compare: 'Compare your fund to over 11,000 funds from ATO and {name} databases.',
      },
    },

    footer: {
      copyright: '© {year} {brand}. All rights reserved.',
      links: {
        guide: 'Financial Services Guide',
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

    welcome: {
      title: 'Welcome to {name}',
      body:
        `<p>
           Your are about to embark on the most comprehensive comparison and health check process
           ever available for Self Managed Super Funds. To do this we compare your SMSF data to those
           of over thousands of funds administered on the {brand} platform as well as data supplied
           from sources such as the Australian Taxation Office.
         </p>
         <p>
           All the way through the comparison tool we will show you the similarities and differences
           between your fund and other funds, and supply you with useful information to help you make
           the most of your fund.
         </p>
        <p>
          At the end of the comparison we will provide you with a summary of the comparison and some
          things for you to think about.
        </p>`,
        start: { actionLabel: 'Start Your SMSF Health Check' },
    },

    member: {
      gender: { label: 'Gender' },

      dateOfBirth: {
        label: 'Date of Birth',
        placeholder: 'DD / MM / YYYY',
      },
      preRetirementAnnualIncome: { label: 'Pre-retirement Annual Income' },
      currentMemberBalance: { label: 'Current Member Balance' },
      isRetired: {
        label: 'Is the member retired?',
        options: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ],
      },

      typesOfBenefits: {
        label: 'Types of benefits',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
        advice: 'What are the different types of death benefit nominations?',
      },
      yearBenefitLastUpdated: {
        label: 'Last updated?',
        options: _.times(20, (i) => (new Date().getFullYear() - i).toString()),
      },
      beneficiary: {
        label: 'Who is the beneficiary?',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
        advice: 'Have I nominated the right beneficiaries?',
      },
      hasWill: {
        label: 'Does the member have a will?',
        options: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ],
      },
      hasEnduringPowersOfAttorney: {
        label: 'Do the members of your Fund have Enduring Powers of Attorney?',
        options: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ],
      },

      insuranceTitle: 'Types of Insurance',

      hasLifeInsurance: { label: 'Life Insurance', },
      lifeInsuranceAmount: { placeholder: '$ Amount', },
      lifeInsuranceHeldAt: {
        placeholder: 'Where is the insurance held?',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
      },

      hasDisablement: { label: 'Total and Permanent Disablement', },
      disablementAmount: { placeholder: '$ Amount', },
      disablementHeldAt: {
        placeholder: 'Where is the insurance held?',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
      },

      hasIncomeProtection: { label: 'Income Protection', },
      incomeProtectionAmount: { placeholder: '$ Amount', },
      incomeProtectionHeldAt: {
        placeholder: 'Where is the insurance held?',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
      },

      pensionsTitle: 'Types of Pensions',

      hasAccountBasedPension: { label: 'Account based', },
      accountBasedPensionAmount: { placeholder: '$ Amount', },
      accountBasedPensionInterval: {
        options: [
          { value: 'per-week', label: 'Per week' },
        ],
      },

      hasTransitionToRetirementPension: { label: 'Transition to retirement', },
      transitionToRetirementAmount: { placeholder: '$ Amount', },
      transitionToRetirementInterval: {
        options: [
          { value: 'per-week', label: 'Per week' },
        ],
      },

      hasOtherPension: { label: 'Other', },
      otherPensionAmount: { placeholder: '$ Amount', },
      otherPensionInterval: {
        options: [
          { value: 'per-week', label: 'Per week' },
        ],
      },

      contributionsTitle: 'Types of Contributions',

      hasConcessionalContribution: { label: 'Concessional', },
      concessionalContributionAmount: { placeholder: '$ Amount', },
      concessionalContributionInterval: {
        options: [
          { value: 'per-week', label: 'Per week' },
        ],
      },

      hasNonConcessionalContribution: { label: 'Non Concessional', },
      nonConcessionalContributionAmount: { placeholder: '$ Amount', },
      nonConcessionalContributionInterval: {
        options: [
          { value: 'per-week', label: 'Per week' },
        ],
      },

      hasOtherContribution: { label: 'Other', },
      otherContributionAmount: { placeholder: '$ Amount', },
      otherContributionInterval: {
        options: [
          { value: 'per-week', label: 'Per week' },
        ],
      },
    },

    members: {
      title: 'Member Details',
      longTitle: 'Your SMSF Member Details',
      question: 'Tell us a little about the members of your fund.',

      add: { actionLabel: 'Add a member' },
      delete: { confirmation: 'Are you sure you would like to remove this member?' },

      smsfBasics: { advice: 'What are the basics of a SMSF?' },
      smsfRightForMe: { advice: 'Is a SMSF right for me?' },
    },

    trust: {
      title: 'Trust Structure',
      longTitle: 'Your SMSF Trust Structure',

      trusteeType: {
        label: 'What type of trustee does your fund have?',
        options: [
          { value: 'individuals', label: 'Individuals as Trustee' },
          { value: 'corporate', label: 'Corporate trustee' },
        ],
        advice: 'Do I have the right type of trustee?',
      },

      deedSupplier: {
        label: 'Who supplied the trust deed for you fund?',
        options: [ 'Unknown', 'Freehills', 'Madgwicks', 'SuperCentral' ],
      },

      yearLastUpdated: {
        label: 'In which year was your trust fund last updated?',
        options: _.times(20, (i) => (new Date().getFullYear() - i).toString()),
        advice: 'Should I upgrade my trust deed?',
      },
    },

    accounting: {
      title: 'Tax & Accounting',
      longTitle: 'Tax & Accounting',

      whoDoesIt: {
        label: 'Who does the accounting and tax work for your fund?',
        options: [
          { value: 'myself', label: 'I do it myself' },
          { value: 'accountant', label: 'My accountant does it' },
          { value: 'administrator', label: 'A SMSF administrator does it' },
          { value: 'financial-planner', label: 'My Financial Planner does it' },
        ],
        advice: 'Should I use a professional administrator?',
      },

      costPerYear: {
        label: 'How much does it cost per year?',
        options: [
          '< $1,000',
          '$1,001 - $1,500',
          '$1,501 - $2,000',
          '$2,001 - $2,500',
          '$2,501 - $3,000',
          '$3,001 - $3,500',
          '$3,500+',
        ],
        advice: 'Am I paying too much tax and accounting?',
      },
    },

    investmentAdvice: {
      title: 'Investment Advice',
      longTitle: 'Investment Advice',

      whoDoesIt: {
        label: 'Who provides investment advice for your fund?',
        options: [
          { value: 'myself', label: 'I do it myself' },
          { value: 'financial-planner', label: 'My Financial Planner does it' },
          { value: 'accountant', label: 'My accountant does it' },
        ],
        advice: 'Should I get professional investment advice?',
      },

      costPerYear: {
        label: 'How much does it cost per year?',
        options: [
          '< $1,000',
          '$1,001 - $1,500',
          '$1,501 - $2,000',
          '$2,001 - $2,500',
          '$2,501 - $3,000',
          '$3,001 - $3,500',
          '$3,500+',
        ],
        advice: 'Am I paying too much for investment advice?',
      },
    },

    investmentStrategy: {
      title: 'Investment Strategy',
      longTitle: 'Investment Strategy',

      hasStrategy: {
        label: 'Does your fund have an Investment Strategy?',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        advice: 'Does my fund require an Investment Strategy?',
      },

      considerations: {
        label: 'Does your investment strategy consider the cashflow, liquidity liabilities and tax consequences of holding certain assets for the fund?',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },

      yearLastUpdated: {
        label: 'When was your investment strategy last updated?',
        options: _.times(20, (i) => (new Date().getFullYear() - i).toString()),
        advice: 'How frequently should I update my Investment Strategy?',
      },

      assetAllocations: {
        label: 'What is the current asset allocation in your investment strategy?',
        assets: {
          cashAndFixedInterest: 'Cash & Fixed Interest...',
          australianEquities: 'Australian Equities...',
          internationalEquities: 'International Equities...',
          directProperty: 'Direct Property...',
          internationalCashAndFixedInterest: 'International Cash & Fixed Interest...',
          internationalShares: 'International Shares...',
          listedProperty: 'Listed Property...',
          mortgages: 'Mortgages...',
          other: 'Other...',
        },
      }
    },

    estatePlanning: {
      title: 'Estate Planning',
      longTitle: 'Estate Planning',
      advice: 'Should members of my fund have a death benefit nomination?',

      haveBeneficiary: {
        label: 'Do the members of your fund have death benefit nominations in place?',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
    },

    insurance: {
      title: 'Insurance',
      longTitle: 'Insurance',
      advice: 'Should I hold insurance in my SMSF?',

      haveInsurance: {
        label: 'Do the members of your fund have insurance in place?',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },

      typesOfInsurance: { advice: 'What types of insurance should the members of my fund be considering?' },
      howMuchInsurance: { advice: 'How much insurance should we have?' },
    },

    pensions: {
      title: 'Pensions',
      longTitle: 'Pensions',

      havePensions: {
        label: 'Do the members of your fund have pensions in place?',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },

      typesOfPensions: { advice: 'What types of pensions are available to the members of my fund?' },
      shouldStart: { advice: 'Should I start a pension?' },
    },

    contributions: {
      title: 'Contributions',
      longTitle: 'Contributions',

      haveContributions: {
        label: 'Are any of the members of your fund making contributions?',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },

      typesOfContributions: { advice: 'What types of contributions can members make to my fund and what are the rules about these contributions? ' },
      shouldContribute: { advice: 'Should I contribute more to my fund?' },
    },

    results: {
      title: 'Results',
      longTitle: 'Results',
    },

    shared: {
      charts: {
        title: 'Compare Members & Funds',
        compareTo: {
          prefix: 'Compare to ',
          all: 'Compare to all members and funds',
        },
        activeDataSet: {
          ato: 'Display ATO SMSF data set',
          siq: 'Display {name} data set',
        },
      },

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

      beforeUnload: { message: 'You have unsaved changes. If you leave before saving, your changes will be lost.' },

      adviceDisclaimer: {
        title: 'General Advice',
        text:
          `The information we share with you is general advice. We don’t take into account your objectives,
           financial situation or needs in deciding what information to share with you. Before you act on any
           of this information you should consider its appropriateness having regard to your objectives,
           financial situation and needs. If we share information about financial products you should obtain a
           copy of the relevant Product Disclosure Statement and consider the information it contains before
           making any decision to acquire the product.`,

         actionLabel: 'General Advice',
      },
    },

  }
};
