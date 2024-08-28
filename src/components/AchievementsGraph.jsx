import React from 'react';

const AchievementsGraph = () => {
  const achievements = [
    {
      name: 'Roselle Ehrman',
      email: 'Email',
      imgSrc: 'https://randomuser.me/api/portraits/men/32.jpg',
      icon: '🏆',
    },
    {
      name: 'Jone Smith',
      email: 'Email',
      imgSrc: 'https://randomuser.me/api/portraits/men/44.jpg',
      icon: '⭐',
    },
    {
      name: 'Darron Handler',
      email: 'Email',
      imgSrc: 'https://randomuser.me/api/portraits/men/22.jpg',
      icon: '🔥',
    },
    {
      name: 'Leatrice Kulik',
      email: 'Email',
      imgSrc: 'https://randomuser.me/api/portraits/men/66.jpg',
      icon: '📈',
    },
    {
      name: 'Roselle Ehrman',
      email: 'Email',
      imgSrc: 'https://randomuser.me/api/portraits/men/32.jpg',
      icon: '🏆',
    },
    {
      name: 'Roselle Ehrman',
      email: 'Email',
      imgSrc: 'https://randomuser.me/api/portraits/men/32.jpg',
      icon: '🏆',
    },
    {
      name: 'Roselle Ehrman',
      email: 'Email',
      imgSrc: 'https://randomuser.me/api/portraits/men/32.jpg',
      icon: '🏆',
    },
    {
      name: 'Roselle Ehrman',
      email: 'Email',
      imgSrc: 'https://randomuser.me/api/portraits/men/32.jpg',
      icon: '🏆',
    },
    {
      name: 'Roselle Ehrman',
      email: 'Email',
      imgSrc: 'https://randomuser.me/api/portraits/men/32.jpg',
      icon: '🏆',
    },
  ];
  return (
    <div>
      <div className='bg-white rounded-3xl shadow p-6 mt-10 max-w-md mx-auto'>
        <h2 className='text-lg font-semibold mb-4 text-[#050F24]'>
          Recent User Achievements
        </h2>
        <ul className='space-y-4 h-[305px] overflow-auto'>
          {achievements.map((user, index) => (
            <li key={index} className='flex items-center justify-between '>
              <div className='flex items-center space-x-4'>
                <img
                  src={user.imgSrc}
                  alt={user.name}
                  className='w-12 h-12 rounded-full'
                />
                <div>
                  <p className='font-medium text-[#050F24]'>{user.name}</p>
                  <p className='text-sm text-[#6F757E]'>{user.email}</p>
                </div>
              </div>
              <span className='text-2xl'>{user.icon}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AchievementsGraph;
