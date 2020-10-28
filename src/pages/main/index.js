import React, { Component } from "react";
import "./style.css";

import MakeService from '../../services/makeService';
import ModelService from '../../services/modelService';
import VersionService from '../../services/versionService';
import CarService from '../../services/carService';

import UF from '../../string/uf.json'

import Logo from "../../images/logo-web-motors.png";
import Carro from "../../images/icon-carro.png";
import Moto from "../../images/icon-moto.png";
import Map from "../../images/icon-map.png";


export default class Main extends Component {
    constructor(props){
        super(props);

        this.state ={
            listMake: [],
            listModel: [{ID: 0, Name: 'Todos'}],
            listVersion: [{ID: 0, Name: 'Todos'}],
            allCars: [],
            listCars: [],
            numberPage: 1,
            loading: false,
            selectMake: '',
            selectVersion: '',
            selectModel: '',
            selectPrice: ''

        }

        this.doRequest();
    }

    doRequest(){
        this.getCars();
        this.getMake();
    }

    async getCars(isMore, number){
        this.setState({loading: true})
        try{
            let responseCars;
            if(number){
                responseCars = await new CarService().getCarRequest(number);
            }else{
                responseCars = await new CarService().getCarRequest(1);
            }
            
            if(isMore){
                let list = this.state.allCars;
                responseCars.data.forEach((car) => {
                    list.push(car);
                })
                this.setState({listCars: list, allCars: list,loading: false})
                return;
            }else if(responseCars.data){
                this.setState({listCars: responseCars.data, allCars: responseCars.data,loading: false})
                return;
            }
            this.setState({listCars: [], loading: false})
        }catch(error){
            debugger;
            this.setState({listCars: [], loading: false})
        }
    }

    async getMake(){
        const orderList = [{
            ID: '',
            Name: 'Todas'
        }];
        try{
            const responseMake = await new MakeService().getMakeRequest();
            if(responseMake.data){
                responseMake.data.forEach((marca)=>{
                    orderList.push(marca);
                })
                this.setState({listMake: orderList})
                return;
            }
            this.setState({listMake: orderList})
        }catch(error){
            this.setState({listMake: orderList})
        }
    }

    async getVersion(modelId){
        const orderList = [
            {
                ModelID: 0,
                ID: 0,
                Name: "Todos"
            },
        ];
        try{
            const responseVersion = await new VersionService().getVersionRequest(modelId);
            if(responseVersion.data){
                responseVersion.data.forEach((versao)=>{
                    orderList.push(versao);
                })
                this.setState({listVersion: orderList})
                return;
            }
            this.setState({listVersion: orderList})
        }catch(error){
            this.setState({listVersion: orderList})
        }
    }

    async getModel(idMake){
        const orderList = [{
            MakeID: 0,
            ID: 0,
            Name: "Todos"
        }];
        try{
            const responseModel = await new ModelService().getModelRequest(idMake);
            if(responseModel.data){
                responseModel.data.forEach((marca)=>{
                    orderList.push(marca);
                })
                this.setState({listModel: orderList})
                return;
            }
            this.setState({listModel: orderList})
        }catch(error){
            this.setState({listModel: orderList})
        }
    }

    handleMake = (event) =>{
        const make =  event.target.value.split(",");
        this.getModel(make[0]);

        if(make[1] === 'Todas'){
            this.setState({selectMake: make[1], selectModel: ''})
            return;
        }

        this.setState({selectMake: make[1]})
    }

    handleModel = (event) =>{
        const model =  event.target.value.split(",");
        this.getVersion(model[0]);

        if(model[1] === 'Todos'){
            this.setState({selectModel: model[1], selectVersion: ''})
            return;
        }
        this.setState({selectModel: model[1]})
    }

    handleVersion = (event) =>{
        const version =  event.target.value;
        this.setState({selectVersion: version})
    }

    handlePrice = (event) =>{
        const price =  event.target.value;
        this.setState({selectPrice: price})
    }

    getMorePage(){
        this.setState({loading: true})
        const number = this.state.numberPage + 1;
        this.getCars(true, number);
        this.setState({numberPage: this.state.numberPage + 1})
    }

    getOfers(){
        const filterMake = this.state.selectMake !== '' && this.state.selectMake !== 'Todas' ? this.state.selectMake : null;
        const filterModel =  this.state.selectModel !== ''  && this.state.selectModel !== 'Todos' ? this.state.selectModel : null;
        const filterPrice = this.state.selectPrice !== '' ? this.state.selectPrice : null;
        const filterVersion = this.state.selectVersion !== '' && this.state.selectVersion !== 'Todos' ? this.state.selectVersion : null;
  
        debugger;

        if(filterMake === null && filterModel === null && filterVersion=== null){
          this.setState({listCars: this.state.allCars})
        }else{
            let carsFilter;
            if(filterMake !== null && filterModel !== null && filterVersion !== null){
                carsFilter = this.state.allCars.filter(
                    (car) =>
                        car.Make === filterMake &&
                        car.Model === filterModel &&
                        // car.Price === 1 ?  car.Price <= 50000.00 : car.Price === 2 ? car.Price >= 51000.00 && car.Price <= 90000.00 : car.Price >= 90000.00 ||
                        car.Version === filterVersion
                );
            }else if(filterMake === null && filterModel !== null && filterVersion !== null){
                carsFilter = this.state.allCars.filter(
                    (car) =>
                        car.Model === filterModel &&
                        // car.Price === 1 ?  car.Price <= 50000.00 : car.Price === 2 ? car.Price >= 51000.00 && car.Price <= 90000.00 : car.Price >= 90000.00 ||
                        car.Version === filterVersion
                );
            }else if(filterMake !== null && filterModel === null && filterVersion !== null){
                carsFilter = this.state.allCars.filter(
                    (car) =>
                    car.Make === filterMake &&
                    // car.Price === 1 ?  car.Price <= 50000.00 : car.Price === 2 ? car.Price >= 51000.00 && car.Price <= 90000.00 : car.Price >= 90000.00 ||
                    car.Version === filterVersion
                );
            }else if(filterMake !== null && filterModel !== null && filterVersion === null){
                carsFilter = this.state.allCars.filter(
                    (car) =>
                    car.Make === filterMake &&
                    // car.Price === 1 ?  car.Price <= 50000.00 : car.Price === 2 ? car.Price >= 51000.00 && car.Price <= 90000.00 : car.Price >= 90000.00 ||
                    car.Model === filterModel
                );
            }else{
                if(filterMake !== null && filterModel === null && filterVersion === null){
                    carsFilter = this.state.allCars.filter(
                        (car) =>
                        car.Make === filterMake
                    );
                }else if(filterMake === null && filterModel !== null && filterVersion === null){
                    carsFilter = this.state.allCars.filter(
                        (car) =>
                        car.Model === filterModel
                    );
                }else{
                    carsFilter = this.state.allCars.filter(
                        (car) =>
                        car.Version === filterVersion
                    );
                }
            }

            this.setState({listCars: carsFilter})
        }

        
    }

    render(){
        return(
            <div className="container">
                <img alt="imagem" src={Logo} /> 
                <div className="box max-box">
                    <div className="flex-row-space-between">
                        <div className="flex-row">
                            <div className="border-bottom-vinho flex-row margin-right padding">
                                <img alt="imagem" src={Carro} /> 
                                <div>
                                    <p className="margin0 cor-cinza">COMPRAR</p>
                                    <p className="cor-vinho text-font32 margin0">CARROS</p>
                                </div>
                            </div>
                            <div className="border-bottom-vinho flex-row padding">
                                <img alt="imagem" src={Moto} /> 
                                <div>
                                    <p className="margin0 cor-cinza">COMPRAR</p>
                                    <p className="cor-vinho text-font32 margin0">MOTOS</p>
                                </div>
                            </div>
                        </div>
                        <button className="btn-laranja font-bold">VENDER MEU CARRO</button>
                    </div>
                </div>
                <div className="box-branco max-box margin-top20 padding">
                    <div className="flex-row">
                        <div className="margin-right">
                            <input type="checkbox"/>
                            <label className="cor-cinza">Novos</label>
                        </div>
                        <div>
                            <input type="checkbox"/>
                            <label className="cor-cinza">Usados</label>
                        </div>
                    </div>
                    <div className="margin-top20 flex-row">
                        <div className="label flex-row">
                            <img className="icon-map" alt="imagem" src={Map} />
                            <p className="text-select"> Onde:</p>
                        </div>
                        <select className="select-onde" name="select-simples-placeholder" placeholder="Selecione um estado">
                            {UF.map((uf)=>(
                                <option key={uf.sigla} value={uf.sigla}>{uf.nome}</option>
                            ))}
                        </select>
                        <div className="label flex-row">
                            <p className="text-select"> Raio:</p>
                        </div>
                        <select className="select-raio" name="select-simples-placeholder" placeholder="Selecione um estado">
                            <option value="100">100km</option>
                            <option value="200">200km</option>
                            <option value="300">300km</option>
                        </select>
                        <div className="label flex-row margin-left">
                            <p className="text-select"> Marca:</p>
                        </div>
                        <select className="select" name="select-simples-placeholder" onChange={this.handleMake}>
                            {this.state.listMake.map((marca)=>(
                                <option key={marca.ID} value={[marca.ID, marca.Name]}>{marca.Name}</option>
                            ))}
                        </select>
                        <div className="label flex-row margin-left">
                            <p className="text-select"> Modelo:</p>
                        </div>
                        <select className="select" name="select-simples-placeholder" onChange={this.handleModel}>
                            {this.state.listModel.map((modelo)=>(
                                <option key={modelo.ID} value={[modelo.ID, modelo.Name]}>{modelo.Name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="margin-top20 flex-row">
                        <select className="select-normal" name="select-simples-placeholder">
                            <option value="">Ano Desejado</option>
                            <option value="">2000</option>
                            <option value="RJ">2001</option>
                        </select>
                        <select className="select-normal margin-left" name="select-simples-placeholder" onChange={this.handlePrice}>
                            <option value="">Faixa de Preço</option>
                            <option value="1">até R$ 50 mil</option>
                            <option value="2">R$ 51 mil a R$ 90 mil</option>
                            <option value="3">Mais de R$ 91 mil</option>
                        </select>
                        <div className="label flex-row margin-left">
                            <p className="text-select"> Versão:</p>
                        </div>
                        <select className="select-versao" name="select-simples-placeholder" onChange={this.handleVersion}>
                            {this.state.listVersion.map((versao)=>(
                                <option key={versao.ID} value={versao.Name}>{versao.Name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="margin-top20 flex-row-space-between">
                        <div>
                            <p className="cor-vinho font-bold"> {">"} Busca Avançada</p>
                        </div>
                        <div className="flex-row">
                            <p className="cor-cinza margin-right">Limpar filtros</p>
                            <button onClick={() => this.getOfers()} className="btn-ofertas font-bold">VER OFERTAS</button>
                        </div>
                    </div>
                </div>
                <div className="margin-top20">
                {this.state.listCars.length === 0 && <div className="box-branco">Nenhum</div>}
                <div className="flex-row flex-wrap">
                {this.state.listCars.length !== 0 && this.state.listCars.map((car) => (
                        <div key={car.ID} className="flex-row margin-top5 box-branco cardCar ">
                            <img className="car-img" src={car.Image} />
                            <div className="padding">
                                <div className="flex-row">
                                    <div className="margin5percent">
                                        <p className="cor-cinza font-size14 margin0">Marca: </p>
                                        <p className="font-bold margin0">{car.Make}</p>
                                    </div>
                                    <div className="margin5percent">
                                        <p className="cor-cinza font-size14 margin0">Modelo: </p>
                                        <p className="font-bold margin0">{car.Model}</p>
                                    </div>
                                    <div className="margin5percent">
                                        <p className="cor-cinza font-size14 margin0">Versão: </p>
                                        <p className="font-bold margin0">{car.Version}</p>
                                    </div>
                                    <div className="margin5percent">
                                        <p className="cor-cinza font-size14 margin0">KM: </p>
                                        <p className="font-bold margin0">{car.KM}</p>
                                    </div>
                                </div>
                                <div className="flex-row">
                                <div className="margin5percent">
                                        <p className="cor-cinza font-size14 margin0">Preço: </p>
                                        <p className="font-bold margin0">R$ {car.Price}</p>
                                    </div>
                                    <div className="margin5percent">
                                        <p className="cor-cinza font-size14 margin0">Ano modelo: </p>
                                        <p className="font-bold margin0">{car.YearModel}</p>
                                    </div>
                                    <div className="margin5percent">
                                        <p className="cor-cinza font-size14 margin0">Ano fabricação: </p>
                                        <p className="font-bold margin0">{car.YearFab}</p>
                                    </div>
                                    <div className="margin5percent">
                                        <p className="cor-cinza font-size14 margin0">Cor: </p>
                                        <p className="font-bold margin0">{car.Color}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                ))}
                </div>
                
                </div>
                {this.state.loading && <p>Carregando...</p>}
                {!this.state.loading && <button onClick={() => this.getMorePage()}className="btn-vermais font-bold">VER MAIS</button>}
            </div>
        )
    }
}