import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SortablejsModule } from 'angular-sortablejs'

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { ProcessoService } from './services/processo.service';
import { StatusService } from './services/status.service';
import { EtapaService } from './services/etapa.service';
import { ClienteService } from './services/cliente.service';
import { FuncionarioService } from './services/funcionario.service';
import { WebsocketService } from './services/websocket.service';

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        RoutesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        SortablejsModule.forRoot({ animation: 150 })
    ],
    providers: [
        EtapaService,
        ProcessoService,
        StatusService,
        ClienteService,
        FuncionarioService,
        WebsocketService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
