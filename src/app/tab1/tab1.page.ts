import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as JwtDecoder from 'jwt-decode';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // This is the payload to be encrypted =>> Ceci est le Payload à chiffrer
   dataToEncrypt:any = {
    id: 1234,
    name: 'Vadramson',
    organisation:'B2I Solutions',
    date: '03/12/2020',
    time: '12:31 PM'
  };

// Using HMAC SHA256 hash algorithm to create the jwt header  =>> Utilisation de l'algorithme de hachage HMAC SHA256 pour créer l'en-tête jwt
jwtHeader:any = {
    "alg": "HS256",
    "typ": "JWT"
 }

secreteKey:string='userTokenHere'; // Change this to the userToken  =>>  Remplacez-le par votre userToken existant


// Method to generate a JWT  =>> Méthode pour générer un JWT
  GenerateToken(jwtHeader, dataToEncrypt, secreteKey)
  {
  let payload:string = btoa(JSON.stringify(dataToEncrypt)); // encrypt the payload using base64url encode =>> crypter le payload à l'aide du codage base64url
  let header:string = btoa(JSON.stringify(jwtHeader)); // encrypt the header using base64url encode =>> crypter l'en-tête jwt à l'aide du codage base64url
  let payloadHeader:string = header + "." + payload;
  var llave = CryptoJS.HmacSHA256(payloadHeader, secreteKey);
  var signature = llave.toString(CryptoJS.enc.Base64);  // generating JWT signature =>> générer la signature JWT
  let token = payloadHeader + "." + signature;  // final token combination =>> 
  console.log(token);  // print the token generated
  return token;
  }

  // sample JWT encrypted data from your server
  jwtTokenData:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwibmFtZSI6IlZhZHJhbXNvbiIsIm9yZ2FuaXNhdGlvbiI6IkIySSBTb2x1dGlvbnMiLCJkYXRlIjoiMDMvMTIvMjAyMCIsInRpbWUiOiIxMjozMSBQTSJ9.+tGSr13NFIcXtNfpmmTBRWAqLUNltk7NH0lxl3kIXM0=";

 // function to decode JWT data from your server
  DecodeJWTdata(jwtTokenData){
  let data = JwtDecoder(jwtTokenData);
  console.log(data); // pintout decrypted data
  return data;
   }


  constructor() {
    this.GenerateToken(this.jwtHeader, this.dataToEncrypt, this.secreteKey);
    this.DecodeJWTdata(this.jwtTokenData);
  }

}
