import React from 'react';

const WhyTrustMigraHub = () => {
  const features = [
    {
      icon: '/imgs/icons/1.png',
      title: 'Seamless Convenience',
      description:
        'Say goodbye to tedious paperwork! We handle everything for you at an exceptionally affordable price, letting you focus on what truly matters—your journey.',
    },
    {
      icon: '/imgs/icons/2.png',
      title: 'Unmatched Speed',
      description:
        'Our expedited service ensures a swift and efficient application process. Once we receive all required details and documents, we’ll submit your application online within just 48 hours.',
    },
    {
      icon: '/imgs/icons/4.png',
      title: 'Unrivaled Quality',
      description:
        'Your application is reviewed by our elite in-house team of licensed RCCIC professionals and experienced immigration lawyers, minimizing risks and maximizing success.',
    },
    {
      icon: '/imgs/icons/3.png',
      title: 'Dedicated Support',
      description:
        'From day one, you’ll be assigned a personal Case Manager who will guide you through every step of the process, ensuring a smooth and stress-free experience.',
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
          <div className='h-24'> <img src ={feature.icon} className="text-6xl mx-auto mb-2 w-[80px] h-auto"/></div>
            <h3 className="text-xl text-DarkGray font-greycliff font-bold mb-2">{feature.title}</h3>
            <p className="text-Gray mt-2 text-[17px] tracking-wide font-thin">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyTrustMigraHub;
