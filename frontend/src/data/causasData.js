const causes = [
  {
    id: 'alimentacao-escolar',
    image: './icons/crianca_carente.png', 
    title: 'Alimentação Escolar',
    description: 'Garantindo refeições nutritivas para crianças em escolas públicas.',
    progress: 89, // %
    goal: 430, 
    link: '/abrigo' ,
  },
  {
    id: 'cuidados-com-idosos',
    image: './icons/idososcarentes.png',
    title: 'Cuidados com Idosos',
    description: 'Apoio médico e social para idosos em situação de vulnerabilidade.',
    progress: 56,
    goal: 990,
    link: '/abrigo' ,
  },
  {
    id: 'abrigo-moradores-rua',
    image: './icons/mendigoscarente.png',
    title: 'Abrigo para Moradores de Rua',
    description: 'Oferecendo abrigo, alimentação e oportunidades de reinserção social.',
    progress: 20,
    goal: 640,
    link: '/abrigo' ,
  }
];

export default causes;