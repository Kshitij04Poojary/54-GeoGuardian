import video1 from './FirstAid.mp4';
import video2 from './Flood.mp4';
import video3 from './Earthquake.mp4';
import video4 from './Landslide.mp4';
import video5 from './Cyclone.mp4';


const firstAidData = [
    {
        id: "firstAid",
        title: "First Aid",
        image: "https://media.istockphoto.com/id/477984136/vector/first-aid-kit.jpg?s=612x612&w=0&k=20&c=zfKTAwJ6RVhOpvMGKOeTJ6_GyYDXOjwUBNxNZ_17Q1M=",
        video: video1,
        instructions: [
          "Ensure the area is safe before approaching the injured person.",
          "Check if the person is responsive by gently shaking or tapping them and asking, 'Are you okay?'",
          "If the person is not breathing, begin CPR immediately if you are trained to do so.",
          "Control bleeding by applying direct pressure to the wound using a clean cloth or bandage.",
          "For burns, cool the area with running water for at least 10 minutes and avoid using ice directly.",
          "If someone is choking, use abdominal thrusts (Heimlich maneuver) if trained.",
          "Do not move the person if you suspect a spinal injury unless they are in immediate danger.",
          "Call emergency services and provide them with all necessary details.",
          "Keep the injured person warm and comfortable while waiting for help to arrive.",
          "Familiarize yourself with a basic first aid kit and keep it stocked with essentials.",
        ],
      },
    {
      id: "flood",
      title: "Flood",
      image: "https://s7d1.scene7.com/is/image/wbcollab/jung_photo_three?qlt=90&fmt=webp&resMode=sharp2",
      video: video2,
      instructions: [
        "Move to higher ground immediately.",
        "Avoid walking or driving through floodwaters.",
        "Boil water before drinking or use bottled water.",
        "Turn off gas and electricity at the main switches.",
        "Be cautious of snakes and other animals in the water.",
      ],
    },
    {
      id: "earthquake",
      title: "Earthquake",
      image: "https://www.foremost.com/images/Earthquake-Safety.jpg",
      video: video3,
      instructions: [
        "Drop, cover, and hold under a sturdy table or desk.",
        "Stay away from windows, mirrors, and heavy furniture.",
        "If outdoors, move to an open area away from buildings.",
        "Avoid using elevators during or after the quake.",
        "Be prepared for aftershocks.",
      ],
    },
    {
      id: "landslide",
      title: "Landslide",
      image: "https://m.economictimes.com/thumb/msid-52279199,width-1200,height-1200,resizemode-4,imgsize-117707/12-per-cent-of-indias-land-mass-vulnerable-to-landslide-gsi.jpg",
      video: video4,
      instructions: [
        "Stay away from the landslide path and debris flow.",
        "Monitor for ground movement and unusual sounds.",
        "Evacuate immediately if instructed by authorities.",
        "Avoid riverbanks or hilly areas during heavy rain.",
        "Report any unusual cracks or bulges in the ground.",
      ],
    },
    {
      id: "cyclone",
      title: "Cyclone",
      image: "https://images.moneycontrol.com/static-mcnews/2024/10/20241024105821_cyclone.jpg?impolicy=website&width=770&height=431",
      video: video5,
      instructions: [
        "Secure your home and remove loose objects from outdoors.",
        "Stay indoors and keep away from windows.",
        "Have an emergency kit ready with essential supplies.",
        "Listen to weather updates and alerts from authorities.",
        "Evacuate to a safe shelter if required.",
      ],
    },
  ];
  
  export default firstAidData;
  