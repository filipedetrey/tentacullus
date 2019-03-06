
const Campanhas = {
    text : "Campanhas",
    link : "/campanhas",
    icon : "fa fa-briefcase"
};

const Jobs = {
    text : "Jobs",
    link : "/jobs",
    icon : "fa fa-crosshairs"
}

const Funcionarios = {
    text: "Funcionários",
    link: "/funcionarios",
    icon: "fa fa-user-tie"
};

const Clientes = {
    text: "Clientes",
    link: "/clientes",
    icon: "fa fa-user-alt"
}

const Configuracoes = {
    text: "Configurações",
    link: "/configuracoes",
    icon: "fa fa-cog",
    submenu: [
        {
            text: "Etapas",
            link: "/configuracoes/etapas"
        },
        {
            text: "Processos",
            link: "/configuracoes/processos"
        },
        {
            text: "Status",
            link: "/configuracoes/status"
        }
    ]
};

export const menu = [
    Campanhas,
    Jobs,
    Funcionarios,
    Clientes,
    Configuracoes
];
