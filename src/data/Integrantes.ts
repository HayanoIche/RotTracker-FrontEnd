
export interface Integrante {
    slug: string;
    nome: string;
    rm: string;
    descricao: string;
    imagem: string;
    github?: string;
    linkedin?: string;
}

export const integrantes: Integrante[] = [
    {
        slug: "igor-mateus",
        nome: 'Igor Mateus da Silva',
        rm: '1TDSPK - RM 571751',
        descricao: 'Responsável pelo desenvolvimento da API Rest em Java e Spring, do site e da aplicação.',
        imagem: '../src/assets/integrantes/igor.jpeg',
        github: 'https://github.com/HayanoIche',
        linkedin: 'https://www.linkedin.com/in/igor-mateus-da-silva-4b05013ba/'
    },
    {
        slug: "marcela-batista",
        nome: 'Marcela Batista',
        rm: '1TDSPK - RM 574069',
        descricao: 'Responsável pelo desenvolvimento da API Rest em Java e Spring, do site e da aplicação.',
        imagem: '../src/assets/integrantes/marcela.jpeg',
        github: 'https://github.com/wonbindasilva',
        linkedin: 'https://www.linkedin.com/in/marcelabteixeira/'
    },
    {
        slug: "matheus-pereira",
        nome: 'Matheus Pereira',
        rm: '1TDSPK - RM 573327',
        descricao: 'Responsável pelo desenvolvimento do sistema em Python, além da parte de inteligência artificial do RotTracker, incluindo a preparação do dataset e a criação do chatbot com IBM Watson Assistant.',
        imagem: '../src/assets/integrantes/matheus.jpeg',
        github: 'https://github.com/pereirinh44',
        linkedin: 'https://linkedin.com/in/matheus-pereira-8700893b3'
    },
    {
        slug: "franco-marquina",
        nome: 'Franco Marquina',
        rm: '1TDSPK - RM 572901',
        descricao: 'Responsável pelo desenvolvimento da API Rest em Java e Spring, do site e da aplicação.',
        imagem: '../src/assets/integrantes/franco.jpeg',
        github: 'https://github.com/Fmarquina',
        linkedin: 'https://www.linkedin.com/in/franco-jared-marquina-blas-b67851303/'
    },
];
