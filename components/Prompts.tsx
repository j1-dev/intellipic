import PromptCard from './PromptCard';

export default function Prompts() {
  const promptInfo = [
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
      img: '/Images/dua1.png',
      text1: 'Paladin'
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