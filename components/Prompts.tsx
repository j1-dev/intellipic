import PromptCard from './PromptCard';

export default function Prompts() {
  const promptInfo = [
    {
      img: '/Images/messVik.png',
      text1: 'Vikingo'
    },
    {
      img: '/Images/lebJedi.png',
      text1: 'Jedi'
    },
    {
      img: '/Images/davJedi.png',
      text1: 'Jedi'
    },
    {
      img: 'https://photoshot.app/prompts/sacha/viking.png',
      text1: 'Vikingo'
    },
    {
      img: 'https://photoshot.app/prompts/sacha/superhero.png',
      text1: 'Superhéroe'
    },
    {
      img: 'https://photoshot.app/prompts/sacha/astronaut.png',
      text1: 'Astronauta'
    },
    {
      img: '/Images/dvid1.png',
      text1: 'Payaso'
    },
    {
      img: 'https://photoshot.app/prompts/romy/hobbit.png',
      text1: 'Hobbit'
    },
    {
      img: '/Images/davWiz.png',
      text1: 'Hechicero'
    },
    {
      img: '/Images/f1driver.png',
      text1: 'F1'
    },
    {
      img: '/Images/davKnight.png',
      text1: 'Knight'
    },
    {
      img: '/Images/dua1.png',
      text1: 'Paladin'
    },
    {
      img: '/Images/weloclown.png',
      text1: 'Payaso'
    },
    {
      img: '/Images/missi.png',
      text1: 'Hobbit'
    },
    {
      img: '/Images/weloMonster.png',
      text1: 'Monstruo'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {promptInfo.map((data, index) => (
        <PromptCard img={data.img} text={data.text1} key={index} />
      ))}
    </div>
  );
}
