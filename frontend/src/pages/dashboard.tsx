import { FC } from "react";

const Dashboard: FC = () => {
  const username = "username";

  const handleGetPhotos = () => {
    console.log("get photos button clicked");
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <p>
        Welcome <span className="font-bold capitalize">{username}</span> !
      </p>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores error natus illum expedita ut aut minus sapiente, neque repudiandae praesentium ratione adipisci rerum exercitationem eius explicabo blanditiis voluptates est!</p>



      <button
        onClick={handleGetPhotos}
        className="border-2 border-black rounded-xl p-2 hover:bg-black hover:text-white font-bold"
      >
        Get Photos
      </button>
    </div>
  );
};

export default Dashboard;
