import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveService } from '../services/hive.service';
import { Hive } from '../models/hive';

@Component({
  selector: 'app-hive-form',
  templateUrl: './hive-form.component.html',
  styleUrls: ['./hive-form.component.css']
})
export class HiveFormComponent implements OnInit {

  hive = new Hive(0, "", "", "", false, "");
  existed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveService: HiveService
  ) { }

  ngOnInit() {
    this.subscribeRoute();
  }

  subscribeRoute() {
    this.route.params.subscribe(p => {
      if (p['id'] === undefined) return;
      this.hiveService.getHive(p['id']).subscribe(h => this.hive = h);
      this.existed = true;
    });
  }

  navigateToHives() {
    this.router.navigate(['/hives']);
  }

  onCancel() {
    this.navigateToHives();
  }
  
  onSubmit() {
    if (this.existed) {
      this.hiveService.updateHive(this.hive).subscribe(h => this.navigateToHives());
    } else {
      this.hiveService.addHive(this.hive).subscribe(h => this.navigateToHives());
    }
  }

  onDelete() {
    this.hiveService.setHiveStatus(this.hive.id, true).subscribe(h => this.subscribeRoute());
  }

  onUndelete() {
    this.hiveService.setHiveStatus(this.hive.id, false).subscribe(h => this.subscribeRoute());
  }

  onPurge() {
    this.hiveService.deleteHive(this.hive.id).subscribe(h => this.navigateToHives());
  }
}
