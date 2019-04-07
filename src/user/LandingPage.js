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
	CheckBox} 
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


const registeredUserIcon = require('../img/icon/registered-user.png');

export default class UserHomePage extends Component{

	state  = {
		tracksViewChanges: true
	}

	onLoadIcon = ()=>{
		if(registeredUserIcon){
			setTimeout(()=>{
				this.setState({tracksViewChanges:false});
				console.log('set to false');
			},1500);
		}
	}

	displaySearchBar = ()=>{
		return 	<View style={{
						height:'9%',
						width:'80%',
						left: '10%',
						top: '3%',
						borderWidth:2,
						position:'absolute',
						borderWidth: 1.2,
					    borderColor: '#ddd',
					    borderBottomWidth: 0,
					    shadowColor: '#000',
					    shadowOffset: {
							width: 0,
							height: 5,
						},
						shadowOpacity: 0.34,
						shadowRadius: 6.27,
						elevation: 10,
					    backgroundColor: '#fff',
					    borderRadius:15,
					    flexDirection: 'row'
				}}>
					<Text style={{
							height:'100%',
							position: 'relative',
							width: '20%',
							fontSize: 15,
							textAlign: 'center',
							textAlignVertical: 'center'
					}}>
						<Icon
							style = {{
								fontSize:25,
								color: '#000'
							}}
							name  = 'ios-notifications'
							type  = 'Ionicons'/>
					</Text>
					<Text style={{
							height:'100%',
							position: 'relative',
							width: '12%',
							fontSize: 15,
							textAlignVertical: 'center'
					}}>
						<Icon
							style = {{
								fontSize:25,
								color: '#000'
							}}
							name  = 'md-search'
							type  = 'Ionicons'/>
					</Text>
					<TextInput
						placeholder = 'Search something..'
						style ={{
							fontSize: 15,
							width: '60%',
							position:'relative',
							height: '93%',
							paddingLeft:'3%',
							borderBottomWidth: 2
						}}/>
				</View>
	}


	showMapToUser = ()=>{
		/*if(this.props.doGetUsersLocation.latitude){
			return 	<MapView style        = {{height:'100%',width: '100%'}}
						provider          = {MapView.PROVIDER_GOOGLE}
			            region            = {{
			                latitude       : this.props.doGetUsersLocation.latitude,
			                longitude      : this.props.doGetUsersLocation.longitude,
			                latitudeDelta  : 0.0922*6,
			                longitudeDelta : 0.0421*6,
		                }}>
		                 <Marker
					      	coordinate={{latitude:this.props.doGetUsersLocation.latitude,
				      			longitude:this.props.doGetUsersLocation.longitude}}
				      		tracksViewChanges={this.state.tracksViewChanges}
					      	title={'Hello user!'}
					      	description={'Here is your location'}>

					      	<Image
					      		onLoad={this.onLoadIcon}
					      		source={registeredUserIcon}
					      		style={{height:30,width:30}}/>
					    </Marker>

	    			</MapView>
		}
		else return; */
	}

	render() {
	    return (
	    	<React.Fragment>
	    		{this.showMapToUser()}
	    		{this.displaySearchBar()}
	    	</React.Fragment>
		);
  	}
}
