import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { MerchandiseModel } from '../../core/models/merchandise.model';
import { MerchandiseService } from '../../core/services/merchandise.service';
import { DepositModel } from 'src/app/core/models/deposit.model';
import { DepositService } from 'src/app/core/services/deposit.service';
import { IventoryModel } from 'src/app/core/models/iventory.model';
import { IventoryService } from 'src/app/core/services/iventory.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iventory',
  templateUrl: './iventory.component.html',
  styleUrls: ['./iventory.component.scss']
})
export class IventoryComponent implements OnInit {

  term: any;
  iventoryModel: IventoryModel = new IventoryModel;
  listIventoryModel: IventoryModel[];
  merchandiseModel: MerchandiseModel = new MerchandiseModel;
  listMerchandiseModel: MerchandiseModel[];
  depositModel: DepositModel = new DepositModel;
  listDepositModel: DepositModel[];
  mode: any = 'view';
  breadCrumbItems: Array<{}>;
  formData: FormGroup;

  constructor(public formBuilder: FormBuilder, private spinner: NgxSpinnerService,private authenticationService: AuthenticationService, private depositService: DepositService, private iventoryService: IventoryService, private merchandiseService: MerchandiseService) { }

  ngOnInit(): void {
    this.onList();
    this.timer();
  }

  basicMessage(msg: string) {
    Swal.fire({
      title: msg,
      confirmButtonColor: '#5438dc',
    });
  }

  onListOnventory(){
    this.iventoryService.list().subscribe((listIventory: IventoryModel[]) => {
      this.listIventoryModel = listIventory; 
      this.alterMode('view', null);
    });
  }

  onListMerchandise(){
    this.merchandiseService.list().subscribe((listMerchandise: MerchandiseModel[]) => {
      this.listMerchandiseModel = listMerchandise; 
      this.alterMode('view', null);
      this.onListOnventory();
    });
  }

  onList(){
    this.spinner.show();
    this.depositService.list().subscribe((listDepositModel: DepositModel[]) => {
      this.listDepositModel = listDepositModel;
      this.alterMode('view', null);
      this.onListMerchandise();
    });
  }

  onMerchandise(id: string):string{
    return this.listMerchandiseModel.find(x => x.id == id).name;
  }

  onDeposit(id: string):string{
    return this.listDepositModel.find(x => x.id == id).name;
  }

  

  alterMode(mode: string, id: string) {
    if(mode == 'add'){
      this.iventoryModel = new IventoryModel;
      this.mode = mode;
    }
    else if(mode == 'edit') {
      this.iventoryService.read(id).subscribe((iventoryModel: IventoryModel) => {
        this.iventoryModel = iventoryModel;
        console.log(iventoryModel)
        setTimeout(() => {
          this.mode = mode;  
        }, 500);
      })
    }else
      this.mode = mode;
  }

  delete(id: string){
    this.iventoryService.remove(id).subscribe((iventoryModel: IventoryModel) => {
      this.onList();
      this.basicMessage('Operação efetuada com sucesso');
    })
  }

  save() {
    this.iventoryService.save(this.iventoryModel).subscribe((iventoryModel: IventoryModel) => { this.onList(); });
    this.basicMessage('Operação efetuada com sucesso');
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
