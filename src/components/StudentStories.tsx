import React from "react";
import { stories } from "../data/storiesData";

const StudentStories: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-5">

        <h2 className="text-2xl font-semibold text-center mb-8">
          Student Success Stories
        </h2>

        <div className="grid md:grid-cols-2 place-items-center gap-3">

          <div className="grid grid-cols-2 gap-3 col-span-1">
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col items-center w-35 h-45 bg-cover bg-gray-50 rounded-xl shadow p-4 hover:shadow-md transition"
                style={{ backgroundImage: `url(${story.image})` }}
              >
                
                <div className="w-35 mt-26 rounded-b-2xl py-3 bg-black/30 ">
                <h3 className="text-sm font-semibold text-center text-white">{story.name}</h3>
                <p className="text-xs text-center text-white">{story.role}</p>
                </div>
              </div>
            ))}
          </div>


          <div className="bg-gray-900 text-white rounded-2xl flex flex-col justify-between">
            <div style={{ backgroundImage: `url("https://randomuser.me/api/portraits/men/20.jpg")`}}
            className="bg-cover h-1/2 rounded-t-2xl  bg-black/30" >
              <div className="flex w-full h-full items-center justify-center rounded-t-2xl py-3 bg-black/70 ">
              <h3 className="text-lg font-semibold  m-10">
                Way to taking paths <br /> Not just for standard
              </h3>
              </div>
            </div>
            <div className="m-2">
               <p className="text-sm text-gray-300 ml-4">
                The lessons we learn from students bring unique experiences and
                perspectives to the classroom that enrich our lives.
              </p>
            </div>
            <hr className="w-1/4 ml-30"></hr>


            <div className="relative flex  overflow-hidden">
              <div className="w-3/7 m-5 rounded-2xl">
                <img
                src="https://randomuser.me/api/portraits/men/20.jpg"
                alt="Featured Story"
                className="w-full h-40 object-cover rounded-2xl"
              />
              </div>
              <div className="w-3/7 m-5 rounded-2xl">
                <img
                src="https://randomuser.me/api/portraits/men/20.jpg"
                alt="Featured Story"
                className="w-full h-40 object-cover rounded-2xl"
              />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentStories;
