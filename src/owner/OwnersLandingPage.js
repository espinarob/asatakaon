import React, 
	{Component} 
	from 'react';
import {Platform, 
	StyleSheet, 
	Text, 
	View, 
	AsyncStorage,
	Image,
	NetInfo,
	TouchableWithoutFeedback,
	TextInput,
	Picker,
	CheckBox,
	Switch} 
	from 'react-native';
import {
	Container, 
	Icon,
	Spinner} 
	from 'native-base';
import SyncStorage   from 'sync-storage';
import MapView       from 'react-native-maps';
import {Marker}      from 'react-native-maps';
import Geolocation   from 'react-native-geolocation-service';

/* -- Custom Components  -- */
import Constants from '../commons/Constants.js';


export default class OwnersLandingPage extends Component{

	state = {
		inputAcceptBookingFlag : false,
		loading                : true
	};

	handleChangeInAcceptBooking =()=>{
		const acceptBooking = String(!this.state.inputAcceptBookingFlag);
		this.setState({loading:true});
		this.props.doUseFirebaseObject
			.database()
			.ref("RESTAURANT/"+String(this.props.doGetLoggedInformation.key))
			.update({
				'acceptBooking': acceptBooking
			})
			.then(()=>{
				this.setState({inputAcceptBookingFlag:!this.state.inputAcceptBookingFlag});
				this.setState({loading:false});
			})

	}

	componentDidMount(){
		this.props.doUseFirebaseObject
			.database()
			.ref("RESTAURANT/"+String(this.props.doGetLoggedInformation.key)+"/acceptBooking")
			.once("value",snapshot=>{
				if(snapshot.exists()){
					if(snapshot.val() == 'true'){
						this.setState({inputAcceptBookingFlag:true});
					}	
					else{
						this.setState({inputAcceptBookingFlag:false});
					}
				}
			})
			.then(()=>{
				this.setState({loading:false});
			})
	}

	render() {
	    return (
	    	<React.Fragment>
	    		<View style = {{
	    				height: '100%',
	    				width: '100%',
	    				position: 'relative'
	    		}}>
	    			<View style = {{
	    					height: 65,
	    					width: 65,
	    					position: 'absolute',
	    					top: 25,
	    					left: '73%',
	    					borderRadius: 90,
							borderWidth: 1.2,
						    borderColor: '#ddd',
						    borderBottomWidth: 0,
						    shadowColor: '#000',
						    shadowOffset: {
								width: 0,
								height: 5,
							},
							shadowOpacity: 0.34,
							shadowRadius: 3.27,
							elevation: 10,
						    backgroundColor: '#fff'
	    			}}>
	    				<Text style ={{
	    						height: '100%',
	    						width: '100%',
	    						position: 'relative',
	    						fontSize: 12,
	    						color: '#000',
	    						textAlignVertical: 'center',
	    						textAlign: 'center',
	    						color: '#000'
	    				}}>
	    					<Icon
	    						style = {{fontSize:20}}
	    						name = 'bell'
	    						type = 'Entypo'/>{'\n'}
	    					Requests
	    				</Text>
	    			</View>


	    			<View style= {{
	    					height: 50,
	    					width: 200,
	    					position: 'absolute',
	    					borderRadius: 100,
	    					flexDirection: 'row',
	    					borderWidth: 1.2,
						    borderColor: '#ddd',
						    borderBottomWidth: 0,
						    shadowColor: '#000',
						    shadowOffset: {
								width: 0,
								height: 5,
							},
							shadowOpacity: 0.34,
							shadowRadius: 3.27,
							elevation: 10,
							top: 30,
							left: '15%',
						 	backgroundColor: '#fff'
    				}}>
    					{
    						this.state.loading  == true ?
    						<Text style = {{
	    							height: '100%',
	    							width: '80%',
	    							textAlignVertical: 'center',
	    							position: 'relative',
	    							left: 20,
	    							color: '#000',
	    							fontSize: 14
	    					}}>
	    						Loading, please wait..
	    					</Text> : 
	    					<React.Fragment>
								<Switch
		    						value = {this.state.inputAcceptBookingFlag}
		    						onChange = {this.handleChangeInAcceptBooking}
		    						style = {{
		    							position: 'relative',
		    							left: 20,
		    							width: '17%',
		    							backgroundColor: '#fff'
		    						}}/>
		    					<Text style = {{
		    							height: '100%',
		    							width: '60%',
		    							textAlignVertical: 'center',
		    							position: 'relative',
		    							left: 20,
		    							color: '#000',
		    							fontSize: 13
		    					}}>
		    						Accepting bookings
		    					</Text>
	    					</React.Fragment>}
    				</View>
	    		</View> 
	    	</React.Fragment>
		);
  	}
}
