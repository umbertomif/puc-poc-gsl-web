import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DepositModel } from 'src/app/core/models/deposit.model';
import { DepositService } from 'src/app/core/services/deposit.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  term: any;
  listDeposit: DepositModel[];
  deposit: DepositModel = new DepositModel;
  mode: any = 'view';

  constructor(public formBuilder: FormBuilder, private depositService: DepositService) { }

  basicMessage(msg: string) {
    Swal.fire({
      title: msg,
      confirmButtonColor: '#5438dc',
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'POC GSL' }, { label: 'Depositos', active: true }];
    this.load();
  }

  load() {
    this.timer();
    this.depositService.list().subscribe((listDepositModel: DepositModel[]) => {
      this.listDeposit = listDepositModel;
      this.alterMode('view', null);
    });
  }

  alterMode(mode: string, id: string) {
    if(mode == 'add'){
      this.deposit = new DepositModel;
      this.mode = mode;
    }
    else if(mode == 'edit') {
      this.depositService.read(id).subscribe((depositModel: DepositModel) => {
        this.deposit = depositModel;
        console.log(depositModel)
        setTimeout(() => {
          this.mode = mode;  
        }, 500);
      })
    }
    else
      this.mode = mode;
  }

  delete(id: string){
    this.depositService.remove(id).subscribe((depositModel: DepositModel) => {
      this.basicMessage('Operação efetuada com sucesso');
      this.load();
    })
  }

  save() {
    this.depositService.save(this.deposit).subscribe((depositModel: DepositModel) => { 
      this.basicMessage('Operação efetuada com sucesso');
      this.load(); 
    });
  }

  


  breadCrumbItems: Array<{}>;
  formData: FormGroup;

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
