import { Component, Inject, TemplateRef, OnInit } from '@angular/core';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-front';

  showlogin = true;

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    if (token) {
      this.myaccount(token);
    }
  }

  constructor(private modalService: NgbModal, private user: UserService) {

  }

  myaccount(token: any) {
    this.user.myaccount(token).subscribe((res) => {
      console.log("res", res);
    })
  }

  closeResult = '';

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

}
