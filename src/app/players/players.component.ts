import {Component, OnInit} from '@angular/core';
import {PlayersService} from './players.service';
import 'rxjs/add/operator/finally';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

    loading = false;
    errorMessage = '';
    statistics = [];
    players = [];
    stats = {};
    id = -1;
    selectedStats = [];

    constructor(private ps: PlayersService) {
    }

    ngOnInit() {
        this.getStats();
    }

    getStats(): void {
        this.loading = true;
        this.errorMessage = '';
        this.ps.getStats()
            .finally(() => {
                this.loading = false;
            })
            .subscribe(returnObj => {
                    this.statistics = returnObj.statistics;
                    this.players = returnObj.players;
                    // Create a HashObject for faster retrieval with a single pass. No recalculation required.
                    this.preComputeMap();
                    this.selectPlayer(this.players[0].player_id);
                },
                error => {
                    this.errorMessage = 'Sorry! Something went wrong!';
                });
    }

    preComputeMap() {
        let val = [];
        if (this.statistics) {
            for (let i = 0; i < this.statistics.length; i++) {
                val = this.stats[this.statistics[i].player_id];
                if (!val) {
                    val = [];
                }
                this.statistics[i].pr = this.calcPasser(this.statistics[i]).toFixed(1);
                val.push(this.statistics[i]);
                this.stats[this.statistics[i].player_id] = val;
            }
        }
    }

    selectPlayer(id: number) {
        this.id = id;
        this.selectedStats = this.stats[id];
    }

    calcPasser(obj: any): number {
        let a = ((obj.completions / obj.attempts) - 0.3) * 5;
        a = this.correctRange(a);
        let b = ((obj.yards / obj.attempts) - 3) * 0.25;
        b = this.correctRange(b);
        let c = (obj.touchdowns / obj.attempts) * 20;
        c = this.correctRange(c);
        let d = 2.375 - ((obj.interceptions / obj.attempts) * 25);
        d = this.correctRange(d);
        return ((a + b + c + d) / 6) * 100;
    }

    correctRange(val: number): number {
        if (val < 0) {
            return 0;
        }
        if (val > 2.375) {
            return 2.375;
        }
        return val;
    }


}
