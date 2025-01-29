import React from "react";
import firstAidData from "../assets/firstAidData";  // Import the data array
import FirstAidCard from "../components/charts/FirstAidCard";
import Sidebar from "../components/Sidebar";

const FirstAidPage = () => {
  
    // <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
    //   {firstAidData.map((content) => (
    //     <div key={content.id} className="flex gap-4 p-6 bg-white rounded-lg shadow">
    //       {/* 60% Column */}
    //       <div className="w-3/5">
    //         <video controls className="w-full rounded mb-4">
    //           <source src={content.video} type="video/mp4" />
    //           Your browser does not support the video tag.
    //         </video>
    //         <h1 className="text-2xl font-bold mb-2">{content.title}</h1>
    //         <p className="text-gray-700">
    //           Learn how to stay safe during a {content.title}. Follow the steps below:
    //         </p>
    //       </div>

    //       {/* 40% Column */}
    //       <div className="w-2/5 grid grid-cols-2 gap-4">
    //         {content.instructions.map((instruction, index) => (
    //           <div
    //             key={index}
    //             className="bg-white rounded-lg shadow p-4 flex items-center justify-center text-center"
    //           >
    //             <p className="text-gray-700">{instruction}</p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   ))}
    // </div>
    // Manage the state of the selected card and the remaining cards
  const [selectedCard, setSelectedCard] = React.useState(firstAidData[0]);
  const [otherCards, setOtherCards] = React.useState(firstAidData.slice(1));

  const handleCardClick = (index) => {
    // Swap the clicked card with the currently selected card
    const newSelectedCard = otherCards[index];
    const updatedOtherCards = [
      selectedCard,
      ...otherCards.slice(0, index),
      ...otherCards.slice(index + 1),
    ];

    setSelectedCard(newSelectedCard);
    setOtherCards(updatedOtherCards);
  };

  return (
    <>
    <Sidebar />
    <div className="space-y-8 p-6 bg-gray-100 h-screen">
      <div className="flex gap-4">
        {/* Left Side: Selected Card with Video */}
        <div className="w-3/5">
          {/* YouTube-style video container */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${selectedCard.video}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h1 className="text-2xl font-bold mt-4">{selectedCard.title}</h1>
          <p className="text-gray-700 mb-4">
            Learn how to stay safe during a {selectedCard.title}. Follow the steps below:
          </p>
          {/* Instructions */}
          <div className="grid grid-cols-2 gap-2 pb-16">
            {selectedCard.instructions.map((instruction, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 flex items-center text-center"
              >
                <p className="text-gray-700">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Remaining Cards in 2x2 Grid */}
        <div className="w-2/5 grid grid-cols-2 gap-2">
          {otherCards.map((card, index) => (
            <div
              key={card.id}
              className="cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <FirstAidCard
                id={card.id}
                title={card.title}
                image={card.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default FirstAidPage;
