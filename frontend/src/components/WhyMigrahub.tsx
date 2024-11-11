import React from 'react';

const WhyTrustMigraHub = () => {
  const features = [
    {
      icon: '/imgs/icons/1.png',
      title: 'Speed and Simplicity',
      description:
        'Easy, traveler-friendly application process. Simple and much less complicated than dealing with foreign governments.',
    },
    {
      icon: '/imgs/icons/2.png',
      title: 'Expert Quality Check',
      description:
        'All documents are reviewed by a team of immigration experts. Our staff is well trained and offers years of experience.',
    },
    {
      icon: '/imgs/icons/4.png',
      title: 'Secure and Safe',
      description:
        'World-class data centers and state-of-the-art security. Your credit card information will never be exposed to any government websites!',
    },
    {
      icon: '/imgs/icons/3.png',
      title: 'Awesome Support',
      description:
        'Our best in class customer service team is here to help you. We want you to enjoy your travels and avoid the stress of getting a visa!',
    },
  ];

  return (
    <div className="py-10">
      <div className="text-center mb-10">
      <h2 className="text-center text-4xl font-semibold tracking-wider capitalize text-Indigo mt-8">Why Trust MigraHub</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-20">
        {features.map((feature, index) => (
          <div key={index} className="bg-white shadow-xl rounded-lg p-4 text-center">
            <img src ={feature.icon} className="text-6xl mx-auto mb-2 w-[80px] h-auto"/>
            <h3 className="text-xl text-DarkGray font-greycliff font-bold mb-2">{feature.title}</h3>
            <p className="text-Gray mt-2 text-[17px] tracking-wide font-thin">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyTrustMigraHub;
