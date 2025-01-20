import Concierge from "@/components/countries/concierge";
import CountriesGrid from "@/components/countries/countriesGrid";
import Navbar from "@/components/countries/navbar";
import VisaRejectionReasons from "@/components/countries/rejectionReasons";
import Travel from "@/components/countries/travel";
import VisaInfo from "@/components/countries/visaInfo";
import VisaRequirements from "@/components/countries/visaRequirements";
import VisaTimeline from "@/components/countries/visaTimeline";
import Footer from "@/components/Footer";
import { countriesData } from "@/utils/CountriesData";
import VisaItinerary from "@/components/countries/visaItinerary";
import FAQ from "@/components/countries/faq"
import Header2 from "@/components/Header";



// export async function getStaticPaths() {
//   const paths = countriesData.map((country) => ({
//     params: { country: country.name.toLowerCase() },
//   }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const countryData = countriesData.find(
//     (country) => country.name.toLowerCase().replace(/\s+/g, '-') === params.country
//   );

//   if (!countryData) {
//     return {
//       notFound: true, // Returns 404 page
//     };
//   }

//   return { props: { countryData } };
// }
const CountryPage = ({ }) => {
  return (
    <>
      <Header2 />
      <div className="p-6 flex flex-col items-center">
        {/* Centered CountriesGrid */}
        <div className="mb-8 w-full max-w-screen-2xl">
          <CountriesGrid />
        </div>

        {/* Main Content: Left and Right Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <VisaInfo />
            <VisaRequirements />
            <VisaItinerary />
            <VisaTimeline />
            <FAQ />
          </div>

          {/* Right Column (Travel Component on Large Screens) */}
          <div className="sticky top-20 self-start hidden lg:block">
            <Travel />
          </div>
        </div>

        {/* Travel Component for Medium Screens */}
        <div className="mt-6 hidden md:block lg:hidden w-full">
          <Travel />
        </div>

        {/* Travel Component for Mobile Screens */}
        <div className="mt-6 md:hidden w-full">
          <Travel />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CountryPage;

