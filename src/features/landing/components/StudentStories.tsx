import React from "react";
import { stories, type Story } from "../data/stories";

const StudentStories: React.FC = () => {
    return (
        <section className="py-10 bg-white">
            <div className="max-w-6xl mx-auto px-5">

                <h2 className="text-2xl font-bold text-center mb-8">
                    Student Success Stories
                </h2>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">

                    <div className="grid grid-cols-2 gap-4">
                        {stories.map((story: Story) => (
                            <div
                                key={story.id}
                                className="relative flex flex-col justify-end w-full aspect-[3/4] bg-cover bg-center bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                                style={{ backgroundImage: `url(${story.image})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                                <div className="relative p-4 text-center z-10 transition-transform duration-300 group-hover:-translate-y-1">
                                    <h3 className="text-sm font-bold text-white mb-0.5">{story.name}</h3>
                                    <p className="text-xs font-medium text-gray-200">{story.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-900 text-white rounded-2xl flex flex-col h-full overflow-hidden shadow-xl">
                        <div
                            style={{ backgroundImage: `url("https://randomuser.me/api/portraits/men/20.jpg")` }}
                            className="bg-cover bg-center h-48 sm:h-64 relative"
                        >
                            <div className="absolute inset-0 bg-black/50 p-6 flex items-center justify-center">
                                <h3 className="text-xl sm:text-2xl font-bold text-center leading-snug">
                                    "Way to taking paths <br /> Not just for standard"
                                </h3>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <p className="text-gray-300 italic mb-6">
                                    "The lessons we learn from students bring unique experiences and
                                    perspectives to the classroom that enrich our lives."
                                </p>
                                <div className="w-16 h-1 bg-blue-500 rounded-full mb-6"></div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 rounded-xl overflow-hidden aspect-video">
                                    <img
                                        src="https://randomuser.me/api/portraits/men/32.jpg"
                                        alt="Featured Story 1"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 rounded-xl overflow-hidden aspect-video">
                                    <img
                                        src="https://randomuser.me/api/portraits/women/44.jpg"
                                        alt="Featured Story 2"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentStories;
