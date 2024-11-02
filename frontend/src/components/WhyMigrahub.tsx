import React from 'react';

const WhyTrustMigraHub = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Speed and Simplicity',
      description:
        'Easy, traveler-friendly application process. Simple and much less complicated than dealing with foreign governments.',
    },
    {
      icon: '✔️',
      title: 'Expert Quality Check',
      description:
        'All documents are reviewed by a team of immigration experts. Our staff is well trained and offers years of experience.',
    },
    {
      icon: '🔒',
      title: 'Secure and Safe',
      description:
        'World-class data centers and state-of-the-art security. Your credit card information will never be exposed to any government websites!',
    },
    {
      icon: '🎧',
      title: 'Awesome Support',
      description:
        'Our best in class customer service team is here to help you. We want you to enjoy your travels and avoid the stress of getting a visa!',
    },
  ];

  return (
    <div className="bg-white py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Why Trust MigraHub</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-20">
        {features.map((feature, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-6xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyTrustMigraHub;
