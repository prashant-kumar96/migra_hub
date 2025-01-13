import VisaRequirements from "@/components/countries/visaRequirements";

const countriesData = [
  {
    id: 1,
    name: "Canada",
    flag: "canada-flag",
    code: "CA",
    visaType: "Sticker",
    stayLength: "180 Days",
    visaValidity: "10 years",
    entry: "Multiple, Single",
    capital: "Ottawa",
    region: "North America",
    currency: "$ Canadian Dollar(CAD)",
    population: "4.01 crores (2023)",
    officialLanguages: ["French", "English"],
    dialingCode: "+1",
    gdp: "2.14 lakh crores USD (2023)",
    video: "/assets/countryImgs/videos/canada.mp4",
    images: [
      "/assets/countryImgs/images/canada1.jpg",
      "/assets/countryImgs/images/canada2.jpg",
      "/assets/countryImgs/images/canada3.jpg",
      "/assets/countryImgs/images/canada4.jpg",
      "/assets/countryImgs/images/canada5.jpg",
    ],
    migrahubFee: "$145",
    governmentfee: "$100",
    faq: [
      // {
      //   faqButton: "General Information",
      //   faqHeading: "Frequently Asked Questions about Canadian Visa",
      //   questions: [
      //     {
      //       q: "What is the validity of a Canadian visa?",
      //       a: "The validity of a Canadian visa is typically 10 years, or until the expiration of your passport, whichever comes first."
      //     },
      //     {
      //       q: "How many entries are allowed on a Canadian visa?",
      //       a: "Canadian visas can be issued for single or multiple entries depending on the type of visa and purpose of travel."
      //     }
      //   ]
      // },
      {
        "faqButton": "Visa Processing",
        "faqHeading": "Steps to Apply for a Canadian Visa",
        "questions": [

          {
            "q": "Can MigraHub guarantee my travel visa will be approved?",
            "a": "Neither MigraHub nor any third party can guarantee the approval of a travel visa application. The final decision lies solely with the Canadian government. However, every application completed through MigraHub undergoes a thorough review by our dedicated team before submission to the Canadian government. Additionally, all our applications are processed by Licensed Canadian RCIC’s which will reduce your risk."
          },
          {
            "q": "How long is the visitor visa valid for?",
            "a": "The validity of the visa varies and is determined by the consular officer, often ranging from one month to ten years, allowing one time or multiple entries."
          },
          {
            "q": "How long can I stay in Canada on a visitor visa?",
            "a": "The duration of stay is determined by the officer at the port of entry, typically up to six months."
          }
        ]
      },
      {
        "faqButton": "General Information",
        "faqHeading": "Procedures for Obtaining a Canada Visa Using MigraHub",
        "questions": [
          {
            "q": "What are the steps and procedures for obtaining a Canada visa using MigraHub?",
            "a": "Visit the Canada page at https://migrahub.com/countries/canada?id=1 and select your citizenship. Click on the 'Start your Journey' button."
          },
          {
            "q": "How can I assess my chances of visa approval?",
            "a": "Do a Quick Risk Assessment so we can help increase your chances of approval."
          },
          {
            "q": "What information is required to start the process?",
            "a": "Provide your basic personal information and complete your profile."
          },
          {
            "q": "How do I proceed with the payment?",
            "a": "Proceed to make the payment as instructed on the platform."
          },
          {
            "q": "What happens after making the payment?",
            "a": "After payment, a dedicated case manager will be assigned to you and guide you in attaching the required documents."
          },
          {
            "q": "Who will review and submit my application?",
            "a": "Our RCIC immigration consultant will review and submit your application."
          },
          {
            "q": "How will I handle the biometrics appointment?",
            "a": "Your case manager will help book the biometrics appointment and support you during the process."
          },
          {
            "q": "How will I stay updated on my application?",
            "a": "We will send timely notifications to provide updates on your application."
          },
          {
            "q": "What is the next step after receiving a decision on the visa?",
            "a": "Your case manager will help you set up an appointment to submit your passport."
          }
        ]
      }

      // {
      //   faqButton: "Visa Fees",
      //   faqHeading: "Information about Canadian Visa Fees",
      //   questions: [
      //     {
      //       q: "What is the fee for a Canadian tourist visa?",
      //       a: "The fee for a Canadian tourist visa is $100, with an additional service fee charged by MigraHub of $145."
      //     },
      //     {
      //       q: "Are there any additional costs involved?",
      //       a: "Additional costs may include biometrics, courier services, or expedited processing fees."
      //     }
      //   ]
      // }
    ],
    VisaRequirements: [
      {
        name: "Passport Copy",
        logo: "/assets/visaRequirements/passport.png",
        tooltip: [
          "first and last page of passport",
          "copy of entry and exity of previous visas held"
        ],
      },
      {
        name: "Photograph",
        tooltip: "the photo graph should not be blur!",
        logo: "/assets/visaRequirements/camera.png",
      },
      {
        tooltip: ["provide bank statement of last 6 months ", "ITR"],
        name: "Proof of Funds",
        logo: "/assets/visaRequirements/bank-statement.png",
      },
      {
        name: "Itinerary Planning",
        logo: "/assets/visaRequirements/itinerary.png",
        tooltip: ["flight tickets",
          "Day to Day Itinerary ( Train/ Bus / Rental Car bookings)",
          "Hotels Bookings"
        ],
      },
      {
        name: "Cover Letter",
        tooltip: "Cover Letter",
        logo: "/assets/visaRequirements/cover.png",
      },
      {
        tooltip: ["leave approval letter",
          "salary slip of 3 months"
        ],
        name: "Employment",
        logo: "/assets/visaRequirements/employment.png",
      },
      {
        tooltip: ["Sponsorship Letter",
          "Sponsors 6 months Bank Statement"
        ],
        name: "Sponsorship",
        logo: "/assets/visaRequirements/sponsorship.png",
      },
      {
        tooltip: "Inviatation Letter",
        name: "Invitation Letter",
        logo: "/assets/visaRequirements/invitation.png",
      },
      {
        tooltip: "Company Registeration Proof",
        name: "Self-Employed",
        logo: "/assets/visaRequirements/company.png",
      },
      {
        tooltip: "Student NOC from Institute",
        name: "Student",
        logo: "/assets/visaRequirements/noc.png",
      },
    ],
  },

  {
    id: 2,
    name: "United-Kingdom",
    flag: "uk-flag",
    code: "GB",
    visaType: "Sticker",
    stayLength: "180 Days",
    visaValidity: "180 Days", //"180 Days" days
    entry: "Multiple",
    capital: "London",
    region: "Western Europe",
    currency: "£ Pound sterling ",
    population: "6.84 crores (2023)",
    officialLanguages: ["English"],
    dialingCode: "+44",
    gdp: "3.34 lakh crores USD (2023)",
    video: "/assets/countryImgs/videos/uk.mp4",
    images: [
      "/assets/countryImgs/images/uk1.jpg",
      "/assets/countryImgs/images/uk2.jpg",
      "/assets/countryImgs/images/uk3.jpg",
      "/assets/countryImgs/images/uk4.jpg",
      "/assets/countryImgs/images/uk5.jpg",
    ],
  },
  {
    id: 3,
    name: "United-States",
    flag: "usa-flag",
    code: "US",
    visaType: "Sticker",
    stayLength: "180 Days",
    visaValidity: "10 years",
    entry: "Multiple",
    capital: "Washington D.C",
    region: "North America",
    currency: "$ United States Dollar(USD) ",
    population: " 33.49 crores (2023)",
    officialLanguages: ["English"],
    dialingCode: "+1",
    gdp: "27.36 lakh crores USD (2023)",
    video: "/assets/countryImgs/videos/usa.mp4",
    images: [
      "/assets/countryImgs/images/usa1.jpg",
      "/assets/countryImgs/images/usa2.jpg",
      "/assets/countryImgs/images/usa3.jpg",
      "/assets/countryImgs/images/usa4.jpg",
      "/assets/countryImgs/images/usa5.jpg",
    ],
    migrahubFee: "$145",
    governmentfee: "$185",
    faq: [

      {
        "faqButton": "USA Visa Process",
        "faqHeading": "Steps and Procedures for Obtaining a USA Visa Using MigraHub",
        "questions": [
          {
            "q": "What is the first step to apply for a USA visa through MigraHub?",
            "a": "Visit the USA page on our website at https://migrahub.com/countries/united-states?id=3, select your citizenship, and click on the 'Start your Journey' button."
          },
          {
            "q": "What should I do after starting my journey?",
            "a": "Complete a quick risk assessment to help us increase your chances of visa approval."
          },
          {
            "q": "What personal information do I need to provide?",
            "a": "Provide your basic personal information and complete your profile."
          },
          {
            "q": "What is the next step after completing my profile?",
            "a": "Proceed to make the payment."
          },
          {
            "q": "What happens after I make the payment?",
            "a": "A dedicated case manager will be assigned to you to guide you in attaching the required documents."
          },
          {
            "q": "How does MigraHub ensure my application is reviewed properly?",
            "a": "Our immigration consultant will review your application and attached documents."
          },
          {
            "q": "Who arranges the visa appointment?",
            "a": "Your case manager will arrange an appointment and upload all required documents."
          },
          {
            "q": "How will MigraHub help me prepare for the visa interview?",
            "a": "We will help you prepare for the visa interview by providing necessary guidance."
          },
          {
            "q": "What do I need to bring to the visa appointment?",
            "a": "You can simply download the package and bring it with you to the visa appointment."
          },
          {
            "q": "What happens after the visa appointment?",
            "a": "After the appointment, you can pick up your passport in person from the given visa office."
          }
        ]
      },
      {
        "faqButton": "General Information",
        "faqHeading": "Procedures for Obtaining a USA Visa Using MigraHub",
        "questions": [
          {
            "q": "What are the steps and procedures for obtaining a USA visa using MigraHub?",
            "a": "Visit the USA page at https://migrahub.com/countries/usa?id=3 and select your citizenship. Click on the 'Start your Journey' button."
          },
          {
            "q": "What is the next step after receiving a decision on the visa?",
            "a": "Your case manager will help you set up an appointment to submit your passport."
          },
          {
            q: "",
          }
        ]
      }

    ],
    VisaRequirements: [
      {
        name: "Original passport",
        logo: "/assets/visaRequirements/passport.png",
        tooltip: [
          "first and last page of passport",
          "copy of entry and exity of previous visas held"
        ],
      },
      {
        name: "Photograph",
        tooltip: "the photo graph should not be blur!",
        logo: "/assets/visaRequirements/camera.png",
      },
      {
        tooltip: ["provide bank statement of last 6 months ", "ITR"],
        name: "Proof of Funds",
        logo: "/assets/visaRequirements/bank-statement.png",
      },
      {
        name: "Itinerary Planning",
        logo: "/assets/visaRequirements/itinerary.png",
        tooltip: ["flight tickets",
          "Day to Day Itinerary ( Train/ Bus / Rental Car bookings)",
          "Hotels Bookings"
        ],
      },
      {
        name: "Cover Letter",
        tooltip: "Cover Letter",
        logo: "/assets/visaRequirements/cover.png",
      },
      {
        tooltip: ["leave approval letter",
          "salary slip of 3 months"
        ],
        name: "Employment",
        logo: "/assets/visaRequirements/employment.png",
      },
      {
        tooltip: ["Sponsorship Letter",
          "Sponsors 6 months Bank Statement"
        ],
        name: "Sponsorship",
        logo: "/assets/visaRequirements/sponsorship.png",
      },
      {
        tooltip: "Inviatation Letter",
        name: "Invitation Letter",
        logo: "/assets/visaRequirements/invitation.png",
      },
      {
        tooltip: "Company Registeration Proof",
        name: "Self-Employed",
        logo: "/assets/visaRequirements/company.png",
      },
      {
        tooltip: "Student NOC from Institute",
        name: "Student",
        logo: "/assets/visaRequirements/noc.png",
      },
      {
        tooltip: "Must have a appoinment letter/confirmation",
        name: "appointment confirmation",
        logo: "/assets/visaRequirements/offer.png",
      },
      {
        tooltip: "Fee Reciept",
        name: "Fee Payment Reciept",
        logo: "/assets/visaRequirements/reciept.png",
      },
      {
        tooltip: " -90mins application",
        name: "DS-160 Confirmation",
        logo: "/assets/visaRequirements/confirmation.png",
      },
    ],
  },
  {
    id: 4,
    name: "Australia",
    flag: "australia-flag",
    code: "AU",
    visaType: "e-Visa",
    stayLength: "90 Days", // 90 days
    visaValidity: "3 years", // 3 years
    entry: "Multiple",
    capital: "Canberra",
    region: "North America",
    currency: "$ Australian Dollar(AUD) ",
    population: "2.66 crores (2023) ",
    officialLanguages: ["English"],
    dialingCode: "+61",
    gdp: "1.72 lakh crores USD (2023)",
    video: "/assets/countryImgs/videos/australia.mp4",
    images: [
      "/assets/countryImgs/images/australia1.jpg",
      "/assets/countryImgs/images/australia2.jpg",
      "/assets/countryImgs/images/australia3.jpg",
      "/assets/countryImgs/images/australia4.jpg",
      "/assets/countryImgs/images/australia5.jpg",
    ],
  },
  {
    id: 5,
    name: "New-Zealand",
    flag: "nz-flag",
    code: "NZ",
    visaType: "e-Visa",
    stayLength: "180 Days",
    visaValidity: "1 year",  // 1 year
    entry: "Single",
    capital: "Wellington",
    region: "Southwestern Pacific Ocean",
    currency: "$ New Zealand dollar (NZD) ",
    population: "52.2 lakhs (2023)",
    officialLanguages: ["English", "Maori", "New Zealand Sign Language"],
    dialingCode: "+64",
    gdp: "25,346.57 crores USD (2023)",
    video: "/assets/countryImgs/videos/nz.mp4",
    images: [
      "/assets/countryImgs/images/nz1.jpg",
      "/assets/countryImgs/images/nz2.jpg",
      "/assets/countryImgs/images/nz3.jpg",
      "/assets/countryImgs/images/nz4.jpg",
      "/assets/countryImgs/images/nz5.jpg",
    ],
  },
  {
    id: 6,
    name: "Italy",
    flag: "italy-flag",
    visaType: "sticker",
    code: "IT",
    stayLength: "upto 90 Days",
    visaValidity: "Variable",
    entry: "Variable",
    capital: "Rome",
    region: "Schengen Area",
    currency: "€ Euro",
    population: "5.88 crores (2023)",
    officialLanguages: ["English", "Italian"],
    dialingCode: "+39",
    gdp: "2.25 lakh crores USD (2023)",
    video: "/assets/countryImgs/videos/italy.mp4",
    images: [
      "/assets/countryImgs/images/italy1.jpg",
      "/assets/countryImgs/images/italy2.jpg",
      "/assets/countryImgs/images/italy3.jpg",
      "/assets/countryImgs/images/italy4.jpg",
      "/assets/countryImgs/images/italy5.jpg",
    ],
  },
  {
    id: 7,
    name: "Hungary",
    flag: "hungary-flag",
    code: "HU",
    visaType: "sticker",
    stayLength: "upto 90 Days",
    visaValidity: "Variable",
    entry: "Variable",
    capital: "Budapest",
    region: "Schengen Area",
    currency: "Ft Forint (HUF)",
    population: "95.9 lakhs (2023)",
    officialLanguages: ["Hungarian"],
    dialingCode: "+36",
    gdp: "21,238.89 crores USD (2023)",
    video: "/assets/countryImgs/videos/hungary.mp4",
    images: [
      "/assets/countryImgs/images/hungary1.jpg",
      "/assets/countryImgs/images/hungary2.jpg",
      "/assets/countryImgs/images/hungary3.jpg",
      "/assets/countryImgs/images/hungary4.jpg",
      "/assets/countryImgs/images/hungary5.jpg",
    ],
  },
  {
    id: 8,
    name: "Germany",
    flag: "germany-flag",
    code: "DE",
    visaType: "sticker",
    stayLength: "upto 90 Days",
    visaValidity: "Variable",
    entry: "Variable",
    capital: "Berlin",
    region: "Schengen Area",
    currency: "€ Euro",
    population: " 8.45 crores (2023)",
    officialLanguages: ["German"],
    dialingCode: "+49",
    gdp: "4.46 lakh crores USD (2023)",
    video: "/assets/countryImgs/videos/germany.mp4",
    images: [
      "/assets/countryImgs/images/germany1.jpg",
      "/assets/countryImgs/images/germany2.jpg",
      "/assets/countryImgs/images/germany3.jpg",
      "/assets/countryImgs/images/germany4.jpg",
      "/assets/countryImgs/images/germany5.jpg",
    ],
  },
];

export { countriesData };
