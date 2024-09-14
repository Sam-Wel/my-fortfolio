import React from "react";

const Hobby = () => {
  const techs = [
    {
      id: 1,
      date: "12/4/2024",
      title: "Instruments",
      content:"I can play three Eritrean/Ethiopian instruments such as Kirar, Mesenqo, Shambqo(Washint). I am a member of a church choir at my church (DGKM Eritrean Orthodox Tewahedo Church) and I play these insturments at special. I enjoy singing and playing these instruments at my recreational time as well.",
      style: "shadow-black",
      size:"w-20 mx-auto",
    },
    {
      id: 2,
      date: "10/5/2024",
      title: "Books",
      content:"I like to read history books, mainly focused on the Horn Of Africa. I started reading history books since I was in 9th grade and I have aquired deep knowledge of the history and politics of that region. I have a collection of books on many events in history of that region and I have created a website to share them with my friends.",
      style: "shadow-black",
      size:"w-20 mx-auto",
    },
    {
      id: 3,
      date: "11/4/2024",
      title: "Entertainent",
      content:"I enjoy watching movies or tv-shows such as Redemption, The 100, Breaking Bad etc. I watch sports like Premier League and UFC. I play video games, mainly FIFA. ",
      style: "shadow-black",
      size:"w-20 mx-auto",
    },
  ];

  return (
    <div className=" bg-dark-blue">
    <div className="">
          <p className="text-blue-500 text-4xl font-bold border-b-4 h-6 p-3">
          </p>
    </div>
    <div
      name="hobby"
      className=" mt-8 flex items-center  bg-gradient-to-b w-full md:h-full justify-center md:items-end"
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center  ">
        <div>
          <p className="text-blue-500 text-4xl font-bold border-b-4 border-gray-500 p-2 ">
            Hobby
          </p>
          <p className="py-6 text-gray-300">I will be writting some blogs and they will be listed on these page. NOTE: this is mock blog (currently on construction)</p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-8 text-center py-8 px-12 sm:px-0 text-white">
          {techs.map(({ id, date, title, style,content }) => (
            <div
              key={id}
             className={`shadow-md hover:scale-105 bg-blue-900 flex flex-col duration-500 py-2 rounded-lg ${style} `}
            >
                <h1 className="inline font-bold">{title}</h1>
                <p className="inline float-right px-4 mb-3 text-gray-400">{ "updated since " + date}</p>
                <p className="mt-4  mx-4">{content}</p>
                <a className="bg-blue-500 hover:bg-blue-700" href="https://www.youtube.com/@samuelfessehaye" style={{
            padding: '10px 20px',
            margin:'10px',
            textDecoration: 'none',
            borderRadius: '5px'
          }}>More Detail</a>
            </div>
  
          ))}
        </div>
      </div>
      
    </div>
    </div>
  );
};

export default Hobby;
