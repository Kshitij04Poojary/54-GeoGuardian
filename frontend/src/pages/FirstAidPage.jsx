import React from "react";
import FirstAidCard from "../components/FirstAidCard";
import firstAidData from "../assets/firstAidData";
import Chatbot from "../components/chats/Chatbot";

const FirstAidPage = () => {
  const [selectedCard, setSelectedCard] = React.useState(firstAidData[0]);
  const [otherCards, setOtherCards] = React.useState(firstAidData.slice(1));

  const handleCardClick = (index) => {
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
    <div className="flex gap-4 h-screen p-6 bg-gray-50 cursor-pointer">
      {/* Left Side: Selected Card with Video */}
      <div className="w-3/5 flex flex-col h-full">
        {/* Fixed height video container */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={selectedCard.video}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Content section with scrollable instructions */}
        <div className="flex flex-col flex-grow mt-4 max-h-[calc(100vh-56vh)] overflow-y-auto cursor-pointer">
          <h1 className="text-2xl font-bold">{selectedCard.title}</h1>
          <p className="text-gray-700 mt-2 mb-4">
            Learn how to stay safe during a {selectedCard.title}. Follow the steps below:
          </p>

          {/* Scrollable instructions grid */}
          <div className="grid grid-cols-2 gap-4 overflow-y-auto cursor-pointer">
            {selectedCard.instructions.map((instruction, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow py-4 px-2 flex items-center justify-center h-[4rem]"
              >
                <p className="text-gray-700 text-sm">{instruction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Remaining Cards in 2x2 Grid */}
      <div className="w-2/5 grid grid-cols-2 gap-4 h-full overflow-y-auto">
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
      <Chatbot />
    </div>
  );
};

export default FirstAidPage;