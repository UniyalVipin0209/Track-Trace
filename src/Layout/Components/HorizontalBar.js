import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {BsBell,BsChat, BsFillMenuButtonFill} from 'react-icons/bs';
import {GiTireIronCross} from 'react-icons/gi';
import somaniIcon from'../../Assests/icon2/Somani group logo icon.svg';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import {IoIosContact} from 'react-icons/io';
import {RiArrowDownSLine} from 'react-icons/ri';

class HorizontalBar extends Component{
    constructor(props){
        super(props);
        this.state={
            openDrawer:false,
        }
    }

    
    render(){
        return  <div className="header">
            <div className="hamBurgerMenu">
                {!this.state.openDrawer?<BsFillMenuButtonFill color={'white'} onClick={this.props.switchDrawerOn} size={24}></BsFillMenuButtonFill>
                :<GiTireIronCross  color={'white'} onClick={this.props.switchDrawerOff}></GiTireIronCross>}
            </div>
            <div className="bigIcon text-white">
                    <img src={somaniIcon} />
                    {/* <img src={somaniIcon} style={{width:'3rem',height:'66%',borderRadius:'100px'}} /> &nbsp;
                    <div >
                        <span id="title1">Somani Group</span><br/>
                        <span id="since1">Since 1992</span>
                    </div>  */}
            </div> 
            <div className="barTools">
                    <ul>
                        <li className="myCursor"><span className='glowIcon'><BsBell color={'white'} size={18}></BsBell></span></li> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        <li className="myCursor"><span className='glowIcon'><BsChat  color={'white'} size={18}></BsChat></span></li> &nbsp; &nbsp;&nbsp; &nbsp;
                        <li className="myCursor profileDetDisplay text-white">
                            <span >Kiran Kumar</span><br/>
                            <span style={{fontSize:'0.7rem'}}>ID: 39853 - 09343</span>
                        </li> &nbsp; &nbsp; &nbsp;
                        <li>
                            <IoIosContact className="myCursor" color={'white'} size={30}></IoIosContact> &nbsp;
                            <RiArrowDownSLine className="myCursor" color={'white'} size={18}></RiArrowDownSLine>
                        </li>
                    </ul>
            </div>   
        </div>
    }
}

const mapStateToProps = (state) =>{
    return {

    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({

    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(HorizontalBar)