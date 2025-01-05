import Navbar from "@/components/countries/navbar";
import Footer from "@/components/Footer";
import React from "react";

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto mt-6 p-4">
                {/* Title */}
                <h1 className="text-3xl font-bold mb-4 text-Indigo">Privacy Policy</h1>

                {/* Last Updated */}
                <p className="text-gray-500 mb-6 italic">Last Updated: October 25, 2024</p>

                {/* Content */}
                <div className="space-y-6 text-gray-700 text-justify space-y-6 leading-relaxed tracking-wide ">
                    <p>
                        Welcome to MigraHub India Pvt. Ltd (<strong>“MigraHub”</strong>). At MigraHub,
                        we are committed to protecting and respecting your privacy.
                    </p>
                    <p>
                        This Privacy Policy describes our policies and procedures on the
                        collection, use, disclosure, and transfer of Your information by
                        MigraHub and/or its parent/subsidiary company, group entities and/or
                        Affiliate(s) (collectively referred to as <strong>“Company”</strong>{" "}
                        or <strong>“we”</strong> or <strong>“us”</strong>) when You use our
                        Service. This Privacy Policy forms part of the Terms of Use for the
                        Services. Capitalized terms that have been used here but are
                        undefined shall have the same meaning as attributed to them in the
                        Terms of Use.
                    </p>
                    <p>
                        By using the Service, you agree to the collection, storage, and use
                        of the Personal Data that you provide (including any changes thereto
                        as provided by you) in accordance with this Privacy Policy.
                    </p>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default PrivacyPolicy;
