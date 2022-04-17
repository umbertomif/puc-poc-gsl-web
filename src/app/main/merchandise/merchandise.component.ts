import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { UserAccountModel } from '../../core/models/user-account.model';
import { UserAccountService } from '../../core/services/user-account.service';
import { MerchandiseModel } from '../../core/models/merchandise.model';
import { MerchandiseService } from '../../core/services/merchandise.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.scss']
})
export class MerchandiseComponent implements OnInit {

  term: any;
  listUserProfile: UserAccountModel[]=[];
  merchandiseModel: MerchandiseModel = new MerchandiseModel;
  listMerchandiseModel: MerchandiseModel[];
  mode: any = 'view';
  breadCrumbItems: Array<{}>;
  formData: FormGroup;

  constructor(public formBuilder: FormBuilder, private spinner: NgxSpinnerService,private authenticationService: AuthenticationService, private userAccountService: UserAccountService, private merchandiseService: MerchandiseService) { }

  ngOnInit(): void {
    this.onListUserByProfile('supplier');
    this.timer();
  }

  basicMessage(msg: string) {
    Swal.fire({
      title: msg,
      confirmButtonColor: '#5438dc',
    });
  }

  onList(){
    this.spinner.show();
    this.merchandiseService.list().subscribe((listMerchandise: MerchandiseModel[]) => {
      this.listMerchandiseModel = listMerchandise; 
      this.alterMode('view', null);
    });
  }

  onListUserByProfile(profile:string){
    this.userAccountService.FindAllByCustom('profile',profile).subscribe((listUser: UserAccountModel[]) => {
      console.log(listUser)
      this.listUserProfile = listUser;
      this. onList();
    });
  }

  alterMode(mode: string, id: string) {
    if(mode == 'add'){
      this.merchandiseModel = new MerchandiseModel;
      this.mode = mode;
    } 
    else if(mode == 'edit') {
      this.merchandiseService.read(id).subscribe((merchandiseModel: MerchandiseModel) => {
        this.merchandiseModel = merchandiseModel;
        console.log(merchandiseModel)
        setTimeout(() => {
          this.mode = mode;  
        }, 500);
      })
    }
    else
      this.mode = mode;
  }

  delete(id: string){
    this.merchandiseService.remove(id).subscribe((merchandiseModel: MerchandiseModel) => {
      this.onList();
      this.basicMessage('Operação efetuada com sucesso');
    })
  }

  save() {
    this.merchandiseService.save(this.merchandiseModel).subscribe((merchandiseModel: MerchandiseModel) => { this.onList(); });
    this.basicMessage('Operação efetuada com sucesso');
  }

  onUserProfile(userId: string):string{
    var user = this.listUserProfile.find(x => x.id == userId);
    return user.name;
  }

  timer() {
    let timerInterval;
    Swal.fire({
      title: 'Carregando...',
      timer: 2000,

      onBeforeOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft() + '';
        }, 100);
      },
      onClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (
        result.dismiss === Swal.DismissReason.timer
      ) {
        console.log('I was closed by the timer');
      }
    });
  }

}
