import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { BaseService } from './base/base.service';
import { Pot } from '../model/pot';
import { Balance } from '../model/balance';
import { Transaction } from '../model/transaction';
import 'rxjs/add/operator/map';
import { Pong } from '../model/pong';

@Injectable()
export class MonzoService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    ping(): Observable<Pong> {
        return this.http.get(environment.baseUrl + '/ping/whoami', this.requestOptions).map(res => res.json());
    }

    getAccounts(): Observable<Account[]> {
        return this.http.get(environment.baseUrl + '/accounts', this.requestOptions).map(res => res.json());
    }

    getPots(): Observable<Pot[]> {
        return this.http.get(environment.baseUrl + '/pots/listV1', this.requestOptions).map(res => res.json());
    }

    getBalance(account_id: string): Observable<Balance> {
        this.requestOptions.params = new URLSearchParams();
        this.requestOptions.params.append('account_id', account_id);
        return this.http.get(environment.baseUrl + '/balance', this.requestOptions).map(res => res.json());
    }

    getTransaction(transaction_id: string): Observable<Transaction> {
        return this.http.get(environment.baseUrl + '/transactions/' + transaction_id, this.requestOptions).map(res => res.json());
    }

    getTransactionsWithMerchantInfo(account_id: string): Observable<Transaction[]> {
        this.requestOptions.params = new URLSearchParams();
        this.requestOptions.params.append('account_id', account_id);
        return this.http.get(environment.baseUrl + '/transactions/' + '?expand[]=merchant', this.requestOptions).map(res => res.json());
    }

    getTransactions(account_id: string): Observable<Transaction[]> {
        this.requestOptions.params = new URLSearchParams();
        this.requestOptions.params.append('account_id', account_id);
        return this.http.get(environment.baseUrl + '/transactions', this.requestOptions).map(res => res.json());
    }
}
