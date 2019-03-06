import { LayoutComponent } from '../layout/layout.component';
export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'configuracoes', loadChildren: './configuracoes/configuracoes.module#ConfiguracoesModule' },
            { path: 'funcionarios', loadChildren: './funcionarios/funcionarios.module#FuncionariosModule' },
            { path: 'clientes', loadChildren: './clientes/clientes.module#ClientesModule' },
            { path: 'campanhas', loadChildren: './campanhas/campanhas.module#CampanhasModule' },
            { path: 'jobs', loadChildren: './jobs/jobs.module#JobsModule' },
        ]
    },
    // Not found
    { path: '**', redirectTo: 'home' }

];
