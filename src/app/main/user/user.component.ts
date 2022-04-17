import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { UserAccountModel } from '../../core/models/user-account.model';
import { UserAccountService } from '../../core/services/user-account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  term: any;
  userAccount: UserAccountModel = new UserAccountModel;
  listUserAccount: UserAccountModel[];
  listUserProfile: UserAccountModel[];
  mode: any = 'view';
  breadCrumbItems: Array<{}>;
  formData: FormGroup;

  constructor(public formBuilder: FormBuilder, private spinner: NgxSpinnerService,private authenticationService: AuthenticationService, private userAccountService: UserAccountService) { }

  ngOnInit(): void {
    this.timer();
    this.spinner.hide();
    this.onList();
  }

  basicMessage(msg: string) {
    Swal.fire({
      title: msg,
      confirmButtonColor: '#5438dc',
    });
  }

  onCreateUser(user: UserAccountModel){
    this.authenticationService.register(user.mail, user.password).then((res: any) => {
      this.userAccount.uid = res.uid;

      this.userAccountService.save(this.userAccount).subscribe((depositModel: UserAccountModel) => { this.onList(); });

      // this.userAccountService.signup(this.userAccount).subscribe((userAccount: UserAccountModel) => {
      // });
    });
  }

  onList(){
    this.spinner.show();
    this.userAccountService.list().subscribe((listUser: UserAccountModel[]) => {
      this.listUserAccount = listUser; 
      this.alterMode('view', null);
    });
  }

  delete(id: string){
    this.userAccountService.remove(id).subscribe((depositModel: UserAccountModel) => {
      this.onList();
      this.basicMessage('Operação efetuada com sucesso');
    })
  }

  save() {
    if(this.mode == 'add')
      this.onCreateUser(this.userAccount);
    else
      this.userAccountService.save(this.userAccount).subscribe((depositModel: UserAccountModel) => { this.onList(); });

      this.basicMessage('Operação efetuada com sucesso');
  }

  onListUserByProfile(profile:string){
    this.userAccountService.FindAllByCustom('profile',profile).subscribe((listUser: UserAccountModel[]) => {
      this.listUserProfile = listUser;
    });
  }

  alterMode(mode: string, id: string) {
    if(mode == 'add'){
      this.userAccount = new UserAccountModel;
      this.mode = mode;
    } 
    else if(mode == 'edit') {
      this.userAccountService.read(id).subscribe((userAccountModel: UserAccountModel) => {
        this.userAccount = userAccountModel;
        console.log(userAccountModel)
        setTimeout(() => {
          this.mode = mode;  
        }, 500);
      })
    }
    else
      this.mode = mode;
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
