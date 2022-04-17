import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { MerchandiseModel } from '../../core/models/merchandise.model';
import { MerchandiseService } from '../../core/services/merchandise.service';
import { DepositModel } from 'src/app/core/models/deposit.model';
import { DepositService } from 'src/app/core/services/deposit.service';
import { OrderModel } from 'src/app/core/models/order.model';
import { OrderItemModel } from 'src/app/core/models/order-item.model';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderItemService } from 'src/app/core/services/order-item.service';
import { UserAccountModel } from 'src/app/core/models/user-account.model';
import { UserAccountService } from 'src/app/core/services/user-account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IventoryModel } from 'src/app/core/models/iventory.model';
import { IventoryService } from 'src/app/core/services/iventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  term: any;
  unitaryValue: number = 0;
  qtdUnitaryValue: number = 0;
  listIventoryModel: IventoryModel[];
  iventoryModel: IventoryModel = new IventoryModel;
  listUserModel: UserAccountModel[];
  orderModel: OrderModel = new OrderModel;
  listOrderModel: OrderModel[];
  orderItemModel: OrderItemModel = new OrderItemModel;
  listOrderItemModel: OrderItemModel[];
  listOrderItemCartModel: OrderItemModel[]=[];
  merchandiseModel: MerchandiseModel = new MerchandiseModel;
  listMerchandiseModel: MerchandiseModel[];
  depositModel: DepositModel = new DepositModel;
  listDepositModel: DepositModel[];
  mode: any = 'view';
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  visibleOrderItem: boolean = false;
  visibleOrderItemCart: boolean = false;

  constructor(public formBuilder: FormBuilder, private spinner: NgxSpinnerService,private authenticationService: AuthenticationService, private depositService: DepositService, private orderService: OrderService, private orderItemService: OrderItemService, private merchandiseService: MerchandiseService, private userAccountService: UserAccountService, private iventoryService: IventoryService) { }

  ngOnInit(): void {
    this.onListIventor();
    this.alterMode('view', null);
    this.timer();
  }

  basicMessage(msg: string) {
    Swal.fire({
      title: msg,
      confirmButtonColor: '#5438dc',
    });
  }

  onListIventor() {
    this.iventoryService.list().subscribe((listIventoryModel: IventoryModel[]) => {
      this.listIventoryModel = listIventoryModel;
      this.onListMerchandise();
      this.alterMode('view', null);
    });
  }

  onListMerchandise(){
    this.merchandiseService.list().subscribe((listMerchandise: MerchandiseModel[]) => {
      this.listMerchandiseModel = listMerchandise; 
      this.onListDeposit();
    });
  }

  onListDeposit(){
    this.depositService.list().subscribe((listDepositModel: DepositModel[]) => {
      this.listDepositModel = listDepositModel;
      this.onListUser();
    });
  }

  onListUser(){
    this.userAccountService.FindAllByCustom('Profile','customer').subscribe((listUserAccountModel: UserAccountModel[]) => {
      console.log(listUserAccountModel)
      this.listUserModel = listUserAccountModel;
      this.onListOrder();
    });
  }

  onListOrder(){
    this.visibleOrderItem = true;
    this.spinner.show();
    this.orderService.list().subscribe((listOrder: OrderModel[]) => {
        this.listOrderModel = listOrder; 
    });
  }

  onMerchandise(id: string):string{
    return this.listMerchandiseModel.find(x => x.id == id).name;
  }

  onMerchandiseValue(id: string):number{
    return this.listMerchandiseModel.find(x => x.id == id).unitaryValue;
  }

  onDeposit(id: string):string{
    return this.listDepositModel.find(x => x.id == id).name;
  }

  onUser(id: string):string{
    return this.listUserModel.find(x => x.id = id).name;
  }

  alterMode(mode: string, id: string) {
    if(mode == 'add'){
      this.orderModel = new OrderModel;
      this.listOrderItemCartModel = [];
      this.mode = mode;
    }
    else if(mode == 'edit') {
      this.visibleOrderItemCart = false;
      this.orderService.read(id).subscribe((iventoryModel: OrderModel) => {
        this.orderModel = iventoryModel;
        this.listOrderItemCartModel = iventoryModel.orderItem;

        this.visibleOrderItemCart = true;
        console.log(iventoryModel)
        setTimeout(() => {
          this.mode = mode;  
        }, 500);
      })
    }else
      this.mode = mode;
  }

  delete(id: string){
    this.orderService.remove(id).subscribe((orderModel: OrderModel) => {
      this.onListIventor();
      this.alterMode('view', null);
      this.basicMessage('Operação efetuada com sucesso');
    })
  }

  add(){
    this.listOrderItemCartModel.push(this.orderItemModel);
    this.clean();
  }

  clean(){
    this.orderItemModel = new OrderItemModel;
  }

  save() {
    this.orderModel.orderItem = this.listOrderItemCartModel
    this.orderService.save(this.orderModel).subscribe((iventoryModel: OrderModel) => { this.onListIventor(); });
    this.basicMessage('Operação efetuada com sucesso');
  }

  AddOderItem(merchandiseId: string, depositId: string, unitaryValue: number){
    
    this.visibleOrderItemCart = true;

    var orderItemModel: OrderItemModel = new OrderItemModel;

    orderItemModel.merchandiseId = merchandiseId;
    orderItemModel.depositId = depositId;
    orderItemModel.unitaryValue = unitaryValue;
    orderItemModel.quantity = 1;

    this.listOrderItemCartModel.push(orderItemModel);
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
