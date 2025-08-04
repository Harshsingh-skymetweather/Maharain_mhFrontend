import { Component, OnInit } from '@angular/core';
import { PacketcountService } from '../service/misc/packetcount.service';
@Component({
  selector: 'app-data-packet-count',
  templateUrl: './data-packet-count.component.html',
  styleUrls: ['./data-packet-count.component.scss']
})
export class DataPacketCountComponent implements OnInit {
  report:any;
  constructor(private packet:PacketcountService) { }

  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit(){
   this.packet.Datapacket().subscribe((res) => {
     this.report = res;
   });
 }

}
