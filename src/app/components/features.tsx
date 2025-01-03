import Image from 'next/image';
import React from 'react';

function Features() {
  return (
    <main className='font-sans'>
      {/* Parent */}
      <div className="max-w-[1050px] mx-auto mt-16 px-4">
        {/* Top Text */}
        <div className="flex justify-center items-center">
          <div className="text-center">
            <p className="text-[#23A6F0]">Practice Advice</p>
            <h2 className="text-[#252B42] font-bold text-[40px]">Featured Posts</h2>
            <p className="text-[#737373]">
              Problems trying to resolve the conflict between <br />
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
        </div>

        {/* Columns Section */}
        <div className="mt-20">
          {/* Parent Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 justify-center items-center">
            {/* Card Component */}
            {[{ img: '/road1.png', title: 'Loudest à la Madison #1', date: '22 April 2021', comments: '10 comments' },
              { img: '/car.png', title: 'Loudest à la Madison #2', date: '23 April 2021', comments: '8 comments' },
              { img: '/umbrella.png', title: 'Loudest à la Madison #3', date: '24 April 2021', comments: '5 comments' }
            ].map((card, index) => (
              <div key={index} className="w-full max-w-[348px] mx-auto h-auto shadow-lg shadow-gray-200">
                {/* Image */}
                <div className="w-full h-auto">
                  <Image
                    src={card.img}
                    alt={`Card ${index + 1}`}
                    width={348}
                    height={300}
                    layout="responsive"
                  />
                </div>

                {/* Text */}
                <div className="px-5 mt-3">
                  <div className="flex gap-4 mt-4">
                    <p className="text-[#8EC2F2]">Google</p>
                    <p className="text-[#737373]">Trending</p>
                    <p className="text-[#737373]">New</p>
                  </div>

                  <h2 className="text-[#252B42] text-2xl my-5">
                    {card.title}
                  </h2>
                  <p className="text-[#737373]">
                    We focus on ergonomics and meeting <br />
                    you where you work. It is only a <br />
                    keystroke away.
                  </p>

                  <div className="flex justify-between items-center mt-5">
                    <div className="flex items-center gap-3">
                      <Image src="/cooli1.png" width={20} height={20} alt="Icon" />
                      <span className="text-[#737373]">{card.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/vector.png" width={20} height={20} alt="Icon" />
                      <span className="text-[#737373]">{card.comments}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 my-5">
                    <p className="text-[#737373]">Learn More</p>
                    <Image src="/arrow.png" width={10} height={10} alt="Arrow Icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Features;
