import React, { Component } from "react";
import "./style.css";
import MakeService from '../../services/makeService';
import ModelService from '../../services/modelService';
import VersionService from '../../services/versionService';
import CarService from '../../services/carService';
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
            listCars: [],
            numberPage: 1
        }

        this.doRequest();
    }

    doRequest(){
        this.getCars();
        this.getMake();
    }

    async getCars(){
        try{
            const responseCars = await new CarService().getCarRequest(1);
            if(responseCars.data){
                this.setState({listCars: responseCars.data})
                return;
            }
            this.setState({listCars: []})
        }catch(error){
            debugger;
            this.setState({listCars: []})
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
        const idMake =  event.target.value;
        this.getModel(idMake);
    }

    handleModel = (event) =>{
        const idModel =  event.target.value;
        this.getVersion(idModel);
    }

    render(){
        debugger;
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
                            <option value="MG">Minas Gerais</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
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
                                <option key={marca.ID} value={marca.ID}>{marca.Name}</option>
                            ))}
                        </select>
                        <div className="label flex-row margin-left">
                            <p className="text-select"> Modelo:</p>
                        </div>
                        <select className="select" name="select-simples-placeholder" onChange={this.handleModel}>
                            {this.state.listModel.map((modelo)=>(
                                <option key={modelo.ID} value={modelo.ID}>{modelo.Name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="margin-top20 flex-row">
                        <select className="select-normal" name="select-simples-placeholder" placeholder="Ano Desejado">
                            <option value="MG">Ano Desejado</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                        </select>
                        <select className="select-normal margin-left" name="select-simples-placeholder" placeholder="Faixa de Preço">
                            <option value="MG">Faixa de Preço</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                        </select>
                        <div className="label flex-row margin-left">
                            <p className="text-select"> Versão:</p>
                        </div>
                        <select className="select-versao" name="select-simples-placeholder" placeholder="Selecione um estado">
                            {this.state.listVersion.map((versao)=>(
                                <option key={versao.ID} value={versao.ID}>{versao.Name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="margin-top20 flex-row-space-between">
                        <div>
                            <p className="cor-vinho font-bold"> {">"} Busca Avançada</p>
                        </div>
                        <div className="flex-row">
                            <p className="cor-cinza margin-right">Limpar filtros</p>
                            <button className="btn-ofertas font-bold">VER OFERTAS</button>
                        </div>
                    </div>
                </div>
                <div className="box-branco flex-row">
                {this.state.listCars.length === 0 && <div className="box-branco">Nenhum</div>}
                {this.state.listCars.length !== 0 && this.state.listCars.map((car) => {
                    <div>
                        <img src={car.Image} />
                        <p>Marca: {car.Make}</p>
                        <p>Modelo: {car.Model}</p>
                        <p>Versão: {car.Version}</p>
                        <p>KM: {car.KM}</p>
                        <p>Preço: {car.Price}</p>
                        <p>Ano modelo: {car.YearModel}</p>
                        <p>Ano fabricação: {car.YearFab}</p>
                        <p>Cor: {car.Color}</p>
                    </div>
                })}
                </div>
            </div>
        )
    }
}