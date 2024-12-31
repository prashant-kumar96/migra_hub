import { RiGovernmentFill } from "react-icons/ri";

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
      {
        faqButton: "General Information",
        faqHeading: "Frequently Asked Questions about Canadian Visa",
        questions: [
          {
            q: "What is the validity of a Canadian visa?",
            a: "The validity of a Canadian visa is typically 10 years, or until the expiration of your passport, whichever comes first."
          },
          {
            q: "How many entries are allowed on a Canadian visa?",
            a: "Canadian visas can be issued for single or multiple entries depending on the type of visa and purpose of travel."
          }
        ]
      },
      {
        faqButton: "Application Process",
        faqHeading: "Steps to Apply for a Canadian Visa",
        questions: [
          {
            q: "What documents are required for a Canadian visa application?",
            a: "Required documents include a valid passport, completed application form, proof of funds, travel itinerary, and invitation letter (if applicable)."
          },
          {
            q: "How long does it take to process a Canadian visa?",
            a: "The processing time for a Canadian visa varies but typically takes between 2-4 weeks."
          }
        ]
      },
      {
        faqButton: "Visa Fees",
        faqHeading: "Information about Canadian Visa Fees",
        questions: [
          {
            q: "What is the fee for a Canadian tourist visa?",
            a: "The fee for a Canadian tourist visa is $100, with an additional service fee charged by MigraHub of $145."
          },
          {
            q: "Are there any additional costs involved?",
            a: "Additional costs may include biometrics, courier services, or expedited processing fees."
          }
        ]
      }
    ]
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
