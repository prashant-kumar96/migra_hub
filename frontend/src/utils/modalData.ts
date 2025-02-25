
const ModalData = [
  {
    question: "Where is your passport from",
  },
  {
    question: "Are you applying from",
    firstLine:
      "It is easier to demonstrate that you will return to your home country and not overstay your visa when you apply from your home country",
    secondLine:
      "We will show you the earliest time you should plan to travel, based on U.S. visa appointment wait time data for India, to help prevent you from missing your trip",
    questionForNo: "Where will you apply for your visa",
    firstLineForNo:
      "Visa officers may scrutinize your application more closely, as they may want to understand why you're applying from a third country rather than your home country.",
    secondLineForNo:
      "It is possible to apply from another country, and with the right strategy, you can secure approval.",
  },
  {
    question: "Do you have employment, a spouse, or property in ",
    // "firstLine": "It's easier to prove you'll return home and not overstay your visa if you already live there",
    // "secondLine": "We will show you the earliest time you should plan to travel, based on U.S. visa appointment wait time data for India, to help prevent you from missing your trip",
    // "questionForNo":"Where will you apply for your visa",
    lineForYes:
      "Demonstrating strong ties to your home country (like family, property, or a stable job) is often crucial for visa approval.",
    firstlineForNo:
      "We'll assist you in demonstrating to the consular officer that you intend to return home and will not overstay your visa.",
    secondlineForNo:
      "We'll achieve this by guiding you on how to showcase strong ties to your country ",
  },
  {
    question:
      "Have you previously traveled internationally and returned to your home country? ",
    lineForYes:
      "Consular officers often review past international travel, and returning home afterward indicates a likelihood of doing the same after this trip.",
    firstlineForNo:
      "For first-time international travelers, it's vital to clearly explain your return plans. Proving you won’t overstay your visa can be challenging without prior travel experience. Our service will help you present your intentions clearly, showing your understanding of the visa rules and your commitment to complying.",
    // secondlineForNo:
    //   "It can be harder to prove you won't overstay your travel visa if this is your first international trip. Our service will help you talk about your plans in a way that clearly shows you will use your visa properly, and understand the rules",
  },
  {
    question: "Have you had a travel visa application denied in the past 90 days? ",
    firstlineForYes:
      "You can still be approved, and we’ll assist you in finding ways to strengthen your case!",
    secondlineForYes:
      "While consular officers generally don’t reverse recent denials, making approval more challenging, it’s still possible. We’ll evaluate your situation and identify ways to improve your application.",
    lineForNo:
      "Great to hear! Having no recent denials significantly strengthens your case.",
  },
  {
    question:
      "Sign in or Register to assess your travel visa denial risk and discover how we can reduce it.",
  },
];

export { ModalData };
