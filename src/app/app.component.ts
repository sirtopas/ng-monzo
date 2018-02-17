import { Component, OnInit } from '@angular/core';
import { MonzoService } from './shared/services/monzo.service';
import { Observable } from 'rxjs/Rx';
import { Transaction } from './shared/model/transaction';
import { Balance } from './shared/model/balance';
import { Pot } from './shared/model/pot';
import { Pong } from './shared/model/pong';
import { Merchant } from './shared/model/merchant';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    merchants: Merchant[] = [];
    pong: Pong;
    pots: Pot[];
    balance: Balance;
    transactions: Transaction[];
    accounts: Account[];
    title = 'My first AGM project';
    lat = 51.678418;
    lng = 7.809007;

    constructor(private monzoService: MonzoService) { }

    ngOnInit() {
        this.monzoService.ping().subscribe(pong => {
            this.pong = pong;
            this.monzoService.getAccounts().subscribe(accounts => {
                this.accounts = accounts;
                this.monzoService.getTransactionsWithMerchantInfo('').subscribe(transactions => {
                    this.transactions = transactions;
                    this.transactions.forEach(trans => {
                        if (trans.merchant && trans.merchant.address) {
                            this.merchants.push(trans.merchant);
                        }
                    });
                    this.lat = this.merchants[0].address.latitude;
                    this.lng = this.merchants[0].address.longitude;
                    this.monzoService.getBalance('').subscribe(balance => {
                        this.balance = balance;
                        this.monzoService.getPots().subscribe(pots => {
                            this.pots = pots;
                        });
                    });
                });
            });
        });
    }
}
