import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CatTeaserComponent } from '../commons/components/cat-teaser/cat-teaser.component';
import { NewCatComponent } from '../commons/components/new-cat/new-cat.component';

@NgModule({
  declarations: [
    AppComponent,
    CatTeaserComponent,
    NewCatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    {
    provide: APOLLO_OPTIONS,
    useFactory(httpLink: HttpLink) {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'http://localhost:8000/api'
        })
      };
    },
    deps: [HttpLink]
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
