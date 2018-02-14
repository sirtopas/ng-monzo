import { Component, OnInit } from '@angular/core';
import { MonzoService } from './shared/services/monzo.service';
import { Observable } from 'rxjs/Rx';
import { Transaction } from './shared/model/transaction';
import { Balance } from './shared/model/balance';
import { Pot } from './shared/model/pot';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    pots: Pot[];
    balance: Balance;
    transactions: Transaction[];
    accounts: Account[];
    constructor(private monzoService: MonzoService) { }

    ngOnInit() {
        this.monzoService.ping().subscribe(pong => {
            this.monzoService.getAccounts().subscribe(accounts => {
                this.accounts = accounts;
                this.monzoService.getTransactions('').subscribe(transactions => {
                    this.transactions = transactions;
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
