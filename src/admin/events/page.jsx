
"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';


export default function Page() {
  const [events, setEvent] = useState([]);


  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/event');
        const data = await response.json();
        setEvent(data.reverse());
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (post) => {
    router.push(`/admin/events/update?slug=${post.slug}`)
  }

  const handleView = (post) => {
    window.open(`/events/view?slug=${post.slug}`, '_blank');
  }

  const handleDelete = async (post) => {
    const hasComfirmed = confirm("are you sure you want to delete this events")

    if (hasComfirmed) {
      try {
        await fetch(`/api/event/${post.slug}`, {
          method: 'DELETE',
        });

        const filteredPost = events.filter((p) => p.slug !== post.slug);
        setEvent(filteredPost);

      } catch (error) {
        console.log(error);
      }
    }
  }

  console.log('log events', events);

  // const sortEvents = () => {
  //   const today = new Date();
  //   console.log('today: ', today);
  //   const pastEvents = events.filter((event) => new Date(event.updateAt) < today);
  //   const upcomingEvents = events.filter((event) => new Date(event.updateAt) >= today);
  //   return { pastEvents, upcomingEvents };
  // };

  // const { pastEvents, upcomingEvents } = sortEvents();


  const sortEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Mettre l'heure à 00:00:00:000
    console.log('today: ', today);
    const pastEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      console.log('eventDate: ', eventDate);
      return eventDate < today;
    });
    const upcomingEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      console.log('event: ', event.updateAt);
      eventDate.setHours(0, 0, 0, 0);
      console.log('eventDate: ', eventDate);
      return eventDate >= today;
    });
    return { pastEvents, upcomingEvents };


  };

  const { pastEvents, upcomingEvents } = sortEvents();



  console.log('pastEvents: ', pastEvents);
  console.log('upcomingEvents: ', upcomingEvents);


  const formattedDate = (dateString ) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };




  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Events posts</h1>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {events && events.map(post => (
          <div key={post._id} className="bg-white overflow-hidden flex flex-row-reverse rounded-lg shadow-md mb-28 ">
           

            <div className=' p-2 flex-grow md:overflow-y-auto' >
              <div className=' flex-1' >
                <h3 onClick={() => handleView(post)} className="text-lg cursor-pointer font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 line-clamp-2">{post.description}</p>
                <div className="flex items-center mt-4">
                  <span className="text-gray-600">{post.date}</span>

                </div>
              </div>
              <div className=' flex justify-between mt3' style={{ marginTop: 10, }} >
                <button onClick={() => handleEdit(post)} className='update-button' >Update Post</button>
                <button onClick={() => handleDelete(post)} className='delete-button' >Delete Post</button>
              </div>

            </div>

            <div className=' cursor-pointer w-10 flex-none md:w-50'>

              <Image
                onClick={() => handleView(post)}
                src={post.imageUrl}
                alt={post.title}
                className=" h-full  w-40 mb-4 "
                width={300}
                height={200}
                objectFit='cover'
              />
            </div>

          </div>
        ))}
      </div> */}




      <div className=" mt-4">
        <div className="container mx-auto px-4 py-16 max-w-7xl  ">
          {/* <h1 className="text-6xl mt-16 font-bold text-center mb-8">Quantum Arise Events</h1> */}
          <div className="flex flex-col md:flex-row justify-between items-center ">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
            </div>

            <div className=" bg-gray-500 h-[1px] w-full"></div>
          </div>

          <div className="mt-8">
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {upcomingEvents.map((event) => (
                  // <EventCard key={event.id} event={event} />

                  <div key={event._id} className="bg-white overflow-hidden flex flex-row-reverse rounded-lg shadow-md mb-28 ">


                  <div className=" p-2 flex-grow md:overflow-y-auto" >
                    <div className=" flex-1" >
                      <h3 onClick={() => handleView(event)} className="text-lg cursor-pointer font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-600 line-clamp-3">{event.description}</p>
                      <div className="flex items-center mt-4">
                        {/* <span className="text-gray-600">{event.date}</span> */}

                        <span className="text-gray-600">{formattedDate(event.date)}</span>

                      </div>
                    </div>
                    <div className=" flex justify-between mt3" style={{ marginTop: 10, }} >
                      <button onClick={() => handleEdit(event)} className="update-button" >Update</button>
                      <button onClick={() => handleDelete(event)} className="delete-button" >Delete</button>
                    </div>

                  </div>

                  <div className=" cursor-pointer w-40 flex-none md:w-60">

                    <Image
                      onClick={() => handleView(event)}
                      src={event.imageUrl}
                      alt={event.title}
                      className=" h-full  w-full mb-4 "
                      width={500}
                      height={200}
                      objectFit='cover'
                    />
                  </div>

                </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No upcoming events found.</p>
            )}
          </div>

          <div className="flex flex-col mt-20 md:flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              {/* <SlCalendar className="text-2xl" /> */}
              <h2 className="text-2xl font-bold">Past Events</h2>
            </div>
            <div className="flex items-center gap-2">
              {/* <SlCheckCircle className="text-2xl text-green-500" /> */}
              <h2 className="text-xl font-bold"></h2>
            </div>
            <div className=" bg-gray-500 h-[1px] w-full"></div>
          </div>

          <div className="mt-8">
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pastEvents.map((event) => (
                  // <EventCard key={event.id} event={event} />

                  <div key={event._id} className="bg-blue-100 overflow-hidden flex flex-row rounded-lg shadow-md mb-28 ">


                  <div className=" p-2 flex-grow md:overflow-y-auto" >
                    <div className=" flex-1" >
                      <h3 onClick={() => handleView(event)} className="text-lg cursor-pointer font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-600 line-clamp-3">{event.description}</p>
                      <div className="flex items-center mt-4">
                        {/* <span className="text-gray-600">{event.date}</span> */}
                        <span className="text-gray-600">{formattedDate(event.date)}</span>

                      </div>
                    </div>
                    <div className=" flex justify-between mt3" style={{ marginTop: 10, }} >
                      <button onClick={() => handleEdit(event)} className="update-button" >Update</button>
                      <button onClick={() => handleDelete(event)} className="delete-button" >Delete</button>
                    </div>

                  </div>

                  <div className=" cursor-pointer w-40 flex-none md:w-60">

                    <Image
                      onClick={() => handleView(event)}
                      src={event.imageUrl}
                      alt={event.title}
                      className=" h-full  w-full mb-4 "
                      width={300}
                      height={200}
                      objectFit='cover'
                    />
                  </div>

                </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No past events found.</p>
            )}
          </div>
        </div>
      </div>
    </div>


  )
}
