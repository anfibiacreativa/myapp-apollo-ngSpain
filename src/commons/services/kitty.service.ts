import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class KittyService {
  kitten: Kitty[];
  kitty: Kitty;
  newKitty: KittyInput;

  private allKitten: Kitty[] = gql`
  query AllKitten {
    kittens {
      id
      name
    }
  }`;
  private addKitten: Kitty = gql`
  mutation createKitty($kitten: KittyInput) {
    createKitty(input: $kitten) {
      id
      name
    }
  }`;
  
  constructor (
    private apollo: Apollo
  ) { 
    // We use the gql tag to parse our query string into a query document
  }

  generateId = () => {
    const randomId = Math.random();
    return randomId * 100;
  }

  getKitten = () => {
    return this.apollo.watchQuery<any>({
      query: this.allKitten
    })
  }

  addNewKitty = (newkitty: Kitty) => {
    let id = this.generateId();
    this.apollo.mutate<Kitty>({
      mutation: this.addKitten,
      variables: {
        kitten: {
          id: Math.round(id).toString(),
          name: newkitty.name
        }
      }
    }).subscribe(result => {
      console.log(`Your new kitty ${JSON.stringify(result)} is ready to go to space`);
    },(error) => {
      console.log('Mission aborted. Sorry!', error);
    })
  }
}
