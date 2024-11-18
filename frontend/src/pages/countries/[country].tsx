import Concierge from "@/components/countries/concierge";
import CountriesGrid from "@/components/countries/countriesGrid";
import VisaRejectionReasons from "@/components/countries/rejectionReasons";
import VisaTimeline from "@/components/countries/visaTimeline";
import { countriesData } from "@/utils/CountriesData";
export async function getStaticPaths() {
  const paths = countriesData.map((country) => ({
    params: { country: country.name.toLowerCase() }, // Ensure lowercase for URLs
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const countryData = countriesData.find(
    (country) => country.name.toLowerCase() === params.country
  );

  return { props: { countryData } };
}

const CountryPage = ({ countryData }) => {
  if (!countryData) return <p>Country data not found</p>;

  return (
    <div className="p-6">
      <CountriesGrid />
      <VisaTimeline/>
      <Concierge/>
      <VisaRejectionReasons/>
      
    </div>
  );
};

export default CountryPage;
