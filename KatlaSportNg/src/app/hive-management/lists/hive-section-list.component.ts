import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSectionListItem } from '../models/hive-section-list-item';
import { HiveService } from '../services/hive.service';
import { HiveSectionService } from '../services/hive-section.service';

@Component({
  selector: 'app-hive-section-list',
  templateUrl: './hive-section-list.component.html',
  styleUrls: ['./hive-section-list.component.css']
})
export class HiveSectionListComponent implements OnInit {

  hiveId: number;
  hiveSections: Array<HiveSectionListItem>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveSectionService: HiveSectionService,
    private hiveService: HiveService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.hiveId = p['id'];
      this.hiveService.getHiveSections(this.hiveId).subscribe(s => this.hiveSections = s);
    })
  }

  onDelete(sectionId: number) {
    var hive = this.hiveSections.find(s => s.id == sectionId);
    this.hiveSectionService.setHiveSectionStatus(sectionId, true).subscribe(c => hive.isDeleted = true);
  }

  onUndelete(sectionId: number) {
    var hive = this.hiveSections.find(s => s.id == sectionId);
    this.hiveSectionService.setHiveSectionStatus(sectionId, false).subscribe(c => hive.isDeleted = false);
  }
}
