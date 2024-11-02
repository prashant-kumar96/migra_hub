const ModalData = [
  {
    question: "Where is your passport from?",
  },
  {
    question: "Are you applying from",
    firstLine:
      "It's easier to prove you'll return home and not overstay your visa if you already live there",
    secondLine:
      "We will show you the earliest time you should plan to travel, based on U.S. visa appointment wait time data for India, to help prevent you from missing your trip",
    questionForNo: "Where will you apply for your visa",
    firstLineForNo:
      "It's possible to apply from another country and get approved as long as you have the right interview strategy.",
    secondLineForNo:
      "Applying outside of your passport country can make it harder to get a visa if you don't provide important context for the consular officer.",
  },
  {
    question: "Do you either have a job, a spouse or own property in India",
    // "firstLine": "It's easier to prove you'll return home and not overstay your visa if you already live there",
    // "secondLine": "We will show you the earliest time you should plan to travel, based on U.S. visa appointment wait time data for India, to help prevent you from missing your trip",
    // "questionForNo":"Where will you apply for your visa",
    lineForYes:
      "Strong connections to your home country help show you will return and not overstay in visa",
    firstlineForNo:
      "We'll help you show the consular officer you plan to return home and not overstay your visa",
    secondlineForNo:
      "We'll do this by explaining how to show strong connections to your country ",
  },
  {
    question:
      "In the past have you travelled internationally and returned home",
    lineForYes:
      "Past international travel is one of the factors most often reviewed by consular officers. Returning home afterwards shows you're likely to do so after this trip too",
    firstlineForNo:
      "Many applicants are traveling internationally for the first time, which means it's important to be extra clear about how and when you'll return home",
    secondlineForNo:
      "It can be harder to prove you won't overstay your travel visa if this is your first international trip. Our service will help you talk about your plans in a way that clearly shows you will use your visa properly, and understand the rules",
  },
  {
    question:
      "Have you been denied a travel visa to the United States in the last 90 days",
    firstlineForYes:
      "You can still get approved, and we'll help you find ways to strengthen your case!",
    secondlineForYes:
      "Consular officers don't typically overturn recent denials, so it can be harder to get approved if you were recently denied. But it's still possible, and we'll assess your situation for anything that can strengthen your application. If denied, we'll help you reapply for free",
    lineForNo:
      "Good to know! Having o recent denials makes your case much stronger",
  },
  {
    question:
      "Create an account to see your travel visa denial risk and how we will lower it",
  },
];

export { ModalData };
