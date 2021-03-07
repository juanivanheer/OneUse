import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pago-mercadopago',
  templateUrl: './pago-mercadopago.component.html',
  styleUrls: ['./pago-mercadopago.component.css']
})
export class PagoMercadopagoComponent implements OnInit, AfterViewInit {

  /*
    Mis claves de mi cuenta (juan)
      PUBLIC_KEY = 'TEST-366bb1a8-1506-4b7f-935f-e10999fe6b5c'
      AUTH_KEY = 'TEST-4098695958980794-042601-bbf0cd1a389dea655e9504621063e743-25259647'
  /*

  /* 
    Claves de usuario de prueba (comprador)
      email: test_user_89988783@testuser.com
      password: qatest1195
  */

  /*
    Claves de usuario de prueba (vendedor)
      email: test_user_52104585@testuser.com
      password: qatest3162

      (PRUEBA)
      PUBLIC_KEY = 'TEST-61b31f04-75ef-4300-bc1c-005bbd45197a'
      AUTH_KEY = 'TEST-6154841231917150-052800-34a55d9d7e73a0024e594c6cb7a6b650-575276817'

      (PRODUCCIÓN)
      PUBLIC_KEY = 'APP_USR-7cb54efe-7724-4fd0-a3e1-4ab5e701c5f1'
      AUTH_KEY = 'APP_USR-6154841231917150-052800-3cce632f355c757cbf37f535bd70be21-575276817'
  */

  PUBLIC_KEY = 'TEST-61b31f04-75ef-4300-bc1c-005bbd45197a'
  AUTH_KEY = 'TEST-6154841231917150-052800-34a55d9d7e73a0024e594c6cb7a6b650-575276817'

  mercadoPagoFormGroup: FormGroup;
  description = 'Articulo de cocina';
  transaction_amount = '88';
  cardNumber;
  cardholderName;
  cardExpirationMonth;
  cardExpirationYear;
  securityCode;
  installments;
  docType;
  docNumber;
  email;
  installments_hidden;

  tiposDni = [];
  cuotas = [];
  hayCuotas = false;
  JSON;

  constructor(private _formBuilder: FormBuilder, private _auth: AuthService) { }

  ngAfterViewInit() {
    var div = (<HTMLFormElement>document.querySelector('#mp'));
    var card = (<HTMLElement>document.createElement('script'));
    card.setAttribute('type', "text/javascript");
    card.setAttribute('src', "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js");
    card.setAttribute('data-button-label', 'Alquilar');
    card.setAttribute('data-elements-color', '#4a70af');
    card.setAttribute('data-preference-id', '575276817-66e76c50-9264-4062-8e34-19cf8a743de2');
    div.appendChild(card)
  }

  ngOnInit() {
    //Mercadopago.setPublishableKey(this.PUBLIC_KEY);

    //NO ME SIRVE PORQUE NO ME DEJA TRAER LOS DATOS EN EL DATA-CHECKOUT DEL MAT-SELECT
    //Mercadopago.getIdentificationTypes(); 
    this._auth.get_tipos_dni(this.AUTH_KEY).subscribe(
      res => {
        for (let index = 0; index < res.length; index++) {
          this.tiposDni.push(res[index].name)
        }
      }
    )

    this.mercadoPagoFormGroup = this._formBuilder.group({
      description: [{ disabled: true }],
      transaction_amount: [{ disabled: true }], //definir valor dependiendo de donde se pida a MP
      cardNumber: ['', Validators.required],
      cardholderName: ['', Validators.required],
      cardExpirationMonth: ['', Validators.required],
      cardExpirationYear: ['', Validators.required],
      securityCode: ['', Validators.required],
      installments: ['', Validators.required],
      docType: ['', Validators.required],
      docNumber: ['', Validators.required],
      email: ['', Validators.required],
      token: ['']
    });

    this.mercadoPagoFormGroup.patchValue({ description: this.description, transaction_amount: this.transaction_amount })

  }

  guessPaymentMethod() {
    //let cardnumber = (<HTMLInputElement>document.getElementById("cardNumber")).value
    let cardnumber = this.cardNumber;
    if (cardnumber.length >= 6) {
      let bin = cardnumber.substring(0, 6);
      //Mercadopago.getPaymentMethod({ "bin": bin }, this.setPaymentMethod);

      if (cardnumber.length > 7) {
        this.cuotas.length = 0;
        let cuotas_hidden = (<HTMLSelectElement>document.getElementById('installments_hidden')).children;
        for (let i = 0; i < cuotas_hidden.length; i++) {
          const element = cuotas_hidden[i];
          this.cuotas.push(element.innerHTML.toString())
        }
        this.hayCuotas = true;
      } else {
        this.hayCuotas = false;
        this.cuotas.length = 0;
      }
    } else {
      this.hayCuotas = false;
      this.cuotas.length = 0;
    }
  };

  setPaymentMethod(status, response) {
    if (status == 200) {
      let paymentMethodId = response[0].id;
      let element = (<HTMLInputElement>document.getElementById('payment_method_id'));
      element.value = paymentMethodId;
      /*Mercadopago.getInstallments(
        
        {
          "payment_method_id": (<HTMLInputElement>document.getElementById('payment_method_id')).value,
          "amount": parseFloat((<HTMLInputElement>document.getElementById('transaction_amount')).value)
        },
        
        {
          "payment_method_id": (<HTMLInputElement>document.getElementById('payment_method_id')).value,
          "amount": parseFloat((<HTMLInputElement>document.getElementById('transaction_amount_hidden')).value)
        },
        function (status, response) {
          if (status == 200) {
            (<HTMLSelectElement>document.getElementById('installments_hidden')).options.length = 0;
            response[0].payer_costs.forEach(installment => {
              let opt = <HTMLOptionElement>document.createElement('option');
              opt.text = installment.recommended_message;
              opt.value = installment.installments;
              (<HTMLSelectElement>document.getElementById('installments_hidden')).appendChild(opt);
            });
          } else {
            alert(`installments method info error: ${response}`);
          }
        });*/
    } else {
      alert(`payment method info error: ${response}`);
    }

  }

  flag = false;

  doPay(event) {
    this.encapsularDatosEnForm();
    event.preventDefault();
    var $form = (<HTMLFormElement>document.querySelector('#pay'));
    //Mercadopago.createToken($form, this.sdkResponseHandler);
    return false;
  };

  sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
      alert("verify filled data");
    } else {
      var form = (<HTMLFormElement>document.querySelector('#pay'));
      var card = (<HTMLElement>document.createElement('input'));
      card.setAttribute('name', 'token');
      card.setAttribute('type', 'hidden');
      card.setAttribute('id', 'token');
      card.setAttribute('value', response.id);
      form.appendChild(card);
    }
  };

  encapsularDatosEnForm() {
    (<HTMLInputElement>document.getElementById('description2')).setAttribute('value', this.description);
    (<HTMLInputElement>document.getElementById('transaction_amount2')).setAttribute('value', this.transaction_amount);
    (<HTMLInputElement>document.getElementById('cardNumber2')).setAttribute('value', this.cardNumber);
    (<HTMLInputElement>document.getElementById('cardholderName2')).setAttribute('value', this.cardholderName);
    (<HTMLInputElement>document.getElementById('cardExpirationMonth2')).setAttribute('value', this.cardExpirationMonth);
    (<HTMLInputElement>document.getElementById('cardExpirationYear2')).setAttribute('value', this.cardExpirationYear);
    (<HTMLInputElement>document.getElementById('securityCode2')).setAttribute('value', this.securityCode);
    (<HTMLInputElement>document.getElementById('docNumber2')).setAttribute('value', this.docNumber);
    (<HTMLInputElement>document.getElementById('email2')).setAttribute('value', this.email);
    (<HTMLOptionElement>document.getElementById('docType2')).setAttribute('value', this.mercadoPagoFormGroup.value.docType);

    let payment_method_id = (<HTMLInputElement>document.getElementById('payment_method_id')).getAttribute('value').toString();
    (<HTMLInputElement>document.getElementById('payment_method_id2')).setAttribute('value', payment_method_id);

    let string: String = this.mercadoPagoFormGroup.value.installments
    let installments = string.substr(0, 2);
    (<HTMLOptionElement>document.getElementById('installments2')).setAttribute('value', installments);
  }

  desencapsularDatosForm() {
    if (this.mercadoPagoFormGroup.value.description != "" &&
      this.mercadoPagoFormGroup.value.transaction_amount != "" &&
      this.mercadoPagoFormGroup.value.cardNumber != "" &&
      this.mercadoPagoFormGroup.value.cardholderName != "" &&
      this.mercadoPagoFormGroup.value.cardExpirationMonth != "" &&
      this.mercadoPagoFormGroup.value.cardExpirationYear != "" &&
      this.mercadoPagoFormGroup.value.securityCode != "" &&
      this.mercadoPagoFormGroup.value.docNumber != "" &&
      this.mercadoPagoFormGroup.value.email != "" &&
      this.mercadoPagoFormGroup.value.installments != "" &&
      this.mercadoPagoFormGroup.value.doctype != "") {
      let array = ((<HTMLInputElement>document.getElementById('token')).getAttribute('value'))
      this.mercadoPagoFormGroup.patchValue({ token: array });
    }
  }

  back() {
    setTimeout(() => {
      console.log(this.armarJSON());
      this._auth.pago_tarjeta(this.armarJSON()).subscribe(
        res => {
          console.log(res.body)
        },
        err => {
          console.log(err.body)
        }
      );
    }, 5000);

  }

  armarJSON() {
    let description = (<HTMLInputElement>document.getElementById('description2')).value
    let transaction_amount = (<HTMLInputElement>document.getElementById('transaction_amount2')).value
    let email = (<HTMLInputElement>document.getElementById('email2')).value
    let payment_method_id = (<HTMLInputElement>document.getElementById('payment_method_id2')).value
    let installments: string = (<HTMLInputElement>document.getElementById('installments2')).value
    let token = (<HTMLInputElement>document.getElementById('token')).value

    let installments2 = parseInt(installments);
    let transaction_amount2 = parseInt(transaction_amount);

    let JSON = {
      description: description,
      transaction_amount: transaction_amount2,
      payment_method_id: payment_method_id,
      installments: installments2,
      token: token,
      payer: {
        email: email
      }
    }

    return JSON;
  }


  testMP() {

  }
}
