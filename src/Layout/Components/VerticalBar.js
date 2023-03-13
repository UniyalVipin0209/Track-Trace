import React, { Component } from 'react';
import { AiFillContacts, AiOutlineSafety, AiOutlineSetting } from 'react-icons/ai';
import { FiHome } from 'react-icons/fi';
import { FaBookReader, FaCopy } from 'react-icons/fa';
import {MdContactPage} from 'react-icons/md';
import {GrDocumentText} from 'react-icons/gr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BsFillPersonFill, BsPeopleFill } from 'react-icons/bs';

class VerticalBar extends Component{
    constructor(props){
        super(props);
        this.state={
            menu2:this.props.menu.menu,
            routeTitle:this.props.menu.routeTitle
        }
    }

    componentDidUpdate(prev){
        if(prev.menu!=this.props.menu){
            console.log("Updtign...")
            this.setState({menu2:this.props.menu});
        }
    }

    navigator=(url,title,i1,i2)=>{
        if(url=="")
            return;
        // else
        //     this.props.handleRoutingTitle(title);

        var temp = this.state;
        temp.menu2[i1].submenu[i2].colorClass="colorhover";
        temp.routeTitle=title;
        this.setState(temp)
        this.props.history.push(url);
    }

    navigator2=(val)=>{
        if(val.submenu.length==0)
        {
            this.props.handleRoutingTitle(val.routingName);
            this.props.history.push(val.routeLink);
        }
    }
    // colorhover

    render(){
        return  <div id="verticalBarID" className="verticalBar">
                    <div>
                        <ul>
                            ss
                            {/* {this.state.menu2.map((val,i)=>(
                                 <li className="myCursor rootTitle" onClick={()=>this.navigator2(val)} key={'vertical'+i}><img src={val.icon} /> &nbsp; <span className={val.colorClass}>{val.title}</span> 
                                    {val.submenu.length != 0? <ul>
                                        {val.submenu.map((val2,indx2)=><li key={'subVertical'+indx2} className="myCursor subRootTitle1" id={val.id+val2.id} onClick={()=>{this.navigator(val2.routeLink, val2.routingName,i,indx2)}}><img src={val2.icon} /> &nbsp; <span className={val2.colorClass}>{val2.title}</span>
                                            {val2.submenu2 != null &&<ul>
                                                {val2.submenu2.map((val3,indx3)=><li key={'sub2vertical'+indx3} className="myCursor subRootTitle2($indx3) " ><img src={val3.icon} /> &nbsp; <span className={val3.colorClass}>{val3.title}</span></li>)}
                                            </ul>}
                                        </li>)}
                                    </ul>:null}
                                 </li>
                            ))} */}
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

export default connect(mapStateToProps,mapDispatchToProps)(VerticalBar)