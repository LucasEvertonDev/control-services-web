import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/authorization/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    canActivate: [authGuard]
  },
  {
    path: 'clientes',
    loadChildren: () => import('./features/clientes/cliente.module').then(m => m.ClienteModule),
    canActivate: [authGuard]
  },
  {
    path: 'servicos',
    loadChildren: () => import('./features/servicos/servicos.module').then(m => m.ServicosModule),
    canActivate: [authGuard]
  },
  {
    path: 'atendimentos',
    loadChildren: () => import('./features/atendimentos/atendimentos.module').then(m => m.AtendimentosModule),
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/usuarios/usuarios.module').then(m => m.UsuariosModule),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
