import LeftMenu from "@/components/newspage/Leftmenu";
import MiddleContent from "@/components/newspage/MiddleContent";
import RightMenu from "@/components/newspage/RightMenu";
import React, { useState } from "react";
import BeforeLoginLayout from "@/components/BeforeLoginLayout";

const App = () => {
  const [selectedNews, setSelectedNews] = useState(null);

  const newsList = [
    {
      id: 1,
      heading: "Ted Cruz rebrands for a tight race in Texas",
      description:
        "The polarizing conservative has been softening his edges ahead of another closer-than-expected reelection campaign",
      image: "/assets/news/news1.jpg",
      details:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, nam laboriosam ex magnam error quos pariatur recusandae soluta hic beatae, sit ipsum quis sint accusamus velit doloribus minus veniam suscipit Assumenda quaerat fugiat pariatur praesentium tenetur explicabo laboriosam magni libero excepturi iure? Nesciunt eos possimus illo consequuntur sapiente inventore saepe ex exercitationem iure, blanditiis dicta omnis atque autem, voluptatem ullam. Non nostrum consequuntur aperiam possimus ea fuga debitis nulla optio sunt suscipit repellat hic provident mollitia perspiciatis itaque quas, modi tempora eligendi esse a corporis explicabo accusantium iste! Magnam, ipsa. Cum velit quos aspernatur! Vero, sit mollitia et repudiandae culpa voluptas eligendi itaque optio soluta non molestiae, ea veritatis minima quia. Illum quibusdam voluptatem accusamus atque sed dolorum facilis. Odio! Assumenda minus aperiam porro tempore? Voluptatibus consectetur atque inventore nihil aliquid! Consequuntur, aliquid repellat, laudantium fuga, rerum aspernatur officiis corporis omnis maiores impedit illum ipsum exercitationem. Aperiam deserunt voluptates unde?",
    },
    {
      id: 2,
      heading:
        "Too many Americans lack the tools to build a healthy financial future",
      description: null,
      image: "/assets/news/news2.png",
      details:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, nam laboriosam ex magnam error quos pariatur recusandae soluta hic beatae, sit ipsum quis sint accusamus velit doloribus minus veniam suscipit Assumenda quaerat fugiat pariatur praesentium tenetur explicabo laboriosam magni libero excepturi iure? Nesciunt eos possimus illo consequuntur sapiente inventore saepe ex exercitationem iure, blanditiis dicta omnis atque autem, voluptatem ullam. Non nostrum consequuntur aperiam possimus ea fuga debitis nulla optio sunt suscipit repellat hic provident mollitia perspiciatis itaque quas, modi tempora eligendi esse a corporis explicabo accusantium iste! Magnam, ipsa. Cum velit quos aspernatur! Vero, sit mollitia et repudiandae culpa voluptas eligendi itaque optio soluta non molestiae, ea veritatis minima quia. Illum quibusdam voluptatem accusamus atque sed dolorum facilis. Odio! Assumenda minus aperiam porro tempore? Voluptatibus consectetur atque inventore nihil aliquid! Consequuntur, aliquid repellat, laudantium fuga, rerum aspernatur officiis corporis omnis maiores impedit illum ipsum exercitationem. Aperiam deserunt voluptates unde?",
    },
    {
      id: 3,
      heading: "The Coming Trump Revenge Tour",
      description: null,
      image: "/assets/news/news3.png",
      details:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, nam laboriosam ex magnam error quos pariatur recusandae soluta hic beatae, sit ipsum quis sint accusamus velit doloribus minus veniam suscipit Assumenda quaerat fugiat pariatur praesentium tenetur explicabo laboriosam magni libero excepturi iure? Nesciunt eos possimus illo consequuntur sapiente inventore saepe ex exercitationem iure, blanditiis dicta omnis atque autem, voluptatem ullam. Non nostrum consequuntur aperiam possimus ea fuga debitis nulla optio sunt suscipit repellat hic provident mollitia perspiciatis itaque quas, modi tempora eligendi esse a corporis explicabo accusantium iste! Magnam, ipsa. Cum velit quos aspernatur! Vero, sit mollitia et repudiandae culpa voluptas eligendi itaque optio soluta non molestiae, ea veritatis minima quia. Illum quibusdam voluptatem accusamus atque sed dolorum facilis. Odio! Assumenda minus aperiam porro tempore? Voluptatibus consectetur atque inventore nihil aliquid! Consequuntur, aliquid repellat, laudantium fuga, rerum aspernatur officiis corporis omnis maiores impedit illum ipsum exercitationem. Aperiam deserunt voluptates unde?",
    },
  ];

  return (
    <>
      <div className="h-20 text-center flex items-center justify-center text-2xl bg-[#e5e7eb] border-2 border-gray">
        {" "}
        News{" "}
      </div>
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-200 overflow-y-auto">
          <LeftMenu newsList={newsList} setSelectedNews={setSelectedNews} />
        </div>
        <div className="w-1/2 bg-white overflow-y-auto">
          <MiddleContent selectedNews={selectedNews || newsList[0]} />
        </div>
        <div className="w-1/4 bg-gray-100 overflow-y-auto">
          <RightMenu newsList={newsList} />
        </div>
      </div>
    </>
  );
};

export default BeforeLoginLayout(App);
