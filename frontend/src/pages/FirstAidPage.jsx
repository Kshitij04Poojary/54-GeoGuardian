import React, { useState, useEffect } from "react";
import firstAidData from "../assets/firstAidData";
import FirstAidCard from "../components/charts/FirstAidCard";
import firstAidData from "../assets/firstAidData";

const FirstAidPage = () => {
  const [selectedCard, setSelectedCard] = useState(firstAidData[0]);
  const [otherCards, setOtherCards] = useState(firstAidData.slice(1));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Effect to check sidebar width dynamically
  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      const observer = new MutationObserver(() => {
        setIsSidebarOpen(sidebar.classList.contains("w-64"));
      });

      observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });

      return () => observer.disconnect();
    }
  }, []);

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
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area with dynamic margin based on sidebar state */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="max-w-[1800px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Side: Selected Card with Video */}
              <div className="lg:w-3/5">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative w-full aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedCard.video}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="p-4">
                    <h1 className="text-2xl font-bold">{selectedCard.title}</h1>
                    <p className="text-gray-700 mt-2 mb-4">
                      Learn how to stay safe during a {selectedCard.title}. Follow the steps below:
                    </p>
                    
                    {/* Instructions Grid */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedCard.instructions.map((instruction, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 flex items-center"
                        >
                          <p className="text-gray-700">{instruction}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Remaining Cards */}
              <div className="lg:w-2/5">
                <div className={`grid gap-4 transition-all duration-300 ${isSidebarOpen ? "grid-cols-1" : "sm:grid-cols-2"}`}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstAidPage;